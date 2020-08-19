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
  selector: 'app-viewchildabusereporting-container',
  templateUrl: './viewchildabusereporting-container.component.html',
  styleUrls: ['./viewchildabusereporting-container.component.scss'],
})
export class ViewChildAbuseReportingContainerComponent implements OnInit {
  formId: number;
  formTypeId;
  documentId: number;
  currentProviderId$: Observable<number>;
  peopleDocuments$: Observable<DocumentsPeople>;
  isDisabled: boolean;
  childAbuseReportingDetails$: Observable<ChildAbuseReportingDetails>;
  formItem: FormList;
  private state$: Observable<object>;

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
    this.currentProviderId$ = this.store.pipe(select(fromApplication.getCurrentProviderId));
    this.currentProviderId$.subscribe((res) => {
      if (res && res !== 0) {
        this.store.dispatch(new applicationActions.LoadProvider());
        this.store.dispatch(new applicationActions.LoadPeopleDocuments(this.formTypeId));
      }
    });
    this.store.pipe(select(fromApplication.getPeopleDocuments)).subscribe(peopledocus => {
      this.peopleDocuments$ = this.store.pipe(select(fromApplication.getPeopleDocuments));
    });
    this.store.pipe(select(fromApplication.getChildAbuseReportingDetails)).subscribe(childAbuseReportingDetails => {
      this.childAbuseReportingDetails$ = this.store.pipe(select(fromApplication.getChildAbuseReportingDetails));
    });
  }


  editChildAbuseReport() {
    this.router.navigate([ApplicationConstants.url.page.childabuseEdit], { queryParamsHandling: 'preserve' });
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
