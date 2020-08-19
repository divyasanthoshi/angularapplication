import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApplicationConstants } from 'src/app/application/application.constants';
import * as fromApplication from '../../../application/state';
import * as applicationActions from '../../../application/state/application.actions';
import { FormLookups, IForm } from '../../forms-interface';
import * as fromForms from '../../state';
import { Go } from 'src/app/reducers/routerstate/router.actions';
import { FormsConstants } from '../../forms.constants';

@Component({
  selector: 'app-forms-detail-container',
  templateUrl: './forms-detail-container.component.html',
  styleUrls: ['./forms-detail-container.component.scss'],
})
export class FormsDetailContainerComponent implements OnInit, AfterContentInit {

  form$: Observable<IForm>;
  formId: number;
  formLookups$: Observable<FormLookups>;

  constructor(
    private store: Store<fromForms.State>,
    private router: Router,
    private applicationStore: Store<fromApplication.State>) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.form$ = this.store.pipe(select(fromForms.getCurrentForm));
    this.form$.subscribe( form => this.formId = form.formId);
    this.formLookups$ = this.store.pipe(select(fromForms.getFormLookups));
  }
  loadApplication($event) {
    this.applicationStore.dispatch(new applicationActions.SetCurrentProviderId($event.providerId));
    const url = ApplicationConstants.url.page.summary;
    this.navigate(url, $event.formId);
  }
  navigate(url, formId) {
  this.store.dispatch(new Go({
    path: [url],
    query: { formId },
    extras: { replaceUrl: false }
  }));
}
}
