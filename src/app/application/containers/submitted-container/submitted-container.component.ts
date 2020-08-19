import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
// import { IForm } from '../../application-interface';
import * as fromApplication from '../../state';
import { IForm } from 'src/app/forms/forms-interface';
import { FormsConstants } from 'src/app/forms/forms.constants';
import { Go } from 'src/app/reducers/routerstate/router.actions';

@Component({
  selector: 'app-submitted-container',
  templateUrl: './submitted-container.component.html',
  styleUrls: ['./submitted-container.component.scss'],
})
export class SubmittedContainerComponent implements OnInit {

  submittedForm$: Observable<IForm>;

  constructor(
    private store: Store<fromApplication.State>,
    private router: Router
  ) { }

  ngOnInit() {
    this.submittedForm$ = this.store.pipe(select(fromApplication.getFormIdByProviderId));
  }

  // trackApplication() {
  //   const url = FormsConstants.baseUrl;
  //   this.router.navigateByUrl(url);
  // }

}
