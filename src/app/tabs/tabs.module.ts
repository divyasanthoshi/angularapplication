import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsRoutingModule } from './tabs-routing.module';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [TabsRoutingModule.components],
  imports: [
    CommonModule,
    TabsRoutingModule,
    IonicModule
  ]
})
export class TabsModule { }
