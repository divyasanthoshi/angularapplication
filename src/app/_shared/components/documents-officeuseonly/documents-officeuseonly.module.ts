import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsOfficeuseonlyComponent } from './documents-officeuseonly.component';
import { IonicModule } from '@ionic/angular';
import {  ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DocumentsOfficeuseonlyComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports: [DocumentsOfficeuseonlyComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DocumentsOfficeuseonlyModule { }
