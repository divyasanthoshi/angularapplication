import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AuthService } from 'src/app/_core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ModuleAccessGuard implements CanActivateChild  {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivateChild(route: ActivatedRouteSnapshot) {
    const moduleId = this.authService.getModuleId(route);
    if (moduleId) {
      const isModuleAccessable = this.authService.isModuleAccessable(moduleId);
      if (isModuleAccessable) {
        return true;
      }
    }
    //return this.router.navigate(['/security/unauthorized401']);
    return true;
  }
}
