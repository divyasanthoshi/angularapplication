import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FormsEffects } from '../forms/state/forms.effects';
import { SharedModule } from '../_shared/shared.module';
import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationEffects } from './state/application.effects';
import { reducer } from './state/application.reducer';
import { ModalComponent } from '../_core/modal/modal.component';
import { ModalModule } from '../_core/modal/modal.module';

@NgModule({
  declarations: [ApplicationRoutingModule.components],
  imports: [
    CommonModule,
    SharedModule,
    ModalModule,
    ApplicationRoutingModule,
    StoreModule.forFeature('application', reducer),
    EffectsModule.forFeature([ApplicationEffects, FormsEffects]),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
})
export class ApplicationModule { }
