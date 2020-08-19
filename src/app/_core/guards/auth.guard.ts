import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserManagerService } from '../services/user-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate {

  constructor(
    private userManager: UserManagerService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userManager.isSignnedIn().then((isSignnedIn) => {
      if (isSignnedIn) {
        return true;
      }
      this.router.navigate(['/security/login']);
      return false;
    });
  }
}
