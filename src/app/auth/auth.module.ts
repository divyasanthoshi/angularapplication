import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AuthRoutingModule.components],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    IonicModule,
  ]
})
export class AuthModule { }
