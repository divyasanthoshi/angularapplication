import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsArchiveComponent } from './forms-archive/forms-archive.component';
import { FormsTrackComponent } from './forms-track/forms-track.component';
import { FormsComponent } from './forms.component';
import { FormsContainerComponent } from './containers/forms-container/forms-container.component';
import { FormsDetailContainerComponent } from './containers/forms-detail-container/forms-detail-container.component';
import { FormsTrackingdetailComponent } from './forms-trackingdetail/forms-trackingdetail.component';
import { ModuleAccessGuard } from '../_core/guards/module-access.guard';
import { PageAccessGuard } from '../_core/guards/page-access.guard';


const routes: Routes = [
  { path: '',
    component: FormsComponent,
    canActivateChild: [ModuleAccessGuard],
    children: [
      {
        path: '',
        component: FormsContainerComponent,
        pathMatch: 'full',
      },
      {
        path: 'detail',
        component: FormsDetailContainerComponent,
        pathMatch: 'full',
        canActivate: [PageAccessGuard]
      },
      {
        path: '**',
        redirectTo: ''
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule {
  static components = [
    FormsComponent,
    FormsContainerComponent,
    FormsArchiveComponent,
    FormsTrackComponent,
    FormsTrackingdetailComponent,
    FormsDetailContainerComponent
  ];
}
