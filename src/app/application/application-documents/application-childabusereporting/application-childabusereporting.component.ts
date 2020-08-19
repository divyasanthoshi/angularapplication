import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChildAbuseReportingDetails, FormList } from '../../application-interface';
import { CompareName } from 'src/app/_shared/validations/compare-text.validations';

@Component({
  selector: 'app-application-childabusereporting',
  templateUrl: './application-childabusereporting.component.html',
  styleUrls: ['./application-childabusereporting.component.scss'],
})
export class ApplicationChildAbuseReportingComponent implements OnInit, OnChanges {

  @Input() childAbuseReportingDetails: ChildAbuseReportingDetails;
  @Input() formItem: FormList;
  @Input() providerId: number;
  @Input() personName: string;

  // emit create and update events
  @Output() create = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();
  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  currentDate: Date;

  ngOnInit() {
    this.intializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.childAbuseReportingDetails && changes.childAbuseReportingDetails.currentValue && changes.childAbuseReportingDetails.currentValue) {
      this.childAbuseReportingDetails = changes.childAbuseReportingDetails.currentValue;
      this.loadForm(this.childAbuseReportingDetails.formSignedBy);
    }
  }

  intializeForm() {
    this.form = this.fb.group({
      personName: this.personName ? this.personName : '',
      name: [null, [Validators.required]],
      date: [new Date().toString()]
    },
    {
      // Used custom form validator name
      validator: CompareName('personName' , 'name')
    });
  }

  loadForm(name: string) {
    if (this.form && name) {
      this.form.controls.name.setValue(name);
    }
  }

  //  Validation of form based on business logic
  public validateForm() {
    if (this.form && this.form.status === 'VALID') {
      const childAbuseReportingdetails: ChildAbuseReportingDetails = {
        formId: this.formItem.formId,
        personId: this.formItem.personId,
        providerId: this.providerId,
        formStatusId: 15,
        formSignedBy: this.form.controls.name.value,
        formSignedByPersonId: 1,
        formSignedDate: new Date().toISOString()
      };
      this.update.emit(childAbuseReportingdetails);
      return true;
    }
    this.form.controls.name.setErrors({ required: true });
    return false;
  }

  goToLink(url: string) {
    window.open(url);
  }

}
