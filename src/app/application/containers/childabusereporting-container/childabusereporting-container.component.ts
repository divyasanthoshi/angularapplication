import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ApplicationConstants } from '../../application.constants';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromApplication from '../../state';
import { FormTypes } from 'src/app/_shared/enum';
import { getRouterInfo } from '../../state';
import * as applicationActions from '../../state/application.actions';
import { ChildAbuseReportingDetails, FormList, DocumentsPeople } from '../../application-interface';
import { ApplicationChildAbuseReportingComponent } from '../../application-documents/application-childabusereporting/application-childabusereporting.component';
import { Go } from 'src/app/reducers/routerstate/router.actions';

@Component({
  selector: 'app-childabusereporting-container',
  templateUrl: './childabusereporting-container.component.html',
  styleUrls: ['./childabusereporting-container.component.scss'],
})
export class ChildAbuseReportingContainerComponent implements OnInit {
  @ViewChild(ApplicationChildAbuseReportingComponent) private child: ApplicationChildAbuseReportingComponent;
  formId: number;
  formTypeId;
  documentId: number;
  isDisabled: boolean;
  currentProviderId$: Observable<number>;
  peopleDocuments$: Observable<DocumentsPeople>;
  private state$: Observable<object>;
  childAbuseReportingDetails$: Observable<ChildAbuseReportingDetails>;
  formItem: FormList;
  personName: string;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private store: Store<fromApplication.State>) { }

  ngOnInit() {
    this.store.pipe(select(fromApplication.getPeopleDocumentByPersonId)).subscribe((data: FormList) => {
      this.formItem = data;
    });
    this.activatedRoute.url.subscribe((url) => {
        if (!url || !url.length) { return; }
        this.formTypeId = FormTypes[url[0].path];
    });
    this.store.select(getRouterInfo).subscribe((data) => {
        this.formId = data.queryParams.formId;
        this.documentId = data.queryParams.documentId;
        if (this.formId) {
            this.store.dispatch(new applicationActions.LoadProviderId(this.formId));
        }
        if (this.documentId) {
            this.store.dispatch(new applicationActions.LoadChildAbuseReportingDetail(this.documentId));

        }
    });
    this.store.pipe(select(fromApplication.getPeopleDocuments)).subscribe(peopledocus => {
        this.peopleDocuments$ = this.store.pipe(select(fromApplication.getPeopleDocuments));
    });
    this.currentProviderId$ = this.store.pipe(select(fromApplication.getCurrentProviderId));
    this.currentProviderId$.subscribe(res => {
        if (res) {
            if (this.formTypeId) {
                this.store.dispatch(new applicationActions.LoadPeopleDocuments(this.formTypeId));
            }
        }
    });
    this.childAbuseReportingDetails$ = this.store.pipe(select(fromApplication.getChildAbuseReportingDetails));
    this.childAbuseReportingDetails$.subscribe((res: ChildAbuseReportingDetails) => {
      if (res) {
        this.personName = res.personName;
      }
    });
  }

  createChildAbuseReportingDetail(childAbuseReportingDetails: ChildAbuseReportingDetails) {
    this.store.dispatch(new applicationActions.CreateChildAbuseReportingDetail(childAbuseReportingDetails));
    this.navigateToNextPage(ApplicationConstants.url.page.childabuseView);
  }

  updateChildAbuseReportingDetail(childAbuseReportingDetails: ChildAbuseReportingDetails) {
    this.store.dispatch(new applicationActions.UpdateChildAbuseReportingDetail(childAbuseReportingDetails));
    this.navigateToNextPage(ApplicationConstants.url.page.childabuseView);
  }

  nextPage() {
    this.navigateToNextPage(ApplicationConstants.url.page.childabuseView);
  }

  cancel() {
    this.navigateToNextPage(ApplicationConstants.url.page.childabuseView);
  }

  navigateToNextPage(path) {
    this.router.navigate([path], { queryParams: { documentId: this.documentId, formId: this.formId } });
  }

  navigateToPeopleForm(selectedPerson: FormList) {
    this.store.dispatch(new applicationActions.SetCurrentPersonnelId(selectedPerson.personId));
    const url = ApplicationConstants.url.page.childabuseView;
    if (url) {
      this.store.dispatch(new Go({
        path: [url],
        query: { documentId: selectedPerson.formId, formId: this.formId },
        extras: { state: { formTypeId: this.formTypeId } },
      }));
    }
  }
}
