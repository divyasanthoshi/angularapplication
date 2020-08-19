import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Constant } from 'src/app/_shared/constant';
import { LookupPersonType, Personnel } from '../application-interface';
import { ApplicationConstants } from '../application.constants';
import * as fromRouter from '../../reducers';
import { select, Store } from '@ngrx/store';
import { getRouterInfo } from '../state';
import { Go } from 'src/app/reducers/routerstate/router.actions';
import { Observable } from 'rxjs';
import { OrganizationType, OwnershipType, PersonTitleId } from 'src/app/_shared/enum';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-application-people',
  templateUrl: './application-people.component.html',
  styleUrls: ['../../../stylesheet/modules/ion-list-categorized.scss', '../../../stylesheet/modules/ion-alert.scss',
              '../../../stylesheet/modules/ion-list-categorized.scss', './application-people.component.scss'],
})
export class ApplicationPeopleComponent implements OnInit, OnChanges {

  @Input() peopleList: Personnel[];
  @Input() currentPersonnelId: number;
  @Output() selectPersonnel = new EventEmitter<number>();
  @Output() create = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  searchText: string;
  firstLetterList: Array<string> = [];
  peopleAlphaBetaList: Personnel[][] = [];
  isInitialized = false;
  selectedPerson: Personnel;
  formId: number;
  constructor(
    private router: Router,
    private routerStore: Store<fromRouter.RouterState>,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    // this.isInitialized = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.peopleList.currentValue && changes.peopleList.currentValue.length) {
      this.mapPeopleAlphaBeta();
      if ((!this.currentPersonnelId || this.currentPersonnelId === 0) && changes.peopleList.currentValue) {
        this.selectPersonnel.emit(changes.peopleList.currentValue[0].personId);
      }
    }
  }

  // this function is used to map a list of personnel to a alphabeically grouped personnel[][]
  mapPeopleAlphaBeta() {
    let firstLetter = '';
    let personnelList: Personnel[] = [];
    this.firstLetterList = [];
    this.peopleAlphaBetaList = [];
    if (this.peopleList && this.peopleList instanceof Array && this.peopleList.length) {
      const listLength = this.peopleList.length;
      // sorting the peopleList
      this.peopleList.sort((personnel1, personnel2) => personnel1.firstName.toLowerCase().localeCompare(personnel2.firstName.toLowerCase()));
      this.peopleList.map((personnel, index) => {
        const nameFirstLetter = personnel.firstName.slice(0, 1).toUpperCase();
        const isLastPersonnel = index === (listLength - 1);
        // if the first letter matches, add to the same letter group
        if (nameFirstLetter === firstLetter) {
          personnelList.push(personnel);
        } else {
          firstLetter = nameFirstLetter;
          this.firstLetterList.push(nameFirstLetter);
          // push the letter group to people alpha beta list
          if (personnelList.length > 0) {
            this.peopleAlphaBetaList.push(personnelList);
          }
          personnelList = [];
          personnelList.push(personnel);
        }
        // if it is the last personnel, push the whole personnnel list
        if (isLastPersonnel) {
          this.peopleAlphaBetaList.push(personnelList);
          personnelList = [];
        }
      });
    }
  }

  clickPeople(event, peopleId: number) {
    if (event.target.tagName !== Constant.ionicTagName.button) {
      this.selectPersonnel.emit(peopleId);
    }
  }
  clickEdit(peopleId: number) {
    this.edit.emit(peopleId);
    const url = ApplicationConstants.url.page.personnelProfile;
    this.navigate(url);
  }
  clickDelete(peopleId: number) {
    this.delete.emit(peopleId);
  }
  clickCreate() {
    this.create.emit();
  }

  // Business Validations for Ownership Module
  checkForNextPage(ownerShipTypeId) {
    if (ownerShipTypeId) {
      if (ownerShipTypeId === OwnershipType.Individual) {
        const count = this.countOwners();
        if (count === 1) {
          return true;
        } else if (count > 1) {
          this.launchModal({
            title: ApplicationConstants.validationModalData.title.title
            , description: ApplicationConstants.validationModalData.description.individualDescriptionErrorOne
            , listItem: ApplicationConstants.validationModalData.listItems.individualItemsErrorOne
          });
        } else {
          this.launchModal({
            title: ApplicationConstants.validationModalData.title.title
            , description: ApplicationConstants.validationModalData.description.individualDescriptionErrorTwo
            , listItem: ['List', 'List']
          });
        }
      } else if (ownerShipTypeId === OwnershipType.Partnership) {
        const count = this.countOwners();
        if (count >= 2) {
          return true;
        } else if (count <= 1) {
          this.launchModal({
            title: ApplicationConstants.validationModalData.title.title
            , description: ApplicationConstants.validationModalData.description.partnershipDescriptionErrorTwo
            , listItem: ApplicationConstants.validationModalData.listItems.partnershipItemsErrorOne
          });
        } else {
          this.launchModal({
            title: ApplicationConstants.validationModalData.title.title
            , description: ApplicationConstants.validationModalData.description.partnershipDescriptionErrorTwo
            , listItem: ['List', 'List']
          });
        }
      } else if (ownerShipTypeId === OwnershipType.Corporation) {
        return this.validateZeroOwner({
          title: ApplicationConstants.validationModalData.title.title
          , description: ApplicationConstants.validationModalData.description.corporationDescriptionErrorOne
          , listItem: ApplicationConstants.validationModalData.listItems.corporationItemsErrorOne
        });
      } else if (ownerShipTypeId === OwnershipType.OtherEntity) {
        return this.validateZeroOwner({
          title: ApplicationConstants.validationModalData.title.title
          , description: ApplicationConstants.validationModalData.description.otherEntityDescriptionErrorOne
          , listItem: ApplicationConstants.validationModalData.listItems.otherEntityItemsErrorOne
        });
      } else {
        return true;
      }
    } else {
      return true;
    }
    return;
  }

  // This method is used to return the error modal if Ownership is selected to Corporation or OtherEntity
  validateZeroOwner(errConfig) {
    const count = this.countOwners();
    if (count === 0) {
      return true;
    } else {
      this.launchModal(errConfig);
    }
  }

  launchPersonRecord() {
    this.launchModal({
      title: ApplicationConstants.validationModalData.title.title,
      description: ApplicationConstants.validationModalData.description.peoplePersonnelError,
      listItem: []
    });
  }

  // Validation Modal
  async launchModal(message: any) {
    let messages = '';
    messages = message.description.concat('<hr>');
    message.listItem.forEach((value, index) => {
      messages += (`${index + 1}. ${value}<hr>`);
    });
    const alert = await this.alertController.create({
      header: message.title,
      message: messages,
      buttons: ['Ok']
    });
    await alert.present();
  }

  private countOwners(): boolean | number {
    const ownersCount = this.peopleList.filter(
      people => people.personTitles.some(personTitle => personTitle.personTitleId === PersonTitleId.Owner)
    ).length;
    return ownersCount;
  }

  navigate(url: string) {
    this.routerStore.dispatch(new Go({
      path: [url],
      extras: { queryParamsHandling: 'preserve' }
    }));
  }
}
