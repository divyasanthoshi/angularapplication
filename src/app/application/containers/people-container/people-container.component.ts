import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {  Personnel, ApplicationLookups } from '../../application-interface';
import * as fromApplication from '../../state';
import * as applicationActions from '../../state/application.actions';
import { ApplicationConstants } from '../../application.constants';
import { ApplicationPeopleComponent } from '../../application-people/application-people.component';
import { AlertController } from '@ionic/angular';
import { pluck, take } from 'rxjs/operators';

import * as fromRouter from '../../../reducers';
import { Go } from 'src/app/reducers/routerstate/router.actions';
import { getRouterInfo } from '../../state';

@Component({
  selector: 'app-people-container',
  templateUrl: './people-container.component.html',
  styleUrls: ['./people-container.component.scss'],
})
export class PeopleContainerComponent implements OnInit {
    @ViewChild(ApplicationPeopleComponent)
  private people: ApplicationPeopleComponent;
  currentPersonId$: Observable<number>;
  peopleList$: Observable<Personnel[]>;
  providerId$: Observable<number>;
  ownerShipTypeId$: Observable<number>;
  previousUrl: string = ApplicationConstants.url.page.ownership;
  formId: number;
  currentPersonnel$: Observable<Personnel>;
  applicationLookup$: Observable<ApplicationLookups>;
  peopleCount: number;

  constructor(
    private store: Store<fromApplication.State>,
    private router: Router,
    public alertController: AlertController,
    private routerStore: Store<fromRouter.RouterState>
  ) { }


  ngOnInit() {
    this.store.select(getRouterInfo).subscribe(data => this.formId = data.queryParams.formId);
    if (this.formId !== undefined) {
        this.store.dispatch(new applicationActions.LoadProviderId(this.formId));
    }
    this.currentPersonId$ = this.store.pipe(select(fromApplication.getCurrentPersonId));
    this.currentPersonnel$ = this.store.pipe(select(fromApplication.getCurrentPerson));
    this.peopleList$ = this.store.pipe(select(fromApplication.getPeople));
    this.peopleList$.subscribe((people) => {
      if (people) {
        this.peopleCount = people.length;
      }
    });
    this.ownerShipTypeId$ = this.store.pipe(select(fromApplication.getOwnership), pluck('ownershipTypeId'));
    this.store.pipe(select(fromApplication.getCurrentProviderId)).subscribe(res => {
      if (res) {
        this.store.dispatch(new applicationActions.LoadPeople(res));
      }
    });
    this.applicationLookup$ = this.store.pipe(select(fromApplication.getApplicationLookups));
  }

  setCurrentPersonnel(personId: number) {
    this.store.dispatch(new applicationActions.SetCurrentPersonnelId(personId));
    this.store.dispatch(new applicationActions.LoadProvider());
  }

  editPersonnel(personId: number) {
    this.store.dispatch(new applicationActions.SetCurrentPersonnelId(personId));
    this.store.dispatch(new applicationActions.LoadPersonnel(personId));
  }

  viewPersonnel(personId: number) {
    this.store.dispatch(new applicationActions.SetCurrentPersonnelId(personId));
    const url = ApplicationConstants.url.page.peoplePersonnelView;
    this.navigate(url);
    this.store.dispatch(new applicationActions.LoadPersonnel(personId));
    this.store.dispatch(new applicationActions.LoadProvider());
  }

  deletePerson(personId: number) {
    this.store.dispatch(new applicationActions.DeletePerson(personId));
  }

  createPersonnel() {
    this.store.dispatch(new applicationActions.LoadProvider());
    this.store.dispatch(new applicationActions.ResetCurrentPersonId());
    const url = ApplicationConstants.url.page.personnelProfile;
    this.navigate(url);
  }

  nextPage() {
    // const isReadyToNextPage = this.people.checkForNextPage();
    if (this.people.peopleList && this.people.peopleList.length) {
      const url = ApplicationConstants.url.page.documents;
      this.ownerShipTypeId$.pipe(take(1)).subscribe(
        (ownerShipTypeId: number) => {
         const isRouteToNextPage = this.people.checkForNextPage(ownerShipTypeId);
         if (isRouteToNextPage) {
           this.navigate(url);
         }
        }
      );
    } else {
      this.people.launchPersonRecord();
    }
  }


  async launchModal(message: any) {
    const alert = await this.alertController.create({
      header: message.title,
      message: message.description,
      buttons: ['Ok']
    });
    await alert.present();
  }

  navigate(url) {
    this.store.dispatch(new Go({
        path: [url],
        extras: { replaceUrl: false, queryParamsHandling: 'preserve' }
      }));
  }
}
