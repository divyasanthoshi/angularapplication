import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationConstants } from '../../application.constants';
import { Observable, BehaviorSubject } from 'rxjs';
import { Personnel, Ownership, Provider, ApplicationLookups, BusinessHours, Services } from '../../application-interface';
import { Store, select } from '@ngrx/store';
import * as fromApplication from '../../state';
import * as applicationActions from '../../state/application.actions';
import { tap } from 'rxjs/operators';
import * as fromRouter from '../../../reducers';
import { Go } from 'src/app/reducers/routerstate/router.actions';
import { getRouterInfo } from '../../state';
import { PersonTitleId, OwnershipType } from 'src/app/_shared/enum';


@Component({
  selector: 'app-summary-container',
  templateUrl: './summary-container.component.html',
  styleUrls: ['./summary-container.component.scss'],
})
export class SummaryContainerComponent implements OnInit {

  providerProfile$: Observable<Provider>;
  businessHours$: Observable<BusinessHours>;
  people$: Observable<Personnel[]>;
  ownership$: Observable<Ownership>;
  services$: Observable<Services>;
  currentProviderId$: Observable<number>;
  lookup$: Observable<ApplicationLookups>;
  formId: number;
  disabledFlag$ = new BehaviorSubject<boolean>(false);
  errorsObj; any = {};
  nextPageUrl = ApplicationConstants.url.page.applicationCertify;
  previousPageUrl = ApplicationConstants.url.page.ownership;
  constructor(
    private router: Router,
    private store: Store<fromApplication.State>,
    private routerStore: Store<fromRouter.RouterState>
  ) { }

  ngOnInit() {
    this.store.select(getRouterInfo).subscribe(data => this.formId = data.queryParams.formId);
    if (this.formId) {
      this.store.dispatch(new applicationActions.LoadProviderId(this.formId));
    }

    // load provider profile if state is empty
    this.providerProfile$ = this.store.pipe(select(fromApplication.getProvider),
      tap(providerProfile => this.checkValidation({ ...this.errorsObj, providerProfile })));
    this.people$ = this.store.pipe(select(fromApplication.getPeople),
      tap(people => this.checkValidation({ ...this.errorsObj, people })));
    this.ownership$ = this.store.pipe(select(fromApplication.getOwnership),
      tap(ownership => this.checkValidation({ ...this.errorsObj, ownership })));
    this.lookup$ = this.store.pipe(select(fromApplication.getApplicationLookups));
    this.businessHours$ = this.store.pipe(select(fromApplication.getBusinessHours),
    tap(businessHours => this.checkValidation({...this.errorsObj, businessHours}))),
    this.services$ = this.store.pipe(select(fromApplication.getServices),
      tap(services => this.checkValidation({ ...this.errorsObj, services })));
    this.currentProviderId$ = this.store.pipe(
      select(fromApplication.getCurrentProviderId),
      tap((value) => {
        if (value) {
          this.store.dispatch(new applicationActions.LoadProvider());
          this.store.dispatch(new applicationActions.LoadBusinessHours(value));
          this.store.dispatch(new applicationActions.LoadServices(value));
          this.store.dispatch(new applicationActions.LoadPeople(value));
          this.store.dispatch(new applicationActions.LoadOwnership());
        }
      })
    );
  }

  // Summary Page Application Validations
  checkValidation(obj: any) {
    this.errorsObj = obj;
    const isDisabled = !(obj && obj.providerProfile &&
      obj.providerProfile.providerId &&
      this.checkPeopleCount(obj.people) &&
      this.checkOwnershipErrors(obj) &&
      this. checkBusinessHours(obj.businessHours) &&
      this.checkServicesErrors(obj)
    );
    this.disabledFlag$.next(isDisabled);
  }

  checkPeopleCount(people) {
    return (people && people.length > 0);
  }

  checkBusinessHours(businessHours) {
    return (businessHours && businessHours.monthsOfOperation.length > 0);
  }

  checkOwnershipErrors(obj) {
    if (!(obj && obj.ownership && obj.ownership.ownershipTypeId)) {
      return false;
    }
    const ownersCount = obj.people ? obj.people.filter(
      person => person.personTitles.some(personTitle => personTitle.personTitleId === PersonTitleId.Owner)
    ).length : 0;
    const ownershipTypeId = obj.ownership.ownershipTypeId;
    const organization = obj.ownership.organization;
    const noCorporationError = ownershipTypeId === OwnershipType.Corporation
      && organization && organization.documentNumber && organization.name;
    const noUnIncorporationError = ownershipTypeId === OwnershipType.OtherEntity && organization && organization.name
      || ownershipTypeId === OwnershipType.Individual && ownersCount > 0
      || ownershipTypeId === OwnershipType.Partnership && ownersCount > 1;
    return noCorporationError || noUnIncorporationError;
  }

  checkServicesErrors(obj) {
    return (obj.services && obj.services.serviceList.length > 0 );
  }

  personnelRedirect(personId: number) {
    if (personId) {
      this.store.dispatch(new applicationActions.SetCurrentPersonnelId(personId));
      this.navigate(ApplicationConstants.url.page.personnelProfile);
    }
  }

  nextPage() {
    const url = ApplicationConstants.url.page.applicationCertify;
    this.navigate(url);
  }
  previousPage() {
    const url = ApplicationConstants.url.page.documents;
    this.navigate(url);

  }

  navigate(url) {
    this.store.dispatch(new Go({
      path: [url],
      extras: { replaceUrl: false, queryParamsHandling: 'preserve' }
    }));
  }

}
