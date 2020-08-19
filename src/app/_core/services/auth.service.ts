import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserToken, UserAccess, IUserClaim } from 'src/app/_shared/Interfaces/security';
import { ServiceConstants } from './service.constants';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { Module, Page, SectionControl } from 'src/app/_shared/enum';
import { Constant } from 'src/app/_shared/constant';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserClaim } from 'src/app/_shared/models/security';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  sampleUserAccess: UserAccess[] = [
    {
      moduleId: 1,
      pageId: 1,
      sectionControlId: 1,
      isVisible: true,
      isEnabled: true,
    },
    // Need to keep this as an example in the future
    // {
    //   moduleId: 4,
    //   pageId: 2,
    //   sectionControlId: 2,
    //   isVisible: true,
    //   isEnabled: false,
    // },
  ];

  // http request to login user with the username and password, get a token for the user on the server side
  login(userLogin: UserToken): Observable<boolean> {
    const url = `${environment.apiUrl}${ServiceConstants.security.url.userToken}`;
    const credential = btoa(`${userLogin.username}:${userLogin.password}`);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Basic ${credential}`
    });
    return this.http.post<UserToken>(url, '', {headers}).pipe(
      tap((result) => {
        console.log(JSON.stringify(result));
      }),
      map(() => {
        return true;
      }),
      catchError((result) => {
        return of(false);
      })
    );
  }

  // revoke the token for the user, logout the user from the server
  logout(): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const revokeUserTokenUrl = `${environment.apiUrl}${ServiceConstants.security.url.userToken}`;
    return this.http.delete(revokeUserTokenUrl, {headers}).pipe(
        tap(result => console.log(JSON.stringify(result))),
        map(result => {
          if (result) {
            return true;
          }
        }),
        // catchError(this.handleError)
        catchError(() => of(false))
    );
  }

  // get the claim for the user
  getUserClaim(): Observable<UserClaim> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const getUserClaimUrl = `${environment.apiUrl}${ServiceConstants.security.url.userClaim}`;
    return this.http.get<UserClaim>(getUserClaimUrl).pipe(
        tap(result => console.log(JSON.stringify(result))),
        // catchError(this.handleError)
        // catchError(this.handleError)
    );
  }

  // login user without navigate user to the login page
  loginSilent() {
    const refreshTokenUrl = `${environment.apiUrl}${ServiceConstants.security.url.userToken}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const data = {
        token: ``
    };
    return this.http.put<any>(refreshTokenUrl, data, { headers }).pipe(
        tap(result => console.log(JSON.stringify(result))),
        catchError(this.handleError)
    );
  }

  // check if the user is still logged in, if so return true, else return false
  isLoggedIn() {
    // return this.userManager.getUser().then(user => {
    //   const userCurrent = !!user && !user.expired;
    //   if (this._user !== user){
    //     this._loginChangedSubject.next(userCurrent);
    //   }
    //   this._user = user;
    //   return userCurrent;
    // });
  }

  public getModuleId(route: string | ActivatedRouteSnapshot): number {
    let moduleName = '';
    if (typeof route === 'object') {
      moduleName = route.root.firstChild.url[0].path.toLowerCase();
    } else {
      moduleName = this.router.parseUrl(route).root.children.primary.segments[0].path.toLowerCase();
    }

    return Constant.security.module[moduleName];
  }

  public getModuleName(route: string | ActivatedRouteSnapshot): string {
    let moduleName = '';
    if (typeof route === 'object') {
      moduleName = route.root.firstChild.url[0].path.toLowerCase();
    } else {
      moduleName = this.router.parseUrl(route).root.children.primary.segments[0].path.toLowerCase();
    }
    return moduleName;
  }

  public getPageId(url: string): number {
    const moduleName = this.getModuleName(url);
    const pageName = this.router.parseUrl(url).root.children.primary.segments
    .filter((it) => it.path !== moduleName)
    .map(it => it.path).join('/').toLowerCase();
    return Constant.security.page[pageName];
  }

  public getSectionControlId(sectionControlName: string): number {
    if (sectionControlName) {
      const sectionControId = Constant.security.sectioncontrol[sectionControlName];
      if (sectionControId) {
        return sectionControId;
      }
    }
    console.error(`getSectionControlId: can not find a section control name ${sectionControlName}`);
  }

  // check if the module is accessable by the user, true as accessable, false as not accessable
  isModuleAccessable(moduleId: Module) {
    if (moduleId) {
      // if the with the moduleId, all page and module are disabled and invisible
      return this.sampleUserAccess.findIndex((value) => {
        return value.moduleId === moduleId &&
        value.pageId === Constant.security.page.All &&
        value.sectionControlId === Constant.security.sectioncontrol.All &&
        value.isVisible === false &&
        value.isEnabled === false;
      }) === -1;
    } else {
      // in the value is invalid, then return false
      console.error('isModuleAccessable: moduleId is invalid');
      return false;
    }
  }

  // check if the page is accessable by the user, true as accessable, false as not accessable
  isPageAccessable(moduleId: Module, pageId: Page) {
    if (pageId && moduleId) {
      // if the with the moduleId, all page and module are disabled and invisible
      return this.sampleUserAccess.findIndex((value) => {
        return value.moduleId === moduleId &&
        value.pageId === pageId &&
        value.sectionControlId === Constant.security.sectioncontrol.All &&
        value.isVisible === false &&
        value.isEnabled === false;
      }) === -1;
    } else {
      // in the value is invalid, then return false
      console.error('isPageAccessable: moduleId or pageId is invalid');
      return false;
    }
  }

  // check if the section control is visiable by the user, true as visiable, false as not visiable
  isSectionControlVisible(moduleId: Module, pageId: Page, sectionControlId: SectionControl) {
    if (sectionControlId && pageId && moduleId) {
      // if the with the moduleId, all page and module are disabled and invisible
      return this.sampleUserAccess.findIndex((value) => {
        return value.moduleId === moduleId &&
        value.pageId === pageId &&
        value.sectionControlId === sectionControlId &&
        value.isVisible === false;
      }) === -1;
    } else {
      // in the value is invalid, then return false
      console.error('isSectionControlInvisible: moduleId | pageId | sectionControlId is invalid');
      return false;
    }
  }

  // check if the section control is enabled by the user, true as enabled, false as not enabled
  isSectionControlEnabled(moduleId: Module, pageId: Page, sectionControlId: SectionControl) {
    if (sectionControlId && pageId && moduleId) {
      // if the with the moduleId, all page and module are disabled and invisible
      return this.sampleUserAccess.findIndex((value) => {
        return value.moduleId === moduleId &&
        value.pageId === pageId &&
        value.sectionControlId === sectionControlId &&
        value.isEnabled === false;
      }) === -1;
    } else {
      // in the value is invalid, then return false
      console.error('isSectionControlEnabled: moduleId | pageId | sectionControlId is invalid');
      return false;
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'Server error');
  }

}
