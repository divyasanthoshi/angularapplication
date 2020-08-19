import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap, pluck, filter } from 'rxjs/operators';
import { OwnershipType } from 'src/app/_shared/enum';
import { ApplicationOwnershipIncorporatedComponent } from '../../application-ownership/application-ownership-incorporated/application-ownership-incorporated.component';
import { ApplicationOwnershipUnincorporatedComponent } from '../../application-ownership/application-ownership-unincorporated/application-ownership-unincorporated.component';
import { ApplicationConstants } from '../../application.constants';
import { ApplicationService } from '../../application.service';
import * as fromApplication from '../../state';
import * as applicationActions from '../../state/application.actions';
import { LookupOrganization, Organization, Ownership, Personnel, LookupOwnershipType } from '../../application-interface';
import { Go } from 'src/app/reducers/routerstate/router.actions';
import { getRouterInfo } from '../../state';

@Component({
  selector: 'app-ownership-container',
  templateUrl: './ownership-container.component.html',
  styleUrls: ['./ownership-container.component.scss'],
})
export class ApplicationOwnershipContainerComponent implements OnInit {

  @ViewChild(ApplicationOwnershipIncorporatedComponent)
  private incorporated: ApplicationOwnershipIncorporatedComponent;
  @ViewChild(ApplicationOwnershipUnincorporatedComponent)
  private unincorporated: ApplicationOwnershipUnincorporatedComponent;

  incoporatedOptions = [
    'INCORPORATED',
    'UNINCORPORATED'
  ];

  isIncorporated$: Observable<boolean>;
  organizationInfo$: Observable<LookupOrganization>;
  unIncorporatedOwnershipTypes$: Observable<LookupOwnershipType[]>;
  people$: Observable<Personnel[]>;
  currentProviderId$: Observable<number>;
  ownership$: Observable<Ownership>;
  searchedOrganization$: Observable<Organization>;
  providerId: number;
  previousUrl: string;
  formId: number;
  // this value is used to hold the temporary value for toggle
  isIncorporated: boolean;
  previousPageUrl = ApplicationConstants.url.page.services;
  constructor(
    private store: Store<fromApplication.State>,
    private applicationServices: ApplicationService,
    private router: Router
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
        this.store.dispatch(new applicationActions.LoadOwnership());
      }
    });

    // this.store.dispatch(new applicationActions.LoadOwnership());
    this.store.dispatch(new applicationActions.LoadApplicationLookups());

    this.store.pipe(select(fromApplication.getCurrentProviderId),
      tap(providerId => this.providerId = providerId),
      map(providerId => this.store.dispatch(new applicationActions.LoadPeople(providerId)))
    ).subscribe();

    // save a separated value because the need of keeping saved value and user changed value
    this.isIncorporated$ = this.store.pipe(
      select(fromApplication.getIsIncorporated),
      tap(value => {
        this.isIncorporated = value;
      })
    );
    this.organizationInfo$ = this.store.pipe(select(fromApplication.getOrganization));
    // filter 'corporation' from the organization type for unincorporated
    this.people$ = this.store.pipe(select(fromApplication.getPeople));
    this.ownership$ = this.store.pipe(select(fromApplication.getOwnership));
    this.unIncorporatedOwnershipTypes$ = this.store.pipe(select(fromApplication.getOwnershipTypeLookups),
      map(orgType => {
        return orgType.filter(o => o.ownershipTypeId !== OwnershipType.Corporation);
      }));
  }

  // search the organization and set the organization based on the result
  searchIncorporated(docNum: string) {
    this.searchedOrganization$ = this.applicationServices.searchOrganizationByDocumentNumber(docNum).pipe(
      tap(response => {
        if (this.incorporated.loadingIndicator) {
        this.incorporated.loadingIndicator.dismiss();
        }
        if (response && response.status === 204) {
          this.incorporated.launchErrorModal();
        }
      }),
      filter(response => Boolean(response && response.status === 200 && response.body)),
      pluck('body'),
    );
  }

  // function to toggle the incorporated and unincorporated, need to clear ownership for unincorporated and incorporated
  toggleIncoporated(isIncoporated: boolean) {
    this.unIncorporatedOwnershipTypes$ = this.store.pipe(select(fromApplication.getOwnershipTypeLookups),
      map(orgType => {
        return orgType.filter(o => o.ownershipTypeId !== OwnershipType.Corporation);
      }));

    this.isIncorporated = isIncoporated;
    if (this.isIncorporated) {
      this.incorporated.isDirty = true;
      this.unincorporated.isDirty = false;
      // this.incorporated.clearOwnership();
    }

    if (!this.isIncorporated) {
      this.incorporated.isDirty = false;
      this.unincorporated.isDirty = true;
      this.unincorporated.clearOwnership();
    }
  }

  // create ownership for incorporated organizatrion
  createIncorporated(ownership: Ownership) {
    ownership.isIncorporated = this.isIncorporated;
    this.store.dispatch(new applicationActions.CreateOwnership({...ownership, providerId: this.providerId}));
    this.store.dispatch(new applicationActions.ResetCurrentPersonId());
  }

  // update ownership for incorporated organization
  updateIncorporated(ownership: Ownership) {
    this.store.dispatch(new applicationActions.UpdateOwnership({...ownership, providerId: this.providerId}));
  }

  // NOTE: Create two sets of function just in case the api will be different for Unincorporated and Incorporated
  // will do a merge if the APIs are the same
  // create ownership for unincorporated
  createUnincorporated(ownership: Ownership) {
    this.store.dispatch(new applicationActions.CreateOwnership({...ownership, providerId: this.providerId}));
    this.store.dispatch(new applicationActions.ResetCurrentPersonId());
    this.router.navigateByUrl(ApplicationConstants.url.page.ownershipPersonnelProfile);
  }

  // update ownership for incorporated organization
  updateUnincorporated(ownership: Ownership) {
    ownership.isIncorporated = this.isIncorporated;
    this.store.dispatch(new applicationActions.UpdateOwnership({...ownership, providerId: this.providerId}));
  }

  // go to next page and update ownership
  nextPage() {
    // Navigating to next page URL if validation passes
    const url = ApplicationConstants.url.page.people;
    // either of the forms exists and valid
    if (this.incorporated || this.unincorporated) {
      if (this.isIncorporated) {
        this.incorporated.isDirty = true;
      } else {
        this.unincorporated.isDirty = true;
      }

      if (this.incorporated.isDirty && this.incorporated.isValid) {
        this.incorporated.ownershipCrud();
        this.navigate(url);
      } else if (this.unincorporated.isDirty && this.unincorporated.isValid) {
        const isListValid = this.unincorporated.checkSelectedListValidity();
        if (isListValid) {
          const ownershipTypeId: number = this.unincorporated.getOwnershipTypeId();
          this.store.dispatch(new applicationActions.SetOwnershipTypeId(ownershipTypeId));
          this.navigate(url);
        }
      } else if (this.incorporated.isDirty && !this.incorporated.isValid) {
        this.incorporated.launchErrorModal();
      } else if (this.unincorporated.isDirty && !this.unincorporated.isValid) {
        this.unincorporated.launchErrorModal();
      }
    }
  }

  // Saving Previous page URL
  previousPage() {
    const url = ApplicationConstants.url.page.services;
    this.navigate(this.previousUrl || url);

  }

  navigate(url) {
    // this.store.select(getRouterInfo).subscribe(data => this.formId = data.queryParams.formId);
    this.store.dispatch(new Go({
      path: [url],
      // query: { formId: this.formId },
      extras: { replaceUrl: false, queryParamsHandling: 'preserve' }
    }));

  }

}
