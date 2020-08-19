import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, OnChanges } from '@angular/core';
import { clone } from 'lodash';
import { Organization, Ownership } from '../../application-interface';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { OwnershipType, AddressType, EmailAddressType } from 'src/app/_shared/enum';

@Component({
  selector: 'app-application-ownership-incorporated',
  templateUrl: 'application-ownership-incorporated.component.html',
  styleUrls: ['./application-ownership-incorporated.component.scss'],
})
export class ApplicationOwnershipIncorporatedComponent implements OnInit {

  @ViewChild('incorporatedSearchbar', { read: ElementRef, static: true }) searchbar: ElementRef;

  public _ownership: Ownership = { organization: null, ownershipTypeId: null, isIncorporated: true};
  loadingIndicator: any;
  @Input() set ownership(data: Ownership) {
    if (data && data.ownershipTypeId === OwnershipType.Corporation) {
      this._ownership = clone(data);
      if (this._ownership) {
        this._ownership.isIncorporated = true;
        // whenever the input data is updated from search then the form will become valid
        if (this._ownership.organization) {
          this.isValid = true;
        }
      }
    }

  }

  get ownership() {
    return this._ownership;
  }
  @Input() set searchedOrganization(data: Organization) {
    if (data) {
      this._ownership.organization = data;
      this.isValid = true;
      this.isDirty = true;
      this._ownership.ownershipTypeId = OwnershipType.Corporation;
      this._ownership.organization.mainAddress.selectedCountyId = data.mainAddress.counties[0].countyId;
      this._ownership.organization.mainAddress.addressTypeId = AddressType.Main;
      this._ownership.organization.email.emailAddressTypeId = EmailAddressType.Main;
    }
  }
  @Input() providerId: number;
  @Output() documentNum = new EventEmitter<string>();
  @Output() public create = new EventEmitter<Ownership>();
  @Output() public update = new EventEmitter<Ownership>();

  // public docFind = true;
  public isValid = false;
  public isDirty = false;
  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }


  ngOnInit() {
  }

  // create ownership information for provider
  public createOwnership() {
    if (this.isValid) {
      this.create.emit(this._ownership);
    }
  }

  // update ownership information for the provider
  public updateOwnership() {
    if (this.isValid) {
      this.update.emit(this._ownership);
    }
  }

  // determine whether it is going to be an update or a create action
  public ownershipCrud() {
      if (this._ownership.organization.mainAddress.addressTypeId == null) {
      this._ownership.organization.mainAddress.addressTypeId = AddressType.Main;
    }
    // if the organization id is valid and not equals to 0 then update, otherwise create
    if (this._ownership.organization && this._ownership.organization.organizationId && this._ownership.organization.organizationId !== 0) {
      this.updateOwnership();
    } else {
      this.createOwnership();
    }
  }

  // clear incorporated ownership information
  public clearOwnership() {
    this._ownership = {
      ownershipTypeId: null,
      organization: null,
      // ownerIds: [],
      isIncorporated: this._ownership.isIncorporated
    };
    // make the component invalid is the value is cleared
    this.isValid = false;
  }

  public launchErrorModal() {
    this.launchModal({
      title: 'Ownership Error'
      , description: 'You have selected for Incorporated. Please search for a valid document number to proceed to next page.'
      , listItem: []
    });
  }

  // Validation Modal
  async launchModal(message: any) {
    const alert = await this.alertController.create({
      header: message.title,
      message: message.description,
      buttons: ['Ok']
    });
    await alert.present();
  }


  // showFind() {
  //   this.docFind = true;
  // }

  // search the document number that is entered in the textbox
  seachDocNum() {
    const docNum = this.searchbar.nativeElement.value;
    if (this._ownership.organization === null || docNum !== this._ownership.organization.documentNumber) {
      this.isValid = false;
      // this.docFind = false;
      this.documentNum.emit(docNum);
      this.presentLoading();
    }
  }

  async presentLoading() {
    this.loadingIndicator = await this.loadingController.create({
      message: 'Please wait...',
      // duration: 2000
    });

    return await this.loadingIndicator.present();
  }

  // Removing spaces from Main Address
  removeExtraSpaces(text: any) {
    if (typeof text === 'string') {
      return text.replace(/ {2,}/g, ' ').trim();
    } else {
      return text;
    }
  }

}


