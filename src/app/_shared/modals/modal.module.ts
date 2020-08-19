import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { IonicModule } from '@ionic/angular';
import { AddressValidationModalComponent } from './address-validation-modal/addressvalidationmodal.component';
import { PopoverControllerComponent } from './popover-controller/popover-controller.component';
import { BusinessHoursPopoverComponent } from './business-hours-popover/business-hours-popover.component';
import { AttachmentsPopoverComponent } from './attachments-popover/attachments-popover.component';

@NgModule({
  declarations: [
    AddressValidationModalComponent,
    PopoverControllerComponent,
    BusinessHoursPopoverComponent,
    AttachmentsPopoverComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    IonicModule.forRoot()
  ]
})

export class ModalModule {
    constructor() {
    }
}
