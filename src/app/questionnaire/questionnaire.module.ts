import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../_shared/shared.module';
import { QuestionnaireRoutingModule } from './questionnaire-routing.module';
import { QuestionnaireEffects } from './state/questionnaire.effects';
import { reducer } from './state/questionnaire.reducer';
import { ValidationMsgService } from '../_shared/validations/validation.service';
import { CanActivateGuard } from './guards/can-activate.guard';

@NgModule({
  declarations: [QuestionnaireRoutingModule.components],
  imports: [
    CommonModule,
    SharedModule,
    QuestionnaireRoutingModule,
    StoreModule.forFeature('questionnaire', reducer),
    EffectsModule.forFeature([QuestionnaireEffects]),
  ],
  providers: [ValidationMsgService, CanActivateGuard]
})
export class QuestionnaireModule { }
