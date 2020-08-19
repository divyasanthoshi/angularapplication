import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ApplicationConstants } from '../../application.constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Provider, AttestationOfGoodMoralCharacter } from '../../application-interface';
import { FormLookups } from 'src/app/forms/forms-interface';
import { CompareName } from 'src/app/_shared/validations/compare-text.validations';

@Component({
  selector: 'app-application-attestation',
  templateUrl: 'application-attestation.component.html',
  styleUrls: ['./application-attestation.component.scss'],
})
export class ApplicationAttestationComponent implements OnInit, OnChanges {
  applicationConstants = ApplicationConstants;
  // isDisabled property which is set based on view/edit mode
  @Input() isDisabled: boolean;
  @Input() providerId: number;
  @Input() provider: Provider;
  @Input() personId: number;
  @Input() agmcFormId: number;
  @Input() formLookups: FormLookups;
  committedOffence: boolean;
  @Input() agmcDetails: AttestationOfGoodMoralCharacter;
  public agmcDetailsForm: FormGroup;
  @Input() personName: string;
  showCurrentDate: string;
  completedFormStatusId: number;
  @Output() update = new EventEmitter<AttestationOfGoodMoralCharacter>();
  @Output() create = new EventEmitter<AttestationOfGoodMoralCharacter>();
  currentDate: Date;

  constructor(private formBuilder: FormBuilder) {
    this.currentDate = new Date();
    this.showCurrentDate = this.currentDate.getDate() + '/' + Number(this.currentDate.getMonth() + 1) + '/' + this.currentDate.getFullYear();
  }

  ngOnChanges() {


    if (this.formLookups && this.formLookups.lookupFormStatus.length > 0) {
      const index = this.formLookups.lookupFormStatus.findIndex((lookup) => lookup.formStatus === 'New');
      const completedIndex = this.formLookups.lookupFormStatus.findIndex((form) => form.formStatus === 'Complete');
      // this.newFormStatusId = this.formLookups.lookupFormStatus[index].formStatusId;
      this.completedFormStatusId = this.formLookups.lookupFormStatus[completedIndex].formStatusId;

    }
    if (this.agmcDetails && this.agmcDetailsForm) {
      this.agmcDetailsForm.patchValue(this.agmcDetails);
      if (this.agmcDetails.hasCommittedOffence === true) {
        this.committedOffence = true;
      } else {
        this.committedOffence = false;
      }
    }

  }


  ngOnInit() {
    // to populate the current date
    this.currentDate = new Date();
    this.initializeAGMCDetailFormGroup();
  }

  initializeAGMCDetailFormGroup(): void {
    this.agmcDetailsForm = this.formBuilder.group({
      formId: this.agmcFormId ? this.agmcFormId : 0,
      providerId: this.providerId ? this.providerId : 0,
      personId: this.personId ? this.personId : 0,
      personName: this.personName ? this.personName : '',
      formStatusId: this.completedFormStatusId,
      formStatus: '',
      hasCommittedOffence: [null, [Validators.required]],
      formSignedByPersonId: 0,
      formSignedBy: [null, [Validators.required]],
      formSignedDate: this.currentDate,
      attachmentCount: 0,
    }, {
      // Used custom form validator name
      validator: CompareName('personName' , 'formSignedBy')
    });

    if (this.agmcDetails && this.agmcDetailsForm) {
      this.agmcDetailsForm.patchValue(this.agmcDetails);
      if (this.agmcDetails.hasCommittedOffence === true) {
        this.committedOffence = true;
      } else {
        this.committedOffence = false;
      }
      console.log(this.agmcDetailsForm.value);
    }

    // if (this.agmcFormId !== 0){
    //   this.agmcDetailsForm.get('formId').setValue(this.agmcFormId);
    // }
}





markAsTouched() {
  this.agmcDetailsForm.updateValueAndValidity();
  this.markFormGroupTouched(this.agmcDetailsForm);
}
private markFormGroupTouched(formGroup: FormGroup) {
  (Object as any).values(formGroup.controls).forEach(control => {
    control.setValue(control.value);
  });
}

getAGMCDetailsFormValue() {

}

public agmcDetailsCrud() {
  const agmcFormDetails = this.agmcDetailsForm.value;
  agmcFormDetails.formStatusId = this.completedFormStatusId;
  agmcFormDetails.formId = this.agmcFormId;
  if (agmcFormDetails.hasCommittedOffence === 'true' || agmcFormDetails.hasCommittedOffence === true) {
    agmcFormDetails.hasCommittedOffence = true;
  } else {
    agmcFormDetails.hasCommittedOffence = false;
  }
  console.log(agmcFormDetails);
  if (this.agmcDetails && this.agmcDetails.formId !==  0) {
    this.update.emit(this.agmcDetailsForm.value);
  } else {
    this.create.emit(this.agmcDetailsForm.value);

  }
  }
}
