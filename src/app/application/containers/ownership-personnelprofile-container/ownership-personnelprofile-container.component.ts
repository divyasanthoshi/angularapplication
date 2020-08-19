import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, from, of } from 'rxjs';
import { ApplicationLookups, Personnel, LookupPersonTitlePlus, Provider } from '../../application-interface';
import { ApplicationPersonnelprofileComponent } from '../../application-personnelprofile/application-personnelprofile.component';
import * as fromApplication from '../../state';
import * as applicationActions from '../../state/application.actions';
import { ApplicationConstants } from '../../application.constants';
import { Go } from 'src/app/reducers/routerstate/router.actions';
import { PersonTitleId } from 'src/app/_shared/enum';
@Component({
  selector: 'app-ownership-personnelprofile-container',
  templateUrl: './ownership-personnelprofile-container.component.html',
  styleUrls: ['./ownership-personnelprofile-container.component.scss'],
})
export class OwnershipPersonnelprofileContainerComponent implements OnInit, AfterViewInit {
  isvalid: string;
  personnel$: Observable<Personnel>;
  providerId$: Observable<number>;
  provider$: Observable<Provider>;
  programTypeId: number;
  applicationLookups$: Observable<ApplicationLookups>;
  personTitlePlusLookups$: Observable<LookupPersonTitlePlus[]>;
  @ViewChild(ApplicationPersonnelprofileComponent, { static: true }) child: ApplicationPersonnelprofileComponent;
  ownershipTypeId$: Observable<number>;
  constructor(
    private store: Store<fromApplication.State>,
  ) {
  }

  ngOnInit() {
    this.personnel$ = this.store.pipe(select(fromApplication.getCurrentPerson));
    this.providerId$ = this.store.pipe(select(fromApplication.getCurrentProviderId));
    this.applicationLookups$ = this.store.pipe(select(fromApplication.getApplicationLookups));
    this.provider$ = this.store.pipe(select(fromApplication.getProvider));
    this.provider$.subscribe(data => this.programTypeId = data.programTypeId);
    if (this.programTypeId !== undefined && isNaN(this.programTypeId) === false) {
      this.store.dispatch(new applicationActions.LoadPersonTitlePlusLookups(this.programTypeId));
      this.personTitlePlusLookups$ = this.store.pipe(select(fromApplication.getPersonTitlePlusLookups));
    }


  }
  // subscribing to personnelform status change
  ngAfterViewInit() {
    this.child.personnelProfileForm.statusChanges.subscribe(value => { this.isvalid = value; });
    this.child.setPersonTitleId = PersonTitleId.Owner;
  }

  createPersonnel(personnel: Personnel) {
      this.store.dispatch(new applicationActions.CreatePersonnel(personnel));
}

    updatePersonnel(personnel: Personnel) {
      this.store.dispatch(new applicationActions.UpdatePersonnel(personnel));
    }

    // on back button click
    previousPage() {
      const url = ApplicationConstants.url.page.ownership;
      this.navigate(url);
    }

    // on next button click
    nextPage() {
      if (this.child && this.child.validateLicenseFormControls() && this.child.isValid) {
        if (this.child.isDirty) {
          this.child.personnelCrud();
        }
        const url = ApplicationConstants.url.page.ownership;
        this.navigate(url);
      } else {
        this.child.markAsTouched();
      }
    }

    navigate(url: string) {
      this.store.dispatch(new Go({
        path: [url],
        extras: { replaceUrl: false, queryParamsHandling: 'preserve' }
      }));
    }

  }
