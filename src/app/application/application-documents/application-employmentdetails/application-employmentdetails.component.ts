import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit, AfterContentInit, AfterViewChecked, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Constant } from 'src/app/_shared/constant';
import { LookupReasonForSeverance, ApplicationLookups, EmploymentDetails, Personnel, UnEmploymentDetails } from '../../application-interface';
import { cloneDeep } from 'lodash';
import { PopoverControllerComponent } from 'src/app/_shared/modals/popover-controller/popover-controller.component';
import { PopoverController } from '@ionic/angular';
import { UtilityService } from 'src/app/_core/services/utility.service';
import { FormLookups, LookupFormStatus } from 'src/app/forms/forms-interface';
import { ApplicationConstants } from '../../application.constants';
import { CompareName } from 'src/app/_shared/validations/compare-text.validations';

@Component({
  selector: 'app-application-employmentdetails',
  templateUrl: 'application-employmentdetails.component.html',
  styleUrls: ['./application-employmentdetails.component.scss'],
})
export class ApplicationEmploymentDetailsComponent implements OnInit, OnChanges {


  lookupReasonForSeverance: LookupReasonForSeverance[];
  public _employmentDetail: any;
  @Input() value: boolean | string;
  @Input() employmentDetail: EmploymentDetails;
  @Input() providerId: number;
  @Input() personName: string;
  @Input() formId: number;
  @Input() personId: number;
  @Input() options: string[];
  @Input() applicationLookups: ApplicationLookups;
  @Input() sharedOfficeUseOnlyPartialForm: FormGroup;
  @Input() isDisabled: boolean;
  textareaMaxlength: number = Constant.textareaMaxlength;
  @Input() formLookups: FormLookups;
  isCurrentlyEmployed: boolean;
  showCurrentDate: string;
  jobDutiesMaxlength = Constant.jobDutiesMaxlength;
  phoneMask = Constant.maskPattern.phoneMask;
  // @Output() ionChange = new EventEmitter<boolean>();
  @Output() updateEmployed = new EventEmitter<EmploymentDetails>();
  @Output() createEmployed = new EventEmitter<EmploymentDetails>();
  @Output() updateUnemployed = new EventEmitter<UnEmploymentDetails>();
  @Output() createUnemployed = new EventEmitter<UnEmploymentDetails>();
  public employmentDetailsForm: FormGroup;
  textAreaRemainingCharacters: number;
  newFormStatusId: number;
  completedFormStatusId: number;
  jobDutiesRemainingCharacters: number;
  currentDate: Date;
  isEmployed = true;


  constructor(private formBuilder: FormBuilder, private utilitiesService: UtilityService) {
    this.currentDate = new Date();
    this.showCurrentDate = this.currentDate.getDate() + '/' + Number(this.currentDate.getMonth() + 1) + '/' + this.currentDate.getFullYear();
  }

  ngOnChanges() {
    if (this.applicationLookups && this.applicationLookups.lookupReasonForSeverance.length > 0) {
      this.lookupReasonForSeverance = this.applicationLookups.lookupReasonForSeverance;
    }

    if (this.formLookups && this.formLookups.lookupFormStatus.length > 0) {
      const index = this.formLookups.lookupFormStatus.findIndex((lookup) => lookup.formStatus === 'New');
      const completedIndex = this.formLookups.lookupFormStatus.findIndex((form) => form.formStatus === 'Complete');
      this.newFormStatusId = this.formLookups.lookupFormStatus[index].formStatusId;
      this.completedFormStatusId = this.formLookups.lookupFormStatus[completedIndex].formStatusId;

    }


    if (this.employmentDetailsForm && this.formId) {
      this.employmentDetailsForm.get('personId').setValue(this.personId);
      this.employmentDetailsForm.get('formId').setValue(this.formId);
    }
  }

  ngOnInit() {
    this.initializaEmploymentDetailFormGroup();
    this.setEmploymentDetailFormValue(this.employmentDetail);
    if (this.employmentDetail) {
      if (this.employmentDetail.isEmployed === false) {
        // this.employmentDetailsForm.updateValueAndValidity();
        this.employmentDetailsForm.get('startDate').setValidators(Validators.required);
        this.employmentDetailsForm.get('endDate').setValidators(Validators.required);
        this.employmentDetailsForm.get('employerName').clearValidators();
        this.employmentDetailsForm.get('employerName').updateValueAndValidity();
        this.employmentDetailsForm.get('positionHeld').clearValidators();
        this.employmentDetailsForm.get('positionHeld').updateValueAndValidity();
        this.employmentDetailsForm.get('employerStreetAddress').clearValidators();
        this.employmentDetailsForm.get('employerStreetAddress').updateValueAndValidity();
        this.employmentDetailsForm.get('employerCity').clearValidators();
        this.employmentDetailsForm.get('employerCity').updateValueAndValidity();
        this.employmentDetailsForm.get('employerState').clearValidators();
        this.employmentDetailsForm.get('employerState').updateValueAndValidity();
        this.employmentDetailsForm.get('employerZipCode').clearValidators();
        this.employmentDetailsForm.get('employerZipCode').updateValueAndValidity();
        this.employmentDetailsForm.get('employerPhone').clearValidators();
        this.employmentDetailsForm.get('employerPhone').updateValueAndValidity();
        this.employmentDetailsForm.get('employerEmail').clearValidators();
        this.employmentDetailsForm.get('employerEmail').updateValueAndValidity();
        this.employmentDetailsForm.get('employerWebsite').clearValidators();
        this.employmentDetailsForm.get('employerWebsite').updateValueAndValidity();
        this.employmentDetailsForm.get('supervisorName').clearValidators();
        this.employmentDetailsForm.get('supervisorName').updateValueAndValidity();
        this.employmentDetailsForm.get('supervisorPhone').clearValidators();
        this.employmentDetailsForm.get('supervisorPhone').updateValueAndValidity();
        this.employmentDetailsForm.get('supervisorEmail').clearValidators();
        this.employmentDetailsForm.get('supervisorEmail').updateValueAndValidity();
        this.employmentDetailsForm.get('reasonForSeveranceId').clearValidators();
        this.employmentDetailsForm.get('reasonForSeveranceId').updateValueAndValidity();
        this.employmentDetailsForm.get('jobDuties').clearValidators();
        this.employmentDetailsForm.get('jobDuties').updateValueAndValidity();
        this.employmentDetailsForm.get('formSignedBy').clearValidators();
        this.employmentDetailsForm.get('formSignedBy').updateValueAndValidity();
        // this.employmentDetailsForm.updateValueAndValidity();

      } else {
        this.employmentDetailsForm.get('employerName').setValidators(Validators.required);
        // this.employmentDetailsForm.get('employerName').updateValueAndValidity();
        this.employmentDetailsForm.get('startDate').setValidators(Validators.required);
        // this.employmentDetailsForm.get('startDate').updateValueAndValidity();
        this.employmentDetailsForm.get('endDate').setValidators(Validators.required);
        // this.employmentDetailsForm.get('endDate').updateValueAndValidity();
        // this.employmentDetailsForm.get('employerName').updateValueAndValidity();
        this.employmentDetailsForm.get('positionHeld').setValidators(Validators.required);
        // this.employmentDetailsForm.get('positionHeld').updateValueAndValidity();
        this.employmentDetailsForm.get('employerStreetAddress').setValidators(Validators.required);
        // this.employmentDetailsForm.get('employerStreetAddress').updateValueAndValidity();
        this.employmentDetailsForm.get('employerCity').setValidators(Validators.required);
        // this.employmentDetailsForm.get('employerCity').updateValueAndValidity();
        this.employmentDetailsForm.get('employerState').setValidators(Validators.required);
        // this.employmentDetailsForm.get('employerState').updateValueAndValidity();
        this.employmentDetailsForm.get('employerZipCode').setValidators(Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5)]));
        // this.employmentDetailsForm.get('employerZipCode').updateValueAndValidity();
        this.employmentDetailsForm.get('employerPhone').setValidators(Validators.compose([Validators.required, Validators.minLength(14), Validators.maxLength(14)]));
        // this.employmentDetailsForm.get('employerPhone').updateValueAndValidity();
        this.employmentDetailsForm.get('employerEmail').setValidators(Validators.compose([Validators.required, Validators.email]));
        // this.employmentDetailsForm.get('employerEmail').updateValueAndValidity();
        // this.employmentDetailsForm.get('employerWebsite').setValidators(Validators.required);
        // this.employmentDetailsForm.get('employerWebsite').updateValueAndValidity();
        this.employmentDetailsForm.get('supervisorName').setValidators(Validators.required);
        // this.employmentDetailsForm.get('supervisorName').updateValueAndValidity();
        this.employmentDetailsForm.get('supervisorPhone').setValidators(Validators.compose([Validators.required, Validators.minLength(14), Validators.maxLength(14)]));
        // this.employmentDetailsForm.get('supervisorPhone').updateValueAndValidity();
        this.employmentDetailsForm.get('supervisorEmail').setValidators(Validators.compose([Validators.required, Validators.email]));
        // this.employmentDetailsForm.get('supervisorEmail').updateValueAndValidity();
        this.employmentDetailsForm.get('reasonForSeveranceId').setValidators(Validators.required);
        // this.employmentDetailsForm.get('reasonForSeveranceId').updateValueAndValidity();
        this.employmentDetailsForm.get('jobDuties').setValidators(Validators.required);
        this.employmentDetailsForm.updateValueAndValidity();

      }
      if (this.employmentDetail?.formSignedDate) {
        this.showCurrentDate = this.employmentDetail.formSignedDate.getDate() + Number(this.employmentDetail.formSignedDate.getMonth() + 1) + '/' + this.employmentDetail.formSignedDate.getFullYear();
      }

    }

    this.employmentDetailsForm.get('isCurrent').valueChanges.subscribe((value) => {
      if (value) {
        this.employmentDetailsForm.get('endDate').reset();
        this.employmentDetailsForm.get('endDate').disable();
      } else {
        this.employmentDetailsForm.get('endDate').enable();

      }
    });
    this.employmentDetailsForm.get('reasonForSeveranceId').valueChanges.subscribe((value) => {
      if (value === this.applicationLookups?.lookupReasonForSeverance[7]?.reasonForSeveranceId) {
        this.employmentDetailsForm.get('reasonForSeveranceDescription').enable();
      } else {
        this.employmentDetailsForm.get('reasonForSeveranceDescription').reset();
        this.employmentDetailsForm.get('reasonForSeveranceDescription').disable();

      }
    });

    if (this.personName && this.employmentDetailsForm) {
      this.employmentDetailsForm.get('personName').setValue(this.personName);
    }
  }


  public setActionSheetHeader() {
    return {
      header: 'Select Reason'
    };
  }

  initializaEmploymentDetailFormGroup(): void {
    this.employmentDetailsForm = this.formBuilder.group({
      formId: this.formId ? this.formId : 0,
      providerId: this.providerId ? this.providerId : 0,
      personId: this.personId ? this.personId : 0,
      employmentHistoryByApplicantId: 0,
      isCurrent: false,
      personName: this.personName ? this.personName : '',
      isEmployed: true,
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      employerName: ['', [Validators.required]],
      positionHeld: ['', [Validators.required]],
      employerStreetAddress: ['', [Validators.required]],
      employerCity: ['', [Validators.required]],
      employerState: ['', [Validators.required]],
      employerZipCode: ['', [Validators.required]],
      employerPhone: [null, [Validators.required]],
      employerPhoneExtn: '',
      employerEmail: ['', [Validators.required]],
      employerWebsite: '',
      supervisorName: ['', [Validators.required]],
      supervisorPhone: [null, [Validators.required]],
      supervisorPhoneExtn: '',
      supervisorEmail: ['', [Validators.required]],
      reasonForSeveranceId: [null, [Validators.required]],
      reasonForSeveranceDescription: [''],
      reason: [''],
      jobDuties: ['', [Validators.required]],
      formStatusId: 0,
      formStatus: null,
      employmentHistoryAttachmentCount: 0,
      formSignedBy: ['', [Validators.required]],
      formSignedByPersonId: this.personId ? this.personId : 0,
      formSignedDate: this.currentDate
    }, {
      // Used custom form validator name
      validator: CompareName('personName' , 'formSignedBy')
    });

    // this.employmentDetailsForm.get()
  }

  // if the employmentDetail exists patch in the employment detail
  setEmploymentDetailFormValue(employmentDetail: EmploymentDetails) {
    if (employmentDetail) {

      this.employmentDetailsForm.patchValue(employmentDetail);
    } else {
      this.employmentDetailsForm.reset();
      this.initializaEmploymentDetailFormGroup();
    }

  }

  toggle_value(event) {
    this.isEmployed = !this.isEmployed;
    if (this.employmentDetailsForm) {
      if (this.isEmployed === false) {
        // this.employmentDetailsForm.updateValueAndValidity();
        this.employmentDetailsForm.get('startDate').setValidators(Validators.required);
        this.employmentDetailsForm.get('endDate').setValidators(Validators.required);
        this.employmentDetailsForm.get('employerName').clearValidators();
        this.employmentDetailsForm.get('employerName').updateValueAndValidity();
        this.employmentDetailsForm.get('positionHeld').clearValidators();
        this.employmentDetailsForm.get('positionHeld').updateValueAndValidity();
        this.employmentDetailsForm.get('employerStreetAddress').clearValidators();
        this.employmentDetailsForm.get('employerStreetAddress').updateValueAndValidity();
        this.employmentDetailsForm.get('employerCity').clearValidators();
        this.employmentDetailsForm.get('employerCity').updateValueAndValidity();
        this.employmentDetailsForm.get('employerState').clearValidators();
        this.employmentDetailsForm.get('employerState').updateValueAndValidity();
        this.employmentDetailsForm.get('employerZipCode').clearValidators();
        this.employmentDetailsForm.get('employerZipCode').updateValueAndValidity();
        this.employmentDetailsForm.get('employerPhone').clearValidators();
        this.employmentDetailsForm.get('employerPhone').updateValueAndValidity();
        this.employmentDetailsForm.get('employerEmail').clearValidators();
        this.employmentDetailsForm.get('employerEmail').updateValueAndValidity();
        this.employmentDetailsForm.get('employerWebsite').clearValidators();
        this.employmentDetailsForm.get('employerWebsite').updateValueAndValidity();
        this.employmentDetailsForm.get('supervisorName').clearValidators();
        this.employmentDetailsForm.get('supervisorName').updateValueAndValidity();
        this.employmentDetailsForm.get('supervisorPhone').clearValidators();
        this.employmentDetailsForm.get('supervisorPhone').updateValueAndValidity();
        this.employmentDetailsForm.get('supervisorEmail').clearValidators();
        this.employmentDetailsForm.get('supervisorEmail').updateValueAndValidity();
        this.employmentDetailsForm.get('reasonForSeveranceId').clearValidators();
        this.employmentDetailsForm.get('reasonForSeveranceId').updateValueAndValidity();
        this.employmentDetailsForm.get('jobDuties').clearValidators();
        this.employmentDetailsForm.get('jobDuties').updateValueAndValidity();
        this.employmentDetailsForm.get('formSignedBy').clearValidators();
        this.employmentDetailsForm.get('formSignedBy').updateValueAndValidity();
        // this.employmentDetailsForm.updateValueAndValidity();

      } else {
        this.employmentDetailsForm.get('employerName').setValidators(Validators.required);
        // this.employmentDetailsForm.get('employerName').updateValueAndValidity();
        this.employmentDetailsForm.get('startDate').setValidators(Validators.required);
        // this.employmentDetailsForm.get('startDate').updateValueAndValidity();
        this.employmentDetailsForm.get('endDate').setValidators(Validators.required);
        // this.employmentDetailsForm.get('endDate').updateValueAndValidity();
        // this.employmentDetailsForm.get('employerName').updateValueAndValidity();
        this.employmentDetailsForm.get('positionHeld').setValidators(Validators.required);
        // this.employmentDetailsForm.get('positionHeld').updateValueAndValidity();
        this.employmentDetailsForm.get('employerStreetAddress').setValidators(Validators.required);
        // this.employmentDetailsForm.get('employerStreetAddress').updateValueAndValidity();
        this.employmentDetailsForm.get('employerCity').setValidators(Validators.required);
        // this.employmentDetailsForm.get('employerCity').updateValueAndValidity();
        this.employmentDetailsForm.get('employerState').setValidators(Validators.required);
        // this.employmentDetailsForm.get('employerState').updateValueAndValidity();
        this.employmentDetailsForm.get('employerZipCode').setValidators(Validators.required);
        // this.employmentDetailsForm.get('employerZipCode').updateValueAndValidity();
        this.employmentDetailsForm.get('employerPhone').setValidators(Validators.required);
        // this.employmentDetailsForm.get('employerPhone').updateValueAndValidity();
        this.employmentDetailsForm.get('employerEmail').setValidators(Validators.required);
        // this.employmentDetailsForm.get('employerEmail').updateValueAndValidity();
        // this.employmentDetailsForm.get('employerWebsite').setValidators(Validators.required);
        // this.employmentDetailsForm.get('employerWebsite').updateValueAndValidity();
        this.employmentDetailsForm.get('supervisorName').setValidators(Validators.required);
        // this.employmentDetailsForm.get('supervisorName').updateValueAndValidity();
        this.employmentDetailsForm.get('supervisorPhone').setValidators(Validators.required);
        // this.employmentDetailsForm.get('supervisorPhone').updateValueAndValidity();
        this.employmentDetailsForm.get('supervisorEmail').setValidators(Validators.required);
        // this.employmentDetailsForm.get('supervisorEmail').updateValueAndValidity();
        this.employmentDetailsForm.get('reasonForSeveranceId').setValidators(Validators.required);
        // this.employmentDetailsForm.get('reasonForSeveranceId').updateValueAndValidity();
        this.employmentDetailsForm.get('jobDuties').setValidators(Validators.required);
        this.employmentDetailsForm.get('formSignedBy').setValidators(Validators.required);
        this.employmentDetailsForm.updateValueAndValidity();

      }
    }
  }
  markAsTouched() {
    this.employmentDetailsForm.updateValueAndValidity();
    this.markFormGroupTouched(this.employmentDetailsForm);
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    (Object as any).values(formGroup.controls).forEach(control => {
      control.setValue(control.value);
    });
  }

  public getEmploymentDetailFormValue(): EmploymentDetails {
    if (this.employmentDetailsForm) {
      this._employmentDetail = cloneDeep(this.employmentDetailsForm.value);
      if (this._employmentDetail.isEmployed === 'true' || this._employmentDetail.isEmployed === true) {
        this._employmentDetail.isEmployed = true;
        this.replacePhoneNumber();
        return this._employmentDetail;
      } else {
        this._employmentDetail.isEmployed = false;
        return this._employmentDetail;
      }
    }
  }

  public getUnemployedFormValue(employmentDetail: EmploymentDetails) {
    const unEmployedFormValue: UnEmploymentDetails = {
      formStatusId: this.completedFormStatusId,
      formId: employmentDetail.formId,
      personId: employmentDetail.personId,
      startDate: employmentDetail.startDate,
      isCurrent: employmentDetail.isCurrent,
      endDate: employmentDetail.endDate,
      formStatus: employmentDetail.formStatus,
      employmentHistoryByApplicantId: employmentDetail.employmentHistoryByApplicantId,
      personName: employmentDetail.personName,
      isEmployed: employmentDetail.isEmployed,
      employmentHistoryAttachmentCount: employmentDetail.employmentHistoryAttachmentCount
    };
    return unEmployedFormValue;



  }

  private replacePhoneNumber(): void {
    this._employmentDetail.supervisorPhone = this.utilitiesService.replacePhoneNumber(this._employmentDetail.supervisorPhone);
    this._employmentDetail.employerPhone = this.utilitiesService.replacePhoneNumber(this._employmentDetail.employerPhone);
  }

  // check and do the crud operations for employmentdetail
  public employmentDetailsCrud() {
    const employmentdetail = this.getEmploymentDetailFormValue();
    if (this.employmentDetail && this.employmentDetail.employmentHistoryByApplicantId && this.employmentDetail.employmentHistoryByApplicantId !== 0) {
      if (employmentdetail.isEmployed === true) {
        employmentdetail.formStatusId = this.completedFormStatusId;
        // employmentdetail.formSignedDate = this.currentDate;
        this.updateEmployed.emit(employmentdetail);
      } else {
        const convertedEmploymentDetail = this.getUnemployedFormValue(employmentdetail);
        this.updateUnemployed.emit(convertedEmploymentDetail);
      }
    } else {
      if (employmentdetail.isEmployed === true) {
        employmentdetail.formStatusId = this.completedFormStatusId;
        this.createEmployed.emit(employmentdetail);
      } else {
        const convertedEmploymentDetail = this.getUnemployedFormValue(employmentdetail);
        this.createUnemployed.emit(convertedEmploymentDetail);
      }
    }
  }

  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }


}


