import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [WelcomeRoutingModule.components],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    IonicModule
  ]
})
export class WelcomeModule { }
