import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplicationConstants } from '../../application.constants';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromApplication from '../../state';
import { Go } from 'src/app/reducers/routerstate/router.actions';
import { Observable } from 'rxjs';
import { getRouterInfo } from '../../state';
import * as applicationActions from '../../state/application.actions';
import { ZoningAttestationSourceList, SelfAttestationDetails, FormList } from '../../application-interface';
import { FormTypes } from 'src/app/_shared/enum';
import { ApplicationSelfAttestationComponent } from '../../application-documents/application-selfattestation/application-selfattestation.component';


@Component({
  selector: 'app-selfattestation-container',
  templateUrl: './selfattestation-container.component.html',
  styleUrls: ['./selfattestation-container.component.scss'],
})
export class SelfAttestationContainerComponent implements OnInit {
  @ViewChild(ApplicationSelfAttestationComponent) private child: ApplicationSelfAttestationComponent;
  formId: number;
  formTypeId;
  currentProviderId$: Observable<number>;
  formItem: FormList;
  zoningAttestationSourceList$: Observable<ZoningAttestationSourceList>;
  selfAttestationDetails$: Observable<SelfAttestationDetails>;
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
        this.store.dispatch(new applicationActions.LoadSelfAttestationDetail(+res));
      }
    });
    this.zoningAttestationSourceList$ = this.store.pipe(select(fromApplication.getZoningAttestationSourceList));
    this.selfAttestationDetails$ = this.store.pipe(select(fromApplication.getSelfAttestationDetails));
  }

  cancel() {
    this.navigate();
  }

  createSelfAttestationDetail(selfAttestationDetails: SelfAttestationDetails) {
    this.store.dispatch(new applicationActions.CreateSelfAttestationDetail(selfAttestationDetails));
    this.navigate();
  }

  updateSelfAttestationDetail(selfAttestationDetails: SelfAttestationDetails) {
    this.store.dispatch(new applicationActions.UpdateSelfAttestationDetail(selfAttestationDetails));
    this.navigate();
  }

  nextPage() {
    const isFormValid = this.child.validateForm();
    if (!isFormValid) {
      return false;
    }
  }

  navigate() {
    const url = ApplicationConstants.url.page.zoningAttestation;
    this.store.dispatch(new Go({
      path: [url],
      extras: { replaceUrl: false, queryParamsHandling: 'preserve' }
    }));
  }

}



