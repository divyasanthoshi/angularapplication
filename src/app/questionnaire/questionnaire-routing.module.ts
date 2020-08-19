import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionnaireComponent } from './questionnaire.component';
import { ChildrenContainerComponent} from './containers/children-container/children-container.component';
import { QuestionnaireSickchildrenComponent } from './questionnaire-sickchildren/questionnaire-sickchildren.component';
import { QuestionnaireLocationComponent } from './questionnaire-location/questionnaire-location.component';
import { QuestionnairePropertytypeComponent} from './questionnaire-propertytype/questionnaire-propertytype.component';
import { QuestionnaireRecommendationComponent } from './questionnaire-recommendation/questionnaire-recommendation.component';
import { PropertytypeContainerComponent} from './containers/propertytype-container/propertytype-container.component';
import { QuestionnaireChildrenComponent } from './questionnaire-children/questionnaire-children.component';
import { LocationContainerComponent} from './containers/location-container/location-container.component';
import { RecommendationContainerComponent } from './containers/recommendation-container/recommendation-container.component';
import { SickchildrenContainerComponent } from './containers/sickchildren-container/sickchildren-container.component';
import { CanActivateGuard } from './guards/can-activate.guard';
import { PageAccessGuard } from '../_core/guards/page-access.guard';
import { ModuleAccessGuard } from '../_core/guards/module-access.guard';


const routes: Routes = [
    { path: '',
      component: QuestionnaireComponent,
      canActivateChild: [ModuleAccessGuard],
      children: [
          {
              path: '',
              redirectTo: 'propertytype'
          },
          {
              path: 'propertytype',
              component: PropertytypeContainerComponent,
              canActivate: [PageAccessGuard]
          },
          {
              path: 'location',
              component: LocationContainerComponent,
              canActivate: [PageAccessGuard, CanActivateGuard]
          },
          {
              path: 'children',
              component: ChildrenContainerComponent,
              canActivate: [PageAccessGuard, CanActivateGuard]
          },
          {
              path: 'sickchildren',
              component: SickchildrenContainerComponent,
              canActivate: [PageAccessGuard, CanActivateGuard]
          },
          {
            path: 'recommendation',
            component: RecommendationContainerComponent,
            canActivate: [PageAccessGuard, CanActivateGuard]
        },
        {
            path: '**',
            redirectTo: 'propertytype'
        },
      ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuestionnaireRoutingModule {
    static components = [
        QuestionnaireComponent,
        QuestionnaireChildrenComponent,
        QuestionnaireSickchildrenComponent,
        QuestionnaireLocationComponent,
        QuestionnairePropertytypeComponent,
        QuestionnaireRecommendationComponent,
        PropertytypeContainerComponent,
        ChildrenContainerComponent,
        LocationContainerComponent,
        RecommendationContainerComponent,
        SickchildrenContainerComponent
    ];
}
