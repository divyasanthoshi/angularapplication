import { Component, OnInit, ViewChild, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationEmploymentDetailsComponent } from './../../application-documents/application-employmentdetails/application-employmentdetails.component';
import * as fromApplication from '../../state';
import * as fromForm from '../../../forms/state';
import * as applicationActions from '../../state/application.actions';
import { Store, select } from '@ngrx/store';
import { LookupReasonForSeverance, ApplicationLookups, EmploymentDetails, Personnel, UnEmploymentDetails, EmploymentHistory } from '../../application-interface';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationConstants } from '../../application.constants';
import { FormLookups } from 'src/app/forms/forms-interface';
import * as FormsAction from '../../../forms/state/forms.actions';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { getRouterInfo } from '../../state';

@Component({
  selector: 'app-employmentdetails-container',
  templateUrl: 'employmentdetails-container.component.html',
  styleUrls: ['./employmentdetails-container.component.scss'],
})
export class EmploymentdetailsContainerComponent implements OnInit {
  applicationLookups$: Observable<ApplicationLookups>;
  currentViewEmploymentDetail$: Observable<any>;
  employmentHistory$: Observable<EmploymentHistory>;
  formLookups$: Observable<FormLookups>;
  currentPersonId$: Observable<number>;
  currentEmploymentHistoryByApplicantId: number;
  documentId: number;
  formId: number;
  attachmentCount: number;
  employmentDetailsCount: number;
  people$: Observable<Personnel[]>;
  providerId$: Observable<number>;
  providerId: number;
  personName: string;
  employmentHistoryByApplicantId: number;
  employmentDetail$: Observable<EmploymentDetails | UnEmploymentDetails>;
  @ViewChild(ApplicationEmploymentDetailsComponent, { static: true }) child: ApplicationEmploymentDetailsComponent;

  employmentStatusOptions = [
    'EMPLOYED',
    'UNEMPLOYED'
  ];
  isEmployed$: Observable<boolean>;
  // this value is used to hold the temporary value for toggle
  isEmployed: boolean;
  url: string;
  constructor(private store: Store<fromApplication.State>,
              private _location: Location,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private alertController: AlertController) { }

  ngOnInit() {

    this.store.select(getRouterInfo).subscribe((data) => {
      this.documentId = data.queryParams.documentId;
      this.formId = data.queryParams.formId;
    });
    if (this.formId) {
      this.store.dispatch(new applicationActions.LoadProviderId(this.formId));
    }
    this.activatedRoute.url.subscribe((seg) => {
      if (!seg || !seg.length) {
        return;
      }
      if (seg[1].path !== 'create') {
        this.store.pipe(select(fromApplication.getEmploymentDetails)).subscribe((data) => {
          if (data) {
            this.employmentDetail$ = this.store.pipe(select(fromApplication.getEmploymentDetails));
          } else {
            this.employmentDetail$ = this.store.pipe(select(fromApplication.getUnEmploymentDetails));
          }
        });
      }
    });
    this.applicationLookups$ = this.store.pipe(select(fromApplication.getApplicationLookups));
    this.currentPersonId$ = this.store.pipe(select(fromApplication.getCurrentPersonId));
    this.formLookups$ = this.store.pipe(select(fromApplication.getFormLookups));
    this.store.pipe(select(fromApplication.getCurrentEmploymentHistoryByApplicantId)).subscribe((id) => this.currentEmploymentHistoryByApplicantId = id);
    this.store.pipe(select(fromApplication.getCurrentEmploymentHistoryFormId)).subscribe((formId) => {
      this.formId = formId;
    });
    this.store.pipe(select(fromApplication.getCurrentPersonId)).subscribe((res) => {
      if (res !== 0) {
        this.store.dispatch(new applicationActions.LoadPersonnel(res));

    }});
    this.providerId$ = this.store.pipe(select(fromApplication.getCurrentProviderId));
    this.store.pipe(select(fromApplication.getCurrentProviderId)).subscribe((providerId) => this.providerId = providerId);
    if (this.employmentDetail$) {
      this.employmentDetail$.subscribe((detail) => {
        if (detail && detail.isEmployed === true) {
          this.attachmentCount = detail.employmentHistoryAttachmentCount;
        } else {
          this.attachmentCount = 0;
        }
      });
    }
    this.employmentHistory$ = this.store.pipe(select(fromApplication.getEmploymentHistory));
    this.employmentHistory$.subscribe(data => {
      if (data) {
        this.personName = data.personName;
      }
      if (data && data.employmentHistoryDetails?.length > 0) {
        this.store.dispatch(new applicationActions.SetCurrentEmploymentHistoryFormId(data.employmentHistoryDetails[0].formId));
        // let event = [];
        // event[0] = data.employmentHistoryDetails[0].employmentHistoryByApplicantId;
        // event[1] = data.employmentHistoryDetails[0].isEmployed;
      //  this.viewEmploymentDetails(event);
        this.employmentDetailsCount = data.employmentHistoryDetails.length;
      }
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
  }
  toggleEmploymentStatus(isEmployed: boolean) {
  }

  public launchErrorModal() {
    this.launchModal({
      title: 'Please confirm'
      , description: 'Are you sure you want to delete ?'
      , listItem: []
    });
  }

  // Validation Modal
  async launchModal(message: any) {
    const alert = await this.alertController.create({
      header: message.title,
      message: message.description,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.delete();
          }
        }
      ]
    });
    await alert.present();
  }



  delete() {
    if (this.child.employmentDetailsForm.get('isEmployed').value === true) {
      this.store.dispatch(new applicationActions.DeleteEmploymentDetail(this.currentEmploymentHistoryByApplicantId));
    } else {
      this.store.dispatch(new applicationActions.DeleteUnEmploymentDetail(this.currentEmploymentHistoryByApplicantId));
    }
    this.navigateToNextPage(ApplicationConstants.url.page.empHistoryView);
  }

  createUnemployedDetailsEdit(unemployedDetails: UnEmploymentDetails) {
    this.store.dispatch(new applicationActions.CreateUnEmploymentDetails({ ...unemployedDetails, providerId: this.providerId }));
    this.navigateToNextPage(ApplicationConstants.url.page.empHistoryView);
  }

  createEmploymentDetailsEdit(employmentdetails: EmploymentDetails) {
    this.store.dispatch(new applicationActions.CreateEmploymentDetails({ ...employmentdetails, providerId: this.providerId }));
    this.navigateToNextPage(ApplicationConstants.url.page.empHistoryView);
  }

  updateEmploymentDetailsEdit(employmentdetails: EmploymentDetails) {
    this.store.dispatch(new applicationActions.UpdateEmploymentDetails({ ...employmentdetails, providerId: this.providerId }));
    this.navigateToNextPage(ApplicationConstants.url.page.empHistoryView);
  }
  updateUnemploymentDetailsEdit(unemployedDetails: UnEmploymentDetails) {
    this.store.dispatch(new applicationActions.UpdateUnEmploymentDetails({ ...unemployedDetails, providerId: this.providerId }));
    this.navigateToNextPage(ApplicationConstants.url.page.empHistoryView);
  }

  createEmploymentDetail(event: boolean) {
    this.store.dispatch(new applicationActions.ResetCurrentEmploymentHistoryByApplicantId());
    this.navigateToNextPage(ApplicationConstants.url.page.empHistoryCreate);
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

  nextPage() {
    if (this.child.employmentDetailsForm.valid) {
      if (this.child.employmentDetailsForm.dirty) {
        this.child.employmentDetailsCrud();
      } else {
        this.navigateToNextPage(ApplicationConstants.url.page.empHistoryView);
      }
    } else {
      this.child.markAsTouched();
    }
  }

  navigateToNextPage(path) {
    this.router.navigate([path], { queryParams: { documentId: this.documentId, formId: this.formId } });
  }

  cancel() {
    this._location.back();
  }


}
