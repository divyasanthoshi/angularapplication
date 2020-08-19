import { AfterContentChecked, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApplicationLookups } from './application-interface';
import { ApplicationConstants } from './application.constants';
import * as fromApplication from './state';
import * as FormsAction from '../forms/state/forms.actions';
import * as fromForm from '../forms/state';
import * as applicationActions from './state/application.actions';
import { routeAnimations } from './application-animation';
import { FormLookups } from '../forms/forms-interface';


@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routeAnimations]
})
export class ApplicationComponent implements OnInit, AfterContentChecked {
  isvisible = false;
  pageTitle: string;
  applicationLookups$: Observable<ApplicationLookups>;
  formLookups$: Observable<FormLookups>;
  url: string;
  constructor(
    private router: Router,
    private store: Store<fromApplication.State>,
    private formStore: Store<fromForm.State>
  ) { }

  ngOnInit() {
    this.store.dispatch(new applicationActions.LoadApplicationLookups());
    this.store.dispatch(new applicationActions.LoadFormLookups());
    this.formStore.dispatch(new FormsAction.LoadFormLookups());
    this.applicationLookups$ = this.store.pipe(select(fromApplication.getApplicationLookups));
  }
  // update page title whenever content changes
  ngAfterContentChecked() {
    this.url = this.router.url;
    const segment = this.url.split('/')[2];
    const index = segment.indexOf('?');
    const title = index === -1 ? segment : segment.slice(0, index);
    ApplicationConstants.urlList.forEach(url => {
      if (title === url.split(' ').join('').toLowerCase()) {
        this.pageTitle = url;
      }
    });
  }
  // on changing the stepper
  selectChange(event) {
    const url = this.router.url;
    this.router.navigateByUrl(this.router.url.replace(url.split('/')[2],
      ApplicationConstants.stepperList[event.selectedIndex]));
    console.log(event);
  }

  prepareRoute(outlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;

  }

  // goFormPage() {
  //   const url = '/forms';
  //   this.router.navigateByUrl(url);
  // }
}
