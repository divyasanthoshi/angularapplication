import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelfAttestationDetails, FormList } from '../../application-interface';

@Component({
  selector: 'app-application-selfattestation',
  templateUrl: './application-selfattestation.component.html',
  styleUrls: ['./application-selfattestation.component.scss'],
})
export class ApplicationSelfAttestationComponent implements OnInit, OnChanges {

  @Input() selfAttestationDetails: SelfAttestationDetails;
  @Input() formItem: FormList;
  @Input() providerId: number;

  // emit create and update events
  @Output() create = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();
  selfattestationform: FormGroup;

  constructor(private fb: FormBuilder) { }

  currentDate: Date;

  ngOnInit() {
    this.intializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.selfAttestationDetails && changes.selfAttestationDetails.currentValue && changes.selfAttestationDetails.currentValue) {
      this.selfAttestationDetails = changes.selfAttestationDetails.currentValue;
      this.loadForm(this.selfAttestationDetails.formSignedBy);
    }
  }

  intializeForm() {
    this.selfattestationform = this.fb.group({
      name: [null, [Validators.required]],
      date: [new Date().toString()]
    });
  }

  loadForm(name: string) {
    if (this.selfattestationform && name) {
      this.selfattestationform.controls.name.setValue(name);
    }
  }

  //  Validation of form based on business logic
  public validateForm() {
    if (this.selfattestationform && this.selfattestationform.status === 'VALID') {
      const selfAttestationDetails: SelfAttestationDetails = {
        formId: this.selfAttestationDetails.formId,
        providerId: this.providerId,
        formStatusId: 15,
        formSignedBy: this.selfattestationform.controls.name.value,
        formSignedByPersonId: 1,
        formSignedDate: new Date().toISOString(),
        zoningAttestationSourceId: 5,

      };
      this.update.emit(selfAttestationDetails);
      return true;
    }
    this.selfattestationform.controls.name.setErrors({ required: true });
    return false;
  }

}
