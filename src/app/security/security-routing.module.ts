import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Unauthorized401Component } from './unauthorized401/unauthorized401.component';
import { LoginContainerComponent } from './containers/login-container/login-container.component';
import { SecurityForgotpasswordComponent } from './security-forgotpassword/security-forgotpassword.component';
import { ForgotpasswordContainerComponent } from './containers/forgotpassword-container/forgotpassword-container.component';
import { SecurityLoginComponent } from './security-login/security-login.component';
import { SecurityComponent } from './security.component';
import { VerifyemailContainerComponent } from './containers/verifyemail-container/verifyemail-container.component';
import { SecurityVerifyemailComponent } from './security-verifyemail/security-verifyemail.component';
import { SecurityInvalidcodeComponent } from './security-invalidcode/security-invalidcode.component';
import { InvalidcodeContainerComponent } from './containers/invalidcode-container/invalidcode-container.component';
import { SecurityCreatenewpasswordComponent } from './security-createnewpassword/security-createnewpassword.component';
import { CreatenewpasswordContainerComponent } from './containers/createnewpassword-container/createnewpassword-container.component';
import { SecurityCreateaccountComponent } from './security-createaccount/security-createaccount.component';
import { CreateaccountContainerComponent } from './containers/createaccount-container/createaccount-container.component';

const routes: Routes = [
  {
    path: '',
    component: SecurityComponent,
    children: [
      {
        path: 'login', component: LoginContainerComponent, data: {animation: 'LoginPage'}
      },
      {
        path: 'unauthorized401', component: Unauthorized401Component
      },
      {
        path: 'forgotpassword', component: ForgotpasswordContainerComponent
      },
      {
        path: 'verifyemail', component: VerifyemailContainerComponent
      },
      {
        path: 'invalidcode', component: InvalidcodeContainerComponent
      },
      {
        path: 'createnewpassword', component: CreatenewpasswordContainerComponent
      },
      {
        path: 'createaccount', component: CreateaccountContainerComponent
      }
    ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule {
  static components = [
    SecurityComponent,
    Unauthorized401Component,
    LoginContainerComponent,
    ForgotpasswordContainerComponent,
    SecurityLoginComponent,
    SecurityForgotpasswordComponent,
    VerifyemailContainerComponent,
    SecurityVerifyemailComponent,
    SecurityInvalidcodeComponent,
    InvalidcodeContainerComponent,
    SecurityCreatenewpasswordComponent,
    CreatenewpasswordContainerComponent,
    SecurityCreateaccountComponent,
    CreateaccountContainerComponent
  ];
 }
