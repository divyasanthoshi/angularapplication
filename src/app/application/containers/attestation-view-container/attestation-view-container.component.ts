import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationConstants } from '../../application.constants';
import { AttestationOfGoodMoralCharacter, Provider, DocumentsPeople, FormList } from '../../application-interface';
import { Observable } from 'rxjs';
import * as fromApplication from '../../state';
import { Store, select } from '@ngrx/store';
import { getRouterInfo } from '../../state';
import * as applicationActions from '../../state/application.actions';
import { FormTypes } from 'src/app/_shared/enum';
import { Go } from 'src/app/reducers/routerstate/router.actions';

@Component({
  selector: 'app-attestation-view-container',
  templateUrl: 'attestation-view-container.component.html',
  styleUrls: ['./attestation-view-container.component.scss'],
})
export class AttestationViewContainerComponent implements OnInit {
  agmcDetails$: Observable<AttestationOfGoodMoralCharacter>;
  attachmentCount: number;
  formId: number;
  personId: number;
  personName: string;
  providerId$: Observable<number>;
  provider$: Observable<Provider>;
  documentId: number;
  formTypeId;
  peopleDocuments$: Observable<DocumentsPeople>;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private store: Store<fromApplication.State>) { }

  ngOnInit() {
    // this.agmcDetails$ = this.store.pipe(select(fromApplication.getAGMCDetails));
    this.store.pipe(select(fromApplication.getCurrentPersonId)).subscribe((personId) => {
      if (personId && personId !== 0) {
        this.personId = personId;
      }
    });
    this.activatedRoute.url.subscribe((url) => {
      if (!url || !url.length) { return; }
      this.formTypeId = FormTypes[url[0].path];
    });
    this.store.select(getRouterInfo).subscribe((data) => {
      this.documentId = Number(data.queryParams.documentId);
      this.formId = data.queryParams.formId;
      if (this.formId !== undefined) {
        this.store.dispatch(new applicationActions.LoadProviderId(this.formId));
      }
      if (this.documentId) {
        this.store.dispatch(new applicationActions.SetAttestationOfGoodMoralCharacterFormId(this.documentId));
        this.store.dispatch(new applicationActions.LoadAGMCDetails(this.documentId));
      }
    });

    this.store.pipe(select(fromApplication.getCurrentProviderId)).subscribe((res) => {
      if (res && res !== 0) {
        this.store.dispatch(new applicationActions.LoadProvider());
        this.store.dispatch(new applicationActions.LoadPeopleDocuments(this.formTypeId));
        this.store.pipe(select(fromApplication.getPeopleDocuments)).subscribe(peopledocus => {
          this.peopleDocuments$ = this.store.pipe(select(fromApplication.getPeopleDocuments));
        });
      }
    });
    this.provider$ = this.store.pipe(select(fromApplication.getProvider));
    this.store.pipe(select(fromApplication.getPeople)).subscribe((res) => { });

    this.agmcDetails$ = this.store.pipe(select(fromApplication.getAGMCDetails));
    this.agmcDetails$.subscribe((agmcDetails) => {
      if (agmcDetails) {
        this.attachmentCount = agmcDetails.attachmentCount;
      } else {
        this.attachmentCount = 0;
      }
    });
    this.store.pipe(select(fromApplication.getPeopleDocuments)).subscribe((res) => {
      if (res && res.formList.length > 0) {
        const index = res.formList.findIndex((person) => person.formId === this.documentId);
        if (index > -1) {
          this.personName = res.formList[index].personName;
        }
      }
    });
  }

  navigateToEditPage() {
    // this.store.dispatch(new applicationActions.LoadAGMCDetails(this.formId));
    this.navigateToNextPage(ApplicationConstants.url.page.attestationEdit);
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
