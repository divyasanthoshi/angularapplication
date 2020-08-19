import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApplicationLookups, Personnel, LookupPersonTitlePlus, Provider } from '../../application-interface';
import { ApplicationPersonnelprofileComponent } from '../../application-personnelprofile/application-personnelprofile.component';
import * as fromApplication from '../../state';
import * as applicationActions from '../../state/application.actions';
import { ApplicationConstants } from '../../application.constants';
import { Go } from 'src/app/reducers/routerstate/router.actions';


@Component({
  selector: 'app-personnelprofile-container',
  templateUrl: 'personnelprofile-container.component.html',
  styleUrls: ['personnelprofile-container.component.scss'],
})
export class PersonnelprofileContainerComponent implements OnInit, AfterViewInit {
  isvalid: string;
  formId: number;
  personnel$: Observable<Personnel>;
  providerId$: Observable<number>;
  provider$: Observable<Provider>;
  programTypeId: number;
  personTitlePlusLookups$: Observable<LookupPersonTitlePlus[]>;
  applicationLookups$: Observable<ApplicationLookups>;
  @ViewChild(ApplicationPersonnelprofileComponent, { static: true }) child: ApplicationPersonnelprofileComponent;
  previousUrl: string = ApplicationConstants.url.page.people;

  constructor(
    private router: Router,
    private store: Store<fromApplication.State>,
  ) {
  }


  ngOnInit() {
    this.personnel$ = this.store.pipe(select(fromApplication.getCurrentPerson));
    this.providerId$ = this.store.pipe(select(fromApplication.getCurrentProviderId));
    this.applicationLookups$ = this.store.pipe(select(fromApplication.getApplicationLookups));
    this.provider$  = this.store.pipe(select(fromApplication.getProvider));
    this.provider$.subscribe(data => this.programTypeId = data.programTypeId);
    if (this.programTypeId !== 0 && this.programTypeId !== undefined) {
       this.store.dispatch(new applicationActions.LoadPersonTitlePlusLookups(this.programTypeId));
    }
    this.personTitlePlusLookups$ = this.store.pipe(select(fromApplication.getPersonTitlePlusLookups));
  }

  // subscribing to personnelform status change
  ngAfterViewInit() {
    this.child.personnelProfileForm.statusChanges.subscribe(value => { this.isvalid = value; });
  }
  createPersonnel(personnel: Personnel) {
    this.store.dispatch(new applicationActions.CreatePersonnel(personnel));
  }

  updatePersonnel(personnel: Personnel) {
    this.store.dispatch(new applicationActions.UpdatePersonnel(personnel));
  }

  // on next button click
  nextPage() {
    if (this.child && this.child.validateLicenseFormControls() && this.child.isValid) {
      if (this.child.isDirty) {
        this.child.personnelCrud();
      }
      const url = ApplicationConstants.url.page.people;
      this.navigate(url);
    } else {
      this.child.markAsTouched();
    }
  }
  navigate(url: string) {
    this.store.dispatch(new Go({
      path: [url],
      extras: { replaceUrl: true, queryParamsHandling: 'preserve' }
    }));
  }

}
