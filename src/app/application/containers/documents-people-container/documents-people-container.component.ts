import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getRouterInfo } from '../../state';
import * as applicationActions from '../../state/application.actions';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromApplication from '../../state';
import { DocumentsPeople, FormList, EmploymentHistory } from '../../application-interface';
import { Go } from 'src/app/reducers/routerstate/router.actions';
import { ApplicationConstants } from '../../application.constants';
import { DocumentsPeopleComponent } from 'src/app/_shared/components/documents-people/documents-people.component';
import { FormTypes } from '../../../_shared/enum';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-documents-people-container',
  templateUrl: './documents-people-container.component.html',
  styleUrls: ['./documents-people-container.component.scss'],
})
export class DocumentsPeopleContainerComponent implements OnInit {
  formId: number;
  formTypeId;
  currentProviderId$: Observable<number>;
  documentsPeopleDta: DocumentsPeople;
  peopleDocuments$: Observable<DocumentsPeople>;
  peopleDocuments: DocumentsPeople;
  loadEmploymentHistory$: Observable<EmploymentHistory>;
  constructor(private route: ActivatedRoute, private store: Store<fromApplication.State>) { }

  ngOnInit() {
    this.store.select(getRouterInfo).subscribe((data) => {
      this.formId = data.queryParams.formId;
      this.formTypeId = FormTypes[data.params.formTypeId];
      if (this.formId !== undefined) {
        this.store.dispatch(new applicationActions.LoadProviderId(this.formId));
      }
    });
    this.currentProviderId$ = this.store.pipe(select(fromApplication.getCurrentProviderId));
    this.currentProviderId$.subscribe((res) => {
      if (res !== 0) {
        this.store.dispatch(new applicationActions.LoadPeopleDocuments(this.formTypeId));
      }
      this.store.pipe(select(fromApplication.getPeopleDocuments)).subscribe(peopledocus => {
        this.peopleDocuments$ = this.store.pipe(select(fromApplication.getPeopleDocuments));
      });
    });

    this.peopleDocuments$.subscribe((res) => {
      if (res && res.formList.length > 0) {
        //  this.formId = res.formList[0].formId;
        this.peopleDocuments = res;
      }
    });

  }
  getEmploymentHistoryFormId(personId: number) {
    let formId = 0;
    this.peopleDocuments$.subscribe((res) => {
      if
        (res && res.formList.length > 0) {
        const index = res.formList.findIndex((formList) => formList.personId === personId);
        formId = res.formList[index].formId;
        this.store.dispatch(new applicationActions.SetCurrentEmploymentHistoryFormId(formId));
      }
    });
  }

  getAGMCFormId(personId: number): number {
    let formId = 0;
    const index = this.peopleDocuments.formList.findIndex((formList) => formList.personId === personId);
    formId = this.peopleDocuments.formList[index].formId;
    return formId;
  }

  navigateToPeopleForm(selectedPerson: FormList) {
    const url = this.getFormTypeUrl('' + this.formTypeId, selectedPerson.personId);
    if (url) {
      this.store.dispatch(new Go({
        path: [url],
        query: { documentId: selectedPerson.formId, formId: this.formId },
        extras: { state: { formTypeId: this.formTypeId } },
      }));
    }
  }

  getFormTypeUrl(formTypeId, personId) {
    const formText = FormTypes[(formTypeId)];
    const docurl = ApplicationConstants.url.page.documents;
    switch (formTypeId) {
      case '3': {
      //  this.store.dispatch(new applicationActions.SetCurrentPersonnelId(personId));
        const formId = this.getAGMCFormId(personId);
       // this.store.dispatch(new applicationActions.SetAttestationOfGoodMoralCharacterFormId(formId));
      // this.store.dispatch(new applicationActions.LoadAGMCDetails(formId));
        return docurl + '/AGMC/view';
        break;
      }
      case '4': return ''; break;
      case '5': {
        this.store.dispatch(new applicationActions.SetCurrentPersonnelId(personId));
        return docurl + '/CANR/view'; break;
      }
      case '6': {
        this.store.dispatch(new applicationActions.SetCurrentPersonnelId(personId));
        this.getEmploymentHistoryFormId(personId);
        this.store.dispatch(new applicationActions.SetCurrentEmploymentHistoryFormId(this.formId));
        this.store.dispatch(new applicationActions.LoadEmploymentHistory(personId));
        this.store.pipe(select(fromApplication.getEmploymentHistory), take(2)).subscribe(data => {
          if (data && data.employmentHistoryDetails?.length > 0) {
            const event = [];
            event[0] = data.employmentHistoryDetails[0].employmentHistoryByApplicantId;
            event[1] = data.employmentHistoryDetails[0].isEmployed;
            this.store.dispatch(new applicationActions.SetCurrentEmploymentHistoryByApplicantlId(event[0]));
            if (event[1] === true) {
              this.store.dispatch(new applicationActions.LoadEmploymentDetail(event[0]));
            } else {
              this.store.dispatch(new applicationActions.LoadUnEmploymentDetail(event[0]));
            }
          } else  {
            // this.store.dispatch(new applicationActions.SetCurrentEmploymentHistoryByApplicantlId(0));
            // this.store.dispatch(new applicationActions.LoadEmploymentDetailSuccess([]));
            // this.store.dispatch(new applicationActions.LoadUnEmploymentDetailSuccess([]));

          }
        });
        return ApplicationConstants.url.page.empHistory;
        break;
      }
      case '7': return ApplicationConstants.url.page.zoningAttestation; break;
      default: return ''; break;
    }
  }

}
