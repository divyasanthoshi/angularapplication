import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ApplicationConstants } from '../../application.constants';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromApplication from '../../state';
import { FormTypes } from 'src/app/_shared/enum';
import { getRouterInfo } from '../../state';
import * as applicationActions from '../../state/application.actions';
import { ChildAbuseReportingDetails, FormList, ZoningAttestationSourceList, LookupZoningAttestationSource } from '../../application-interface';
import { ApplicationChildAbuseReportingComponent } from '../../application-documents/application-childabusereporting/application-childabusereporting.component';
import { Go } from 'src/app/reducers/routerstate/router.actions';
import { ApplicationZoningAttestationComponent } from '../../application-documents/application-zoningattestation/application-zoningattestation.component';

@Component({
  selector: 'app-zoningattestation-container',
  templateUrl: './zoningattestation-container.component.html',
  styleUrls: ['./zoningattestation-container.component.scss'],
})
export class ZoningattestationContainerComponent implements OnInit {

  formId: number;
  formTypeId;
  currentProviderId$: Observable<number>;
  isDisabled: boolean;
  zoningAttestationSourceList$: Observable<ZoningAttestationSourceList>;
  formItem: FormList;
  url = {
    3: '/application/childabuse/view',
    4: '/application/selfattestation',
    5: '/application/selfattestation/view'
  };
  constructor(private router: Router, private store: Store<fromApplication.State>) { }

  ngOnInit() {
    this.store.pipe(select(fromApplication.getPeopleDocumentByPersonId)).subscribe((data: FormList) => {
      this.formItem = data;
    });
    this.store.select(getRouterInfo).subscribe((data) => {
      this.formId = data.queryParams.formId;
      this.formTypeId = FormTypes[data.params.formTypeId];
      if (this.formId !== undefined) {
        this.store.dispatch(new applicationActions.LoadProviderId(this.formId));
      }
    });
    this.currentProviderId$ = this.store.pipe(select(fromApplication.getCurrentProviderId));
    this.currentProviderId$.subscribe((res) => {
      if (res) {
        this.store.dispatch(new applicationActions.LoadZoningAttestationSourceList(+res));
      }
    });
    this.zoningAttestationSourceList$ = this.store.pipe(select(fromApplication.getZoningAttestationSourceList));
  }

  cancel() {
    this.navigate();
  }

  navigate() {
    const url = ApplicationConstants.url.page.documents;
    this.store.dispatch(new Go({
      path: [url],
      extras: { replaceUrl: false, queryParamsHandling: 'preserve' }
    }));
  }

  navigateToAttestation(item: LookupZoningAttestationSource) {
    this.store.dispatch(new Go({
      path: [this.url[item.zoningAttestationSourceId]],
      extras: { replaceUrl: false, queryParamsHandling: 'preserve' }
    }));
  }

}
