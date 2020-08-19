import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, pluck, take, tap } from 'rxjs/operators';
import { FormLookups, LookupFormStatus } from 'src/app/forms/forms-interface';
import { Go } from 'src/app/reducers/routerstate/router.actions';
import { flyUpwithDelayAnimation} from '../../../_shared/animation/animation';
import * as fromForm from '../../../forms/state';
import * as FormsAction from '../../../forms/state/forms.actions';
import * as fromRouter from '../../../reducers';
import { ApplicationConstants } from '../../application.constants';
import * as fromApplication from '../../state';


@Component({
  selector: 'app-submit-container',
  templateUrl: './submit-container.component.html',
  styleUrls: ['./submit-container.component.scss'],
  animations: [flyUpwithDelayAnimation]
})
export class SubmitContainerComponent implements OnInit {
  isSubmitted = false;
  formId: number;
  loadedForm$: Observable<number>;
  formLookups$: Observable<FormLookups>;
  constructor(private router: Router,
              private store: Store<fromApplication.State>,
              private formStore: Store<fromForm.State>,
              private routerStore: Store<fromRouter.RouterState>
  ) { }

  ngOnInit() {
    this.formStore.dispatch(new FormsAction.LoadForms(1));
    // this.formStore.dispatch(new FormsAction.LoadFormLookups());
    this.loadedForm$ = this.formStore.pipe(
      select(fromApplication.getFormId),
      tap(value => {
        this.formId = value;
      })
    );
  }

  nextPage() {
    this.isSubmitted = true;
    this.formStore.pipe(select(fromForm.getFormLookups), take(1), filter(Boolean), pluck('lookupFormStatus')).subscribe(
      (statusOptions: LookupFormStatus[]) => {
        const formStatusId = statusOptions.find(option => option.formStatus.toLowerCase().includes('submitted')).formStatusId;
        this.store.dispatch(new FormsAction.SubmitForm({ formId: this.formId, formStatusId }));
      }
    );
  }

  previousPage() {
    const url = ApplicationConstants.url.page.applicationCertify;
    this.navigate(url);

  }

  routeAfterAnimate($event) {
    const url = ApplicationConstants.url.page.applicationSubmitted;
    this.navigate(url);
  }

  navigate(url) {
    this.store.dispatch(new Go({
      path: [url],
      extras: { replaceUrl: false, queryParamsHandling: 'preserve' }
    }));
  }

}
