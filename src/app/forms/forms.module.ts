import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../_shared/shared.module';
import { FormsRoutingModule } from './forms-routing.module';
import { FormsEffects } from './state/forms.effects';
import { FormsReducer } from './state/forms.reducer';



@NgModule({
  declarations: [FormsRoutingModule.components],
  imports: [
    CommonModule,
    SharedModule,
    FormsRoutingModule,
    StoreModule.forFeature('forms', FormsReducer),
    EffectsModule.forFeature([FormsEffects]),
  ]
})
export class FormsModule { }
