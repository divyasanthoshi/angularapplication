import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromForms from './state';
import { FormLookups } from './forms-interface';
import { Observable } from 'rxjs';
import * as formActions from './state/forms.actions';


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  formLookups$: Observable<FormLookups>;

  constructor(private store: Store<fromForms.State>) {}
  ngOnInit() {
    this.store.dispatch(new formActions.LoadFormLookups());
    this.formLookups$ = this.store.pipe(select(fromForms.getFormLookups));
  }

}
