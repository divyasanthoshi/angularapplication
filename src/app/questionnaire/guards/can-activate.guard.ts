import { Injectable } from '@angular/core';
import { CanActivate , Router} from '@angular/router';
import { Observable } from 'rxjs';
import * as fromQuestionnaire from '../state';
import { Store, select } from '@ngrx/store';
import { QuestionnaireConstants } from '../questionnaire.constant';



@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate {
  value$: Observable<number>;
  value: number;
  constructor(private store: Store<fromQuestionnaire.State>, private router: Router) {
    this.value$ = this.store.pipe(select(fromQuestionnaire.getPropertyType));
    this.value$.subscribe((data) => this.value = data);
  }
  canActivate() {
    if ( this.value !== null) {
      return true;
    } else {
      this.router.navigate([QuestionnaireConstants.parentSegment]);
      return false;
    }
}
}


