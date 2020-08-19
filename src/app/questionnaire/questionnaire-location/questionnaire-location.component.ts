import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LookupZipcode } from '../questionnaire-interface';
import { Subscription } from 'rxjs';
import { slideInOut, fadeInOut } from 'src/app/_shared/animation/animation';

@Component({
  selector: 'app-questionnaire-location',
  templateUrl: './questionnaire-location.component.html',
  styleUrls: ['./questionnaire-location.component.scss'],
  animations: [
    slideInOut,
    fadeInOut
  ]
})
export class QuestionnaireLocationComponent implements OnInit, OnDestroy {
  public locationForm: FormGroup;
  public zipCodeError: string = null;
  public zipCode$: Subscription;
  public isShow = true;

  @Input() zipcodeList: LookupZipcode[];
  @Input() zipcode: number = null;
  @Output() enteredZipcode = new EventEmitter<number>();

  public get location() {
    return this.locationForm.get('zipCode');
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    // Page Level Validation
    this.locationForm = this.fb.group({
      zipCode: [this.zipcode, [Validators.required]]
    }, { updateOn: 'blur' });
    this.zipCode$ = this.locationForm.controls.zipCode.valueChanges.subscribe(zip => {
      if (!zip) {
        this.zipCodeError = null;
      }
    });
    if (this.zipcode) {
    this.locationForm.get('zipCode').setValue(this.zipcode);
    }
  }

  saveZipcode(): boolean {
    // Business Validation
    const isPresent = this.zipcodeList.some((el: {zipCode: string}) => el.zipCode.includes(this.location.value));
    if (isPresent) {
      this.zipCodeError = null;
      const enteredZip = parseInt(this.location.value, 10);
      if (enteredZip) {
        this.enteredZipcode.emit(enteredZip);
      }
      return true;
    } else {
      this.locationForm.controls.zipCode.setErrors({incorrect: true});
      this.zipCodeError = 'The entered ZipCode is not a valid Florida state ZipCode';
      return false;
    }
  }

  // Page Level and Business Level Validation
  validateForm() {
    this.locationForm.controls.zipCode.setValue(this.location.value);
    this.zipCodeError = null;
    this.locationForm.controls.zipCode.markAsTouched();
    return (this.zipCodeError === null && this.locationForm.valid);
  }

  ngOnDestroy() {
    if (this.zipCode$) {
      this.zipCode$.unsubscribe();
    }
  }
}
