import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PageNotFoundComponent } from './security/404-resourcenotfound/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'home/:pagename', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'security', loadChildren: () => import('./security/security.module').then( m => m.SecurityModule)},
  { path: 'questionnaire', loadChildren: () => import('./questionnaire/questionnaire.module').then( m => m.QuestionnaireModule)},
  { path: 'application', loadChildren: () => import('./application/application.module').then( m => m.ApplicationModule)},
  { path: 'forms', loadChildren: () => import('./forms/forms.module').then( m => m.FormsModule) },
  { path: 'welcome', loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomeModule) },
  { path: 'tabs', loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule) },
  { path: '**', component: PageNotFoundComponent}
  ];

@NgModule({
  imports: [
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'enabled'})
  ],
  declarations: [
    PageNotFoundComponent
  ],

  exports: [RouterModule]
})
export class AppRoutingModule { }
