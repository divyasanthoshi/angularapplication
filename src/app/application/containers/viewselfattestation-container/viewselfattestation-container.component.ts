import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-viewselfattestation-container',
  templateUrl: './viewselfattestation-container.component.html',
  styleUrls: ['./viewselfattestation-container.component.scss'],
})
export class ViewSelfAttestationContainerComponent implements OnInit {
  formId: number;
  formTypeId;
  currentProviderId$: Observable<number>;
  formItem: FormList;
  zoningAttestationSourceList$: Observable<ZoningAttestationSourceList>;
  selfAttestationDetails$: Observable<SelfAttestationDetails>;
  constructor(private router: Router, private store: Store<fromApplication.State>) { }

  ngOnInit() {
    this.store.select(getRouterInfo).subscribe((data) => {
      this.formId = data.queryParams.formId;
      if (this.formId !== undefined) {
        this.store.dispatch(new applicationActions.LoadProviderId(this.formId));
      }
    });
    this.currentProviderId$ = this.store.pipe(select(fromApplication.getCurrentProviderId));
    this.currentProviderId$.subscribe((res) => {
      if (res) {
        this.store.pipe(select(fromApplication.getPeopleDocumentByPersonId)).subscribe((data: FormList) => {
          this.formItem = data;
        });
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

  navigate() {
    const url = ApplicationConstants.url.page.zoningAttestation;
    this.store.dispatch(new Go({
      path: [url],
      extras: { replaceUrl: false, queryParamsHandling: 'preserve' }
    }));
  }

  editSelfAttestation() {
    this.router.navigate([ApplicationConstants.url.page.editSelfAttestation], { queryParamsHandling: 'preserve' });
  }
}

