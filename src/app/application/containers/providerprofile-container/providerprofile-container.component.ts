import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApplicationLookups, Provider } from '../../application-interface';
import { ApplicationProviderprofileComponent } from '../../application-providerprofile/application-providerprofile.component';
import { ApplicationService } from '../../application.service';
import * as fromApplication from '../../state';
import * as applicationActions from '../../state/application.actions';
import { ApplicationConstants } from '../../application.constants';
import { getRouterInfo } from '../../state';





@Component({
  selector: 'app-providerprofile-container',
  templateUrl: './providerprofile-container.component.html',
  styleUrls: ['./providerprofile-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProviderprofileContainerComponent implements OnInit {
  formId: number;
  provider$: Observable<Provider>;
  currentProviderId$: Observable<number>;
  providerId: number;
  applicationLookups$: Observable<ApplicationLookups>;
  programTypeId$: Observable<number>;
  licenseStatusId$: Observable<number>;

  @ViewChild(ApplicationProviderprofileComponent, { static: true }) providerForm: ApplicationProviderprofileComponent;

  constructor(
    private store: Store<fromApplication.State>,
    private router: Router,
    private applicationService: ApplicationService
  ) { }

  ngOnInit() {
    this.store.select(getRouterInfo).subscribe(data => this.formId = data.queryParams.formId);
    if (this.formId) {
      this.store.dispatch(new applicationActions.LoadProviderId(this.formId));
    }
    this.currentProviderId$ = this.store.pipe(select(fromApplication.getCurrentProviderId));
    this.currentProviderId$.subscribe(res => {
      if (res !== 0) {
        this.store.dispatch(new applicationActions.LoadProvider());
      }
    });
    // selecting the provider using selector
    this.provider$ = this.store.pipe(select(fromApplication.getProvider));
    // dispatching a LoadProvider action on init
    this.applicationLookups$ = this.store.pipe(select(fromApplication.getApplicationLookups));
    this.programTypeId$ = this.store.pipe(select(fromApplication.getProgramTypeId));
    this.licenseStatusId$ = this.store.pipe(select(fromApplication.getLicenseStatusId));
  }

  //  method for setting current providerId
  setCurrentProvider(providerId: number) {
    this.store.dispatch(new applicationActions.SetCurrentProviderId(providerId));
  }

  // method to edit provider we load current providerId
  editProvider(providerId: number) {
    this.store.dispatch(new applicationActions.LoadProvider());
  }

  // method to create provider
  createProvider(provider: Provider) {
    this.store.dispatch(new applicationActions.CreateProvider(provider));
  }

  // method to update provider
  updateProvider(provider: Provider) {
    this.store.dispatch(new applicationActions.UpdateProvider(provider));
  }

  // on next button click
  nextPage() {

    if (this.providerForm && this.providerForm.isValid) {
      if (this.providerForm.isDirty) {
        this.providerForm.providerCrud();
      } else {
        this.router.navigate([ApplicationConstants.url.page.businessHours], { queryParamsHandling: 'preserve' });
      }
    } else {
      this.providerForm.markAsTouched();
    }
  }
}




