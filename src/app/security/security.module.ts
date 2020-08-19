import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { SecurityRoutingModule } from './security-routing.module';
import { SharedModule } from '../_shared/shared.module';


@NgModule({
  declarations: [SecurityRoutingModule.components],
  imports: [
    CommonModule,
    SharedModule,
    SecurityRoutingModule,
    IonicModule,
  ]
})
export class SecurityModule { }
