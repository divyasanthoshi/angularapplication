import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { LookupServiceType, Services } from '../../application-interface';
import { select, Store } from '@ngrx/store';
import * as fromApplication from '../../state';
import * as fromRouter from '../../../reducers';
import { getRouterInfo } from '../../state';
import {Router, ActivatedRoute} from '@angular/router';
import { ApplicationServicesComponent } from '../../application-services/application-services.component';
import * as applicationActions from '../../state/application.actions';
import { ApplicationConstants } from '../../application.constants';
import { Go } from 'src/app/reducers/routerstate/router.actions';

@Component({
  selector: 'app-services-container',
  templateUrl: 'services-container.component.html',
  styleUrls: ['./services-container.component.scss'],
})
export class ServicesContainerComponent implements OnInit {
  servicesLookups$: Observable<LookupServiceType[]>;
  formId: number;
  providerId: number;
  services$: Observable<Services>;
  previousUrl = ApplicationConstants.url.page.businessHours;
  changeDetection: ChangeDetectionStrategy.OnPush;
  @ViewChild(ApplicationServicesComponent, { static: true }) applicationServicesComponent: ApplicationServicesComponent;

  constructor(private store: Store<fromApplication.State>,
              private routerStore: Store<fromRouter.RouterState>,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.servicesLookups$ = this.store.pipe(select(fromApplication.getServiceLookups));
    this.store.select(getRouterInfo).subscribe(data => this.formId = data.queryParams.formId);
    if (this.formId !== undefined) {
      this.store.dispatch(new applicationActions.LoadProviderId(this.formId));
    }
    this.store.pipe(select(fromApplication.getCurrentProviderId)).subscribe((res) => {
      if (res) {
        this.store.dispatch(new applicationActions.LoadServices(res));
        this.providerId = res;
      }
    });

    this.services$ = this.store.pipe(select(fromApplication.getServices));
  }

  nextPage() {
    if (this.applicationServicesComponent.serviceFormvalue.serviceList.length > 0) {
      this.applicationServicesComponent.pageValidationService.resetPageLevelValidationMessage();
      this.applicationServicesComponent.servicesCrud();
      // console.log(this.applicationServicesComponent.serviceFormvalue);
    } else if (this.applicationServicesComponent.services && this.applicationServicesComponent.services.serviceList.length > 0) {
      this.navigate();
    } else {
      this.applicationServicesComponent.showMessage = true;
      this.applicationServicesComponent.pageValidationService.setPageValidationMessage('services-required-msg');
    }
  }

  navigate() {
    this.router.navigate(['../ownership'],  {queryParamsHandling: 'preserve' , relativeTo: this.route });
  }

createServices(services: Services) {
  this.store.dispatch(new applicationActions.CreateServices(services));

}

updateServices(services: Services) {
  this.store.dispatch(new applicationActions.UpdateServices(services));

}

}
