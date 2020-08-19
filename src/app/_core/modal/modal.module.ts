import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { IonicModule } from '@ionic/angular';
import { ModalComponent } from './modal.component';
import {SharedModule} from '../../_shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    IonicModule.forRoot()
  ]
})
export class ModalModule  {
  constructor() {}
}
