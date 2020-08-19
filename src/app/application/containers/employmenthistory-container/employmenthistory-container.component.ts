import { Component, OnInit } from '@angular/core';
import { ApplicationConstants } from '../../application.constants';
import * as fromApplication from '../../state';
import * as applicationActions from '../../state/application.actions';
import { Store, select } from '@ngrx/store';
import { getRouterInfo } from '../../state';
import { Observable } from 'rxjs';
import { EmploymentDetails, Personnel, EmploymentHistory, ApplicationLookups } from '../../application-interface';
import { Router } from '@angular/router';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-employmenthistory-container',
  templateUrl: 'employmenthistory-container.component.html',
  styleUrls: ['./employmenthistory-container.component.scss'],
})
export class EmploymenthistoryContainerComponent implements OnInit {
  employmentHistory$: Observable<EmploymentHistory>;
  applicationLookups$: Observable<ApplicationLookups>;
  currentViewEmploymentDetail$: Observable<any>;
  employmentDetailsCount = 0;
  attachmentCount: number;
  formId: number;
  documentId: number;
  people: Personnel[];
  personId: number;
  personFromStateId: number;
  currentProviderId$: Observable<number>;
  constructor(private store: Store<fromApplication.State>, private router: Router) { }

  ngOnInit() {

    this.store.select(getRouterInfo).subscribe((data) => {
      this.documentId = data.queryParams.documentId;
      this.formId = data.queryParams.formId;
      if (this.formId) {
        this.store.dispatch(new applicationActions.LoadProviderId(this.formId));
      }
    });
    this.currentProviderId$ = this.store.pipe(select(fromApplication.getCurrentProviderId));
    this.currentProviderId$.subscribe(res => {
      if (res !== 0) {
        this.store.pipe(select(fromApplication.getCurrentPersonId)).subscribe((data) => {
          if (data && data !== 0) {
            this.personFromStateId = data;
            // this.store.dispatch(new applicationActions.LoadEmploymentHistory(this.personFromStateId));
          }
        });
      }
    });

    this.employmentHistory$ = this.store.pipe(select(fromApplication.getEmploymentHistory));
    this.employmentHistory$.subscribe(data => {
      if (data && data.employmentHistoryDetails?.length > 0) {
        this.store.dispatch(new applicationActions.SetCurrentEmploymentHistoryFormId(data.employmentHistoryDetails[0].formId));
        this.employmentDetailsCount = data.employmentHistoryDetails.length;
        if (data.employmentHistoryDetails[0].isEmployed) {
          this.currentViewEmploymentDetail$ = this.store.pipe(select(fromApplication.getEmploymentDetails));
        } else {
          this.currentViewEmploymentDetail$ = this.store.pipe(select(fromApplication.getUnEmploymentDetails));
        }
      } else {
        this.employmentDetailsCount = 0;
      }

    });

    this.currentViewEmploymentDetail$.subscribe((employmentDetail) => {
      if (employmentDetail && employmentDetail.isEmployed === true) {
        this.attachmentCount = employmentDetail.employmentHistoryAttachmentCount;
      } else {
        this.attachmentCount = 0;
      }
      });


    this.applicationLookups$ = this.store.pipe(select(fromApplication.getApplicationLookups));

  }


  editEmploymentDetails(employmentHistoryByApplicantId: number) {
    this.store.dispatch(new applicationActions.LoadEmploymentDetail(employmentHistoryByApplicantId));
    this.store.dispatch(new applicationActions.SetCurrentEmploymentHistoryByApplicantlId(employmentHistoryByApplicantId));
    this.navigateToNextPage(ApplicationConstants.url.page.empHistoryEdit);
  }

  createEmploymentDetails() {
    this.store.dispatch(new applicationActions.ResetCurrentEmploymentHistoryByApplicantId());
    this.navigateToNextPage(ApplicationConstants.url.page.empHistoryCreate);
  }

  createEmploymentDetail(event: boolean) {
    this.store.dispatch(new applicationActions.ResetCurrentEmploymentHistoryByApplicantId());
    this.navigateToNextPage(ApplicationConstants.url.page.empHistoryCreate);
  }


  setCurrentEmploymentHistoryByApplicantId(employmentHistoryByApplicantId: number) {
    this.store.dispatch(new applicationActions.SetCurrentEmploymentHistoryByApplicantlId(employmentHistoryByApplicantId));
    this.store.dispatch(new applicationActions.LoadProvider());
  }


  viewEmploymentDetails(event) {
    this.store.dispatch(new applicationActions.SetCurrentEmploymentHistoryByApplicantlId(event[0]));
    if (event[1] === true) {
      this.store.dispatch(new applicationActions.LoadEmploymentDetail(event[0]));
    } else {
      this.store.dispatch(new applicationActions.LoadUnEmploymentDetail(event[0]));
    }
    this.navigateToNextPage(ApplicationConstants.url.page.empHistoryView);
  }


  editEmploymentDetail() {
    this.navigateToNextPage(ApplicationConstants.url.page.empHistoryEdit);
  }

  navigateToNextPage(path) {
    this.router.navigate([path], { queryParams: { documentId: this.documentId, formId: this.formId } });
  }
}
