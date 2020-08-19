import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationConstants } from '../../application.constants';
import * as fromRouter from '../../../reducers';
import { select, Store } from '@ngrx/store';
import { getRouterInfo } from '../../state';
import { Route } from '../../../reducers';
import { Go } from 'src/app/reducers/routerstate/router.actions';
import * as routerAction from '../../../reducers/routerstate/router.actions';


@Component({
  selector: 'app-application-ownership-info',
  templateUrl: './application-ownership-info.component.html',
  styleUrls: ['./application-ownership-info.component.scss'],
})

export class ApplicationOwnershipInfoComponent implements OnInit {
  @Input() hideButtons = false;
  public formId: number;
  constructor(private router: Router,
              private store: Store<fromRouter.RouterState>) { }

  ngOnInit() {
  }
  nextPage() {
    const url = ApplicationConstants.url.page.ownership;
    this.store.select(getRouterInfo).subscribe(data => this.formId = data.queryParams.formId);
    this.store.dispatch(new Go({
        path: [ApplicationConstants.url.page.ownership],
        query: { formId: this.formId },
        extras: { replaceUrl: false  }
      }));
  }

  previousPage() {
    const url = ApplicationConstants.url.page.providerprofile;
    this.navigate(url);
  }
  navigate(url) {
    this.store.dispatch(new Go({
        path: [url],
        extras: { replaceUrl: false, queryParamsHandling: 'preserve' }
      }));
  }
}
