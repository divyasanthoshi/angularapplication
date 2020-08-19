import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApplicationConstants } from 'src/app/application/application.constants';
import * as fromApplication from '../../../application/state';
import * as applicationActions from '../../../application/state/application.actions';
import { FormLookups, IForm } from '../../forms-interface';
import { FormsConstants } from '../../forms.constants';
import * as fromForms from '../../state';
import * as formsAction from '../../state/forms.actions';
import { Go } from 'src/app/reducers/routerstate/router.actions';



@Component({
  selector: 'app-forms-container',
  templateUrl: './forms-container.component.html',
  styleUrls: ['./forms-container.component.scss'],
})
export class FormsContainerComponent implements OnInit {
  formLookups$: Observable<FormLookups>;
  currentForm$: Observable<IForm>;
  trackForms$: Observable<IForm[]>;
  archivedForms$: Observable<IForm[]>;
  firstFormId$: Observable<number>;
  selectedIndex: number;


  constructor(
    private store: Store<fromForms.State>,
    private applicationStore: Store<fromApplication.State>,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.selectedIndex = 0;
    this.store.dispatch(new formsAction.LoadForms(1));
    this.formLookups$ = this.store.pipe(select(fromForms.getFormLookups));
    this.currentForm$ = this.store.pipe(select(fromForms.getCurrentForm));
    // get a list of npot archived forms
    this.trackForms$ = this.store.pipe(select(fromForms.getTrackForms));
    // get a list of archived forms
    this.archivedForms$ = this.store.pipe(select(fromForms.getArchivedForms));
    // select the first form as selected one
    this.firstFormId$ = this.store.pipe(
      select(fromForms.getLastTrackFormId),
      tap((formId: number) => {
        this.store.dispatch(new formsAction.SetCurrentFormId(formId));
      })

    );
    this.firstFormId$.subscribe();
  }



  // used by desktop view, no navigation
  clickedForm(formId: number) {
    this.store.dispatch(new formsAction.SetCurrentFormId(formId));
  }

  // used by mobile view, navigate after click
  loadFormTrackDetail(formId: number) {
    this.store.dispatch(new formsAction.SetCurrentFormId(formId));
    const url = FormsConstants.url.page.formTrackDetail;
    this.router.navigateByUrl(url);
  }

  // archive a form
  archive(form: IForm) {
    this.store.dispatch(new formsAction.ArchiveForm(form));
  }

  // load Application form onclick
  loadApplication($event) {
    this.applicationStore.dispatch(new applicationActions.SetCurrentProviderId($event.providerId));
    const url = ApplicationConstants.url.page.summary;
    this.navigate(url, $event.formId);
  }


  navigate(url, formId) {
    this.store.dispatch(new Go({
      path: [url],
      query: { formId },
      extras: { replaceUrl: false}
    }));
}
}
