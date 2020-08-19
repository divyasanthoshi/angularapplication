import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule as NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';
import { IconoptionsModule } from './components/iconoptions/iconoptions.module';
import { FormsPipe } from './pipes/forms.pipe';
import { FulladdressPipe } from './pipes/fulladdress.pipe';
import { PhonePipe } from './pipes/phone.pipe';
import { FormControlValidationMsgDirective } from './directives/formcontrolvalidationdirective';
import { FormSubmitValidationMsgDirective } from './directives/formsubmitvalidationdirective';
import { PhoneMaskDirective } from './directives/phonemask.directive';
import { faChurch, faPen } from '@fortawesome/free-solid-svg-icons';
import { LookupvaluePipe } from './pipes/lookupvalue.pipe';
import { SearchPipe } from './pipes/search.pipe';
import {  PeopleSearchPipe } from './pipes/peoplesearch.pipe';
import { FirstLetterPipe } from './pipes/first-letter.pipe';
import { SectionControlDirective } from './directives/sectioncontrol.directive';
import { PageLevelValidationModule } from './components/pagelevelvalidation/pagelevelvalidation.module';
import { MaskingPipe } from './pipes/mask.pipe';
import { SSNViewMaskPipe } from './pipes/ssn-viewmask.pipe';
import { DocumentsOfficeuseonlyModule } from './components/documents-officeuseonly/documents-officeuseonly.module';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AttachmentUrlPipe } from './pipes/attachment-url.pipe';

@NgModule({
  imports: [
    CommonModule,
    IconoptionsModule,
    NgForm,
    ReactiveFormsModule,
    IonicModule,
    MatStepperModule,
    MatTabsModule,
    RouterModule,
    PageLevelValidationModule,
    DocumentsOfficeuseonlyModule
  ],
  exports: [
    IonicModule,
    FontAwesomeModule,
    IconoptionsModule,
    NgForm,
    ReactiveFormsModule,
    MatStepperModule,
    MatTabsModule,
    RouterModule,
    PageLevelValidationModule,
    DocumentsOfficeuseonlyModule,
    FormSubmitValidationMsgDirective,
    PhoneMaskDirective,
    FormControlValidationMsgDirective,
    SectionControlDirective,
    AttachmentUrlPipe,
    FormsPipe,
    FulladdressPipe,
    PhonePipe,
    LookupvaluePipe,
    SearchPipe,
    PeopleSearchPipe,
    MaskingPipe,
    FirstLetterPipe,
    SSNViewMaskPipe,
    NgxSpinnerModule,
    NgOtpInputModule
  ],
  declarations: [
    FormsPipe,
    FulladdressPipe,
    PhonePipe,
    SearchPipe,
    SearchPipe,
    FormSubmitValidationMsgDirective,
    FormControlValidationMsgDirective,
    SectionControlDirective,
    PhoneMaskDirective,
    LookupvaluePipe,
    PeopleSearchPipe,
    FirstLetterPipe,
    SSNViewMaskPipe,
    MaskingPipe,
    AttachmentUrlPipe
  ]
})
export class SharedModule {
  // add icon here so that other component can use it directly
  constructor(public library: FaIconLibrary) {
    library.addIcons(
      faChurch,
      faPen
    );
  }
 }
