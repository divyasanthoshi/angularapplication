import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fadeInOut, slideInOut } from 'src/app/_shared/animation/animation';
import { PageLevelValidationService } from 'src/app/_shared/components/pagelevelvalidation/pagelevelvalidation.service';


@Component({
  selector: 'app-questionnaire-sickchildren',
  templateUrl: './questionnaire-sickchildren.component.html',
  styleUrls: ['./questionnaire-sickchildren.component.scss'],
  animations: [
    slideInOut,
    fadeInOut
  ]
})
export class QuestionnaireSickchildrenComponent implements OnInit, OnChanges {
  public disabledFormGroup: FormGroup;
  public isShow = true;

  @Input() disabledCare: boolean;
  @Output() selectDisabledCare = new EventEmitter<boolean>();

  currentDisabledCare: boolean;

  constructor(
    private fb: FormBuilder,
    private pageValidationService: PageLevelValidationService
  ) { }

  ngOnInit() {
    this.disabledFormGroup = this.fb.group({
      disabledChildren: ['', [Validators.required]]
    });
    if (this.currentDisabledCare) {
      const disabledChildren = this.disabledFormGroup.get('disabledChildren');
      disabledChildren.setValue(this.currentDisabledCare);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.pageValidationService.resetPageLevelValidationMessage();
    if (changes.disabledCare) {
      this.currentDisabledCare = changes.disabledCare.currentValue !== null ? changes.disabledCare.currentValue.toString() : null;

    }
  }

  clickRadio(event: boolean) {
    this.selectDisabledCare.emit(event);
  }

  // Page Level validation using form group validations
  validateForm() {
    const disabledChildren = this.disabledFormGroup.controls.disabledChildren;
    console.log('disabledChildren', disabledChildren);
    if (disabledChildren.value === '') {
      this.pageValidationService.setPageValidationMessage('disabledChildren-required-msg');
      // disabledChildren.setErrors({ required: ''});
      // disabledChildren.markAsTouched();
    } else {
      this.pageValidationService.resetPageLevelValidationMessage();
    }
    return this.disabledFormGroup.valid;
  }
}
