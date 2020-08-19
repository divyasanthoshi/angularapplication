import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplicationConstants } from '../../application.constants';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromApplication from '../../state';
import { getRouterInfo } from '../../state';
import * as applicationActions from '../../state/application.actions';
import { Observable } from 'rxjs';
import { Provider, AttestationOfGoodMoralCharacter, DocumentsPeople, FormList } from '../../application-interface';
import { ApplicationAttestationComponent } from '../../application-documents/application-attestation/application-attestation.component';
import { FormTypes } from 'src/app/_shared/enum';
import { Go } from 'src/app/reducers/routerstate/router.actions';
import { map } from 'rxjs/internal/operators/map';
import { filter } from 'rxjs/operators';
import { FormLookups } from 'src/app/forms/forms-interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-attestation-container',
  templateUrl: './attestation-container.component.html',
  styleUrls: ['./attestation-container.component.scss'],
})
export class AttestationContainerComponent implements OnInit {
  agmcDetails$: Observable<AttestationOfGoodMoralCharacter>;
  agmcFormId$: Observable<number>;
  provider$: Observable<Provider>;
  peopleDocuments$: Observable<DocumentsPeople>;
  formLookups$: Observable<FormLookups>;
  personName: string;
  isDisabled: boolean;
  formId: number;
  formTypeId;
  documentId: number;
  personId: number;
  providerId$: Observable<number>;
  providerId: number;
  private state$: Observable<object>;
  @ViewChild(ApplicationAttestationComponent, { static: true }) child: ApplicationAttestationComponent;
  constructor(private store: Store<fromApplication.State>, private _location: Location, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.formLookups$ = this.store.pipe(select(fromApplication.getFormLookups));
    this.store.pipe(select(fromApplication.getCurrentPersonId)).subscribe((data) => this.personId = data);
    this.activatedRoute.url.subscribe((url) => {
      if (!url || !url.length) { return; }
      this.formTypeId = FormTypes[url[0].path];
    });
    this.agmcFormId$ = this.store.pipe(select(fromApplication.getAGMCFormId));
    this.store.select(getRouterInfo).subscribe((data) => {
      this.formId = data.queryParams.formId;
      this.documentId = Number(data.queryParams.documentId);
      if (this.documentId) {
        this.store.dispatch(new applicationActions.SetAttestationOfGoodMoralCharacterFormId(this.documentId));
        this.store.dispatch(new applicationActions.LoadAGMCDetails(this.documentId));
      }
      if (this.formId) {
        this.store.dispatch(new applicationActions.LoadProviderId(this.formId));
      }
    });
    this.providerId$ = this.store.pipe(select(fromApplication.getCurrentProviderId));
    this.providerId$.subscribe(res => {
      if (res !== 0) {
        this.providerId = res;
        this.store.dispatch(new applicationActions.LoadProvider());
        this.store.dispatch(new applicationActions.LoadPeopleDocuments(this.formTypeId));
        this.store.pipe(select(fromApplication.getPeopleDocuments)).subscribe(peopledocus => {
          this.peopleDocuments$ = this.store.pipe(select(fromApplication.getPeopleDocuments));
        });
      }
    });
    this.agmcDetails$ = this.store.pipe(select(fromApplication.getAGMCDetails));
    this.provider$ = this.store.pipe(select(fromApplication.getProvider));
    this.store.pipe(select(fromApplication.getPeopleDocuments)).subscribe((res) => {
      if (res && res.formList.length > 0) {
        const index = res.formList.findIndex((person) => person.formId === this.documentId);
        if (index > -1) {
          this.personName = res.formList[index].personName;
        }
      }
    });
  }
  // navigatetoEditable page when user clicks on pencil icon
  navigateToEditPage() {
    this.isDisabled = false;
    this.navigateToNextPage([ApplicationConstants.url.page.attestationEdit]);
  }

  createAGMCDetails(agmc: AttestationOfGoodMoralCharacter) {
    this.store.dispatch(new applicationActions.CreateAGMCDetails({ ...agmc, providerId: this.providerId }));
    this.navigateToNextPage(ApplicationConstants.url.page.attestationView);
  }

  updateAGMCDetails(agmc: AttestationOfGoodMoralCharacter) {
    this.store.dispatch(new applicationActions.UpdateAGMCDetails({ ...agmc, providerId: this.providerId }));
    this.navigateToNextPage(ApplicationConstants.url.page.attestationView);

  }

  nextPage() {
    if (this.child.agmcDetailsForm.valid) {
      if (this.child.agmcDetailsForm.dirty) {
        this.child.agmcDetailsCrud();
      } else {
        this.navigateToNextPage(ApplicationConstants.url.page.attestationView);
      }
    } else {
      this.child.markAsTouched();
    }
  }

  cancel() {
    this._location.back();
  }
  navigateToNextPage(path) {
    this.router.navigate([path], { queryParams: { documentId: this.documentId, formId: this.formId } });
  }
  navigateToPeopleForm(selectedPerson: FormList) {
    this.store.dispatch(new applicationActions.SetCurrentPersonnelId(selectedPerson.personId));
    this.store.dispatch(new applicationActions.LoadAGMCDetails(selectedPerson.formId));
    this.store.dispatch(new applicationActions.SetAttestationOfGoodMoralCharacterFormId(selectedPerson.formId));
    const url = ApplicationConstants.url.page.attestationView;
    if (url) {
      this.store.dispatch(new Go({
        path: [url],
        query: { documentId: selectedPerson.formId, formId: this.formId },
        extras: { state: { formTypeId: this.formTypeId } },
      }));
    }
  }


}
