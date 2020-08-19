import { Component, OnInit, AfterViewInit, ViewChild, AfterContentInit } from '@angular/core';
import { ApplicationCertifyComponent } from '../../application-certify/application-certify.component';
import { Router } from '@angular/router';
import { ApplicationConstants } from '../../application.constants';

import * as fromRouter from '../../../reducers';
import { Go } from 'src/app/reducers/routerstate/router.actions';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-certify-container',
  templateUrl: './certify-container.component.html',
  styleUrls: ['./certify-container.component.scss'],
})
export class CertifyContainerComponent implements OnInit {
  isChecked = false;
  @ViewChild(ApplicationCertifyComponent, {static: true}) child: ApplicationCertifyComponent ;

  constructor(private router: Router,
              private routerStore: Store<fromRouter.RouterState>
    ) { }

  ngOnInit() {}

  certify(isCertify: boolean) {
    this.isChecked = isCertify;
  }

  // method for next button click event
  nextPage() {
    const url = ApplicationConstants.url.page.applicationSubmit;
    this.navigate(url);
  }
  // method for back button click event
  previousPage() {
    // capturing the current url
    const url = ApplicationConstants.url.page.summary;
    // routing to next page from the urlList
    this.navigate(url);

  }

  navigate(url) {
    this.routerStore.dispatch(new Go({
        path: [url],
        extras: { replaceUrl: false, queryParamsHandling: 'preserve' }
      }));
  }
}
