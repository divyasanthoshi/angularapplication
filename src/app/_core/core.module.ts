import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { ModalModule } from '../_shared/modals/modal.module';
import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';
import { AuthGuard } from './guards/auth.guard';
import { ModuleAccessGuard } from './guards/module-access.guard';
import { PageAccessGuard } from './guards/page-access.guard';
import { OverlayModule } from './overlay/overlay.module';
import { AuthService } from './services/auth.service';
import { UserManagerService } from './services/user-manager.service';
import { NgOtpInputModule } from 'ng-otp-input';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModalModule,
    OverlayModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicStorageModule
  ],
  exports: [
    ModalModule,
    OverlayModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicStorageModule,
    NgOtpInputModule
  ],
  providers: [
    AuthService,
    UserManagerService,
    PageAccessGuard,
    ModuleAccessGuard,
    AuthGuard,
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard { // Ensure that CoreModule is only loaded into AppModule
  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
 }
