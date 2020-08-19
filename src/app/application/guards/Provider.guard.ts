import { Injectable } from '@angular/core';
import { CanActivate , Router} from '@angular/router';
import { Observable } from 'rxjs';
import * as fromApplication from '../state';
import { Store, select } from '@ngrx/store';
import { ApplicationConstants } from '../application.constants';
import {Provider} from '../application-interface';



@Injectable({
  providedIn: 'root'
})
export class ProviderCanActivateGuard implements CanActivate {
  value$: Observable<Provider>;
  value: Provider;
  constructor(private store: Store<fromApplication.State>, private router: Router) {
    this.value$ = this.store.pipe(select(fromApplication.getProvider));
    this.value$.subscribe((data) => this.value = data);
  }
  canActivate() {
    if ( this.value.providerId !== 0) {
      return true;
    } else {
      return false;
    }
}
}


