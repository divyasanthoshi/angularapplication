import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnsureModuleLoadedOnceGuard } from '../ensure-module-loaded-once.guard';
import { OverlayComponent } from './overlay.component';



@NgModule({
  declarations: [OverlayComponent],
  imports: [
    CommonModule
  ]
})
export class OverlayModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: OverlayModule) {
    super(parentModule);
  }
 }
