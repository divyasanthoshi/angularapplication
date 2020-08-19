import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplicationConstants } from '../../application.constants';
import { Router } from '@angular/router';
import { getRouterInfo } from '../../state';
import { Store, select } from '@ngrx/store';
import * as fromApplication from '../../state';
import { Go } from 'src/app/reducers/routerstate/router.actions';
import { ApplicationBusinesshoursComponent } from '../../application-businesshours/application-businesshours.component';
import * as applicationActions from '../../state/application.actions';
import { Observable } from 'rxjs';
import { LookupMonthsOfOperation, BusinessHours } from '../../application-interface';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-businesshours-container',
  templateUrl: './businesshours-container.component.html',
  styleUrls: ['./businesshours-container.component.scss'],
})
export class BusinesshoursContainerComponent implements OnInit {

  @ViewChild(ApplicationBusinesshoursComponent) private child: ApplicationBusinesshoursComponent;
  formId: number;
  providerId: number;
  businessHourLookups$: Observable<LookupMonthsOfOperation[]>;
  businessHours$: Observable<BusinessHours>;
  constructor(
    private router: Router,
    private store: Store<fromApplication.State>
  ) { }

  ngOnInit() {
    this.businessHourLookups$ = this.store.pipe(select(fromApplication.getMonthsofOperationLookups));
    this.store.select(getRouterInfo).subscribe(data => this.formId = data.queryParams.formId);
    if (this.formId !== undefined) {
      this.store.dispatch(new applicationActions.LoadProviderId(this.formId));
    }
    this.store.pipe(select(fromApplication.getCurrentProviderId)).subscribe((res) => {
      if (res) {
        this.providerId = res;
        this.store.dispatch(new applicationActions.LoadBusinessHours(res));
      }
    });

    this.businessHours$ = this.store.pipe(select(fromApplication.getBusinessHours));
    this.businessHours$.subscribe(businessHours => {});
  }

  createBusinessHours(businessHours: BusinessHours) {
    this.store.dispatch(new applicationActions.CreateBusinessHours(businessHours));
  }

  updateBusinessHours(businessHours: BusinessHours) {
    this.store.dispatch(new applicationActions.UpdateBusinessHours(businessHours));
  }

  previousPage() {
    const url = ApplicationConstants.url.page.providerprofile;
    this.router.navigateByUrl(url);
  }

  nextPage() {
    const isFormValid = this.child.validateForm();
    if (!isFormValid) {
      return false;
    }
    const url = ApplicationConstants.url.page.services;
    this.navigate(url);
  }
  navigate(url) {
    this.store.dispatch(new Go({
      path: [url],
      extras: { replaceUrl: false, queryParamsHandling: 'preserve' }
    }));

  }

}
