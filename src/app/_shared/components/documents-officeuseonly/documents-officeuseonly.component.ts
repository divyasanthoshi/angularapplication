import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Constant } from './../../constant';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formatNumber } from '@angular/common';
@Component({
  selector: 'app-shared-documents-officeuseonly',
  templateUrl: './documents-officeuseonly.component.html',
  styleUrls: ['../../../../stylesheet/modules/view-forms.scss', './documents-officeuseonly.component.scss']
})
export class DocumentsOfficeuseonlyComponent implements OnInit {
  value: boolean;
  currentDate: Date;
  documentsOfficeForm: FormGroup;
  textareaMaxlength;
  remainingCharacters;
  @Output() sharedOfficeUseOnlyPartialForm = new EventEmitter<FormGroup>();
  constructor( private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.value = true;
    // to populate the current date
    this.remainingCharacters = Constant.textareaMaxlength;
    this.currentDate = new Date();
    this.textareaMaxlength = Constant.textareaMaxlength;
    this.documentsOfficeForm = this.formBuilder.group({
      verifiedStatus: '',
      verifiedBy: '',
      notes: ''
    });
    this.documentsOfficeForm.get('notes').valueChanges.subscribe((value: string) => {
      console.log(value);
      this.remainingCharacters  = this.textareaMaxlength - value.length;
    });

    this.sharedOfficeUseOnlyPartialForm.emit(this.documentsOfficeForm);
  }
  updateNotes() {
   // console.log(this.documentsOfficeForm);
  }

}
