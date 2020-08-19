import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/_core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PageAccessGuard implements CanActivate  {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const moduleId = this.authService.getModuleId(route);
    const pageId = this.authService.getPageId(state.url);
    if (moduleId && pageId) {
      const isPageAccessable = this.authService.isPageAccessable(moduleId, pageId);
      if (isPageAccessable) {
        return true;
      }
    }
    //return this.router.navigate(['/security/unauthorized401']);
    return true;
  }
}
