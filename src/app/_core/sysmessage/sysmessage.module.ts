import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnsureModuleLoadedOnceGuard } from '../ensure-module-loaded-once.guard';
import { SysmessageComponent } from './sysmessage.component';



@NgModule({
  declarations: [SysmessageComponent],
  imports: [
    CommonModule
  ]
})
export class SysmessageModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: SysmessageModule) {
    super(parentModule);
  }
 }
