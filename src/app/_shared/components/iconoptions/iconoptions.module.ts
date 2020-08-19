import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconoptionsComponent } from './iconoptions.component';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [IconoptionsComponent],
  imports: [
    CommonModule,
    IonicModule,
    FontAwesomeModule
  ],
  exports: [IconoptionsComponent]
})
export class IconoptionsModule {}
