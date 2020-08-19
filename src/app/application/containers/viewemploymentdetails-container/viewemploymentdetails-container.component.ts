import { Component, OnInit } from '@angular/core';
import { EmploymentDetails, UnEmploymentDetails, ApplicationLookups, EmploymentHistory } from '../../application-interface';
import { ApplicationConstants } from '../../application.constants';
import { getRouterInfo } from '../../state';
import { Router, ActivatedRoute } from '@angular/router';
import * as fromApplication from '../../state';
import * as applicationActions from '../../state/application.actions';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-viewemploymentdetails-container',
  templateUrl: './viewemploymentdetails-container.component.html',
  styleUrls: ['./viewemploymentdetails-container.component.scss'],
})
export class ViewemploymentdetailsContainerComponent implements OnInit {
  currentViewEmploymentDetail$: Observable<any>;
  employmentHistory$: Observable<EmploymentHistory>;
  applicationLookups$: Observable<ApplicationLookups>;
  attachmentCount: number;
  employmentDetailsCount: number;
  formId: number;
  documentId: number;
  constructor(private router: Router, private store: Store<fromApplication.State>) { }

  ngOnInit() {
    this.store.select(getRouterInfo).subscribe((data) => {
      this.formId = data.queryParams.formId;
      this.documentId = data.queryParams.documentId;
    });
    this.store.pipe(select(fromApplication.getEmploymentDetails)).subscribe((data) => {
      if (data) {
        this.currentViewEmploymentDetail$ = this.store.pipe(select(fromApplication.getEmploymentDetails));
      } else {
        this.currentViewEmploymentDetail$ = this.store.pipe(select(fromApplication.getUnEmploymentDetails));
      }
    });
    this.applicationLookups$ = this.store.pipe(select(fromApplication.getApplicationLookups));
    this.currentViewEmploymentDetail$.subscribe((employmentDetail) => {
      if (employmentDetail && employmentDetail.isEmployed === true) {
        this.attachmentCount = employmentDetail.employmentHistoryAttachmentCount;

      } else {
        this.attachmentCount = 0;
      }
    });

    this.employmentHistory$ = this.store.pipe(select(fromApplication.getEmploymentHistory));
    this.employmentHistory$.subscribe(data => {
      if (data && data.employmentHistoryDetails?.length > 0) {
        this.store.dispatch(new applicationActions.SetCurrentEmploymentHistoryFormId(data.employmentHistoryDetails[0].formId));
        this.employmentDetailsCount = data.employmentHistoryDetails.length;
      }
    });
  }

  editEmploymentDetail() {
    const docurl = ApplicationConstants.url.page.documents + '/EH/edit';
    this.router.navigate([docurl], { queryParams: {documentId: this.documentId, formId: this.formId}});
  }


  viewEmploymentDetails(event) {
    this.store.dispatch(new applicationActions.SetCurrentEmploymentHistoryByApplicantlId(event[0]));
    if (event[1] === true) {
      this.store.dispatch(new applicationActions.LoadEmploymentDetail(event[0]));
    } else {
      this.store.dispatch(new applicationActions.LoadUnEmploymentDetail(event[0]));
    }
    // this.router.navigate([ApplicationConstants.url.page.viewEmploymentDetails], { queryParamsHandling: 'preserve' });
    const docurl = ApplicationConstants.url.page.documents + '/EH/view';
    this.router.navigate([docurl], { queryParams: { documentId: this.documentId, formId: this.formId } });
  }

  createEmploymentDetails() {
    this.store.dispatch(new applicationActions.ResetCurrentEmploymentHistoryByApplicantId());
    // const url = ApplicationConstants.url.page.createEmploymentDetails;
    const docurl = ApplicationConstants.url.page.documents + '/EH/create';
    this.router.navigate([docurl], { queryParams: { documentId: this.documentId, formId: this.formId } });
   // this.router.navigate([ApplicationConstants.url.page.createEmploymentDetails], { queryParamsHandling: 'preserve' });
  }

  createEmploymentDetail(event: boolean) {
    this.store.dispatch(new applicationActions.ResetCurrentEmploymentHistoryByApplicantId());
    // const url = ApplicationConstants.url.page.createEmploymentDetails;
    const docurl = ApplicationConstants.url.page.documents + '/EH/create';
    this.router.navigate([docurl], { queryParams: { documentId: this.documentId, formId: this.formId } });
  //  this.router.navigate([ApplicationConstants.url.page.createEmploymentDetails], { queryParamsHandling: 'preserve' });
  }

}
