import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { Constant } from '../../../_shared/constant';
import { OwnershipType, OrganizationType, AddressType, PhoneType, EmailAddressType, PersonTitleId } from '../../../_shared/enum';
import { ApplicationLookups, LookupOwnershipType, Organization, Ownership, Personnel, IErrConfig } from '../../application-interface';
import { Checkbox } from '../../../_shared/Interfaces/utility';
import { BusinessAddress, BusinessPhone, BusinessEmail } from '../../../_shared/models/businessentity';
import { ApplicationConstants } from '../../application.constants';
import { ApplicationService } from '../../application.service';
import { ModalController, AlertController } from '@ionic/angular';
import { AddressValidationModalComponent } from 'src/app/_shared/modals/address-validation-modal/addressvalidationmodal.component';
import { Go } from 'src/app/reducers/routerstate/router.actions';
import * as routerAction from '../../../reducers/routerstate/router.actions';
import { getRouterInfo } from '../../state';
import * as fromRouter from '../../../reducers';
import { select, Store } from '@ngrx/store';
import { UtilityService } from 'src/app/_core/services/utility.service';
import { map, filter } from 'rxjs/operators';
import { AddressVerification } from 'src/app/_shared/Interfaces/businessentity';

@Component({
  selector: 'app-application-ownership-unincorporated',
  templateUrl: './application-ownership-unincorporated.component.html',
  styleUrls: ['../../../../stylesheet/modules/ion-alert.scss', '../../../../stylesheet/modules/ion-modal.scss',
              '../../../../stylesheet/modules/ion-segment.scss' , './application-ownership-unincorporated.component.scss'],
})

export class ApplicationOwnershipUnincorporatedComponent implements OnInit, OnChanges {

  public _ownership: Ownership;
  public _people: Personnel[];
  public _partnershipPeople: Personnel[];
  public otherEntityForm: FormGroup;
  public phoneMask: any[] = Constant.maskPattern.phoneMask;
  public extensionMask: any[] = Constant.maskPattern.extensionMask;
  public needFocus: boolean;

  @Input() applicationLookups: ApplicationLookups;
  _lookupUnincorporated: LookupOwnershipType[];

  @Input() lookupUnincorporated: LookupOwnershipType[];


  @Input() set people(value: Personnel[]) {
    this._people = value.filter(person => person.personTitles.some(personTitle => personTitle.personTitleId === PersonTitleId.Owner));
    this._partnershipPeople = value.filter(person => person.personTitles.some(personTitle => personTitle.personTitleId === PersonTitleId.Owner));
  }
  get people() {
    return this._people;
  }
  @Input() set ownership(data: Ownership) {
    this._ownership = cloneDeep(data);
    if (data && !data.isIncorporated) {
      this.isValid = true;
    }
    if (data && data.ownershipTypeId === OwnershipType.OtherEntity && data.organization) {
      this.setOtherEntityFormValue(data.organization);
    }
  }
  @Input() providerId: number;
  @Output() public create = new EventEmitter<Ownership>();
  @Output() public update = new EventEmitter<Ownership>();

  public isValid = false;
  public isDirty = false;
  public ownerCheckboxList: Checkbox[];
  personnelProfilePageLink = ApplicationConstants.url.page.personnelProfile;
  formId: number;

  get addresses(): FormGroup {
    return this.otherEntityForm.get('mainAddress') as FormGroup;
  }

  get phones(): FormGroup {
    return this.otherEntityForm.get('phone') as FormGroup;
  }

  get emails(): FormGroup {
    return this.otherEntityForm.get('email') as FormGroup;
  }

  constructor(
    private formBuilder: FormBuilder,
    private applicationService: ApplicationService,
    private modalController: ModalController,
    private utlitiesService: UtilityService,
    private store: Store<fromRouter.RouterState>,
    public alertController: AlertController
  ) {
  }

  ngOnInit() {
    // this.routeEventsService.setUrl(this.router.url);
    // build the form group controls with validation
    this.otherEntityForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      representative: ['', [Validators.required]],
      organizationId: 0,
      abbreviation: '',
      documentNumber: '',
      fein: '',
      businessType: [''],
      mainAddress: this.formBuilder.group(new BusinessAddress(AddressType.Main)),
      phone: this.formBuilder.group(new BusinessPhone(PhoneType.Cell)),
      email: this.formBuilder.group(new BusinessEmail(EmailAddressType.Main)),
      website: '',
      isDocumentNumberValid: [''],
    });
    this.formArraysValidator();

    // subscribe form validation status
    this.otherEntityForm.statusChanges.subscribe(value => {
      if (value === Constant.formStatus.valid) {
        this.isValid = true;
      }
    });

    // subscribe to any value changes in the form
    this.otherEntityForm.valueChanges.subscribe(() => this.isDirty = true);
  }

  private formArraysValidator() {
    this.addAddressFormValidator();
    this.addPhonesFormValidator();
    this.addEmailFormValidator();
  }

  private addAddressFormValidator() {
    if (this.addresses) {
      const isRequired = true;
      const validatorArray = [Validators.required];
      const zipCodeValiatorArray = [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(5),
        Validators.maxLength(5)
      ];
      if (!isRequired) {
        validatorArray.shift();
        zipCodeValiatorArray.shift();
      }
      this.addresses.controls.streetAddress.setValidators(validatorArray);
      this.addresses.controls.city.setValidators(validatorArray);
      this.addresses.controls.state.setValidators(validatorArray);
      this.addresses.controls.zipCode.setValidators(zipCodeValiatorArray);
    }
  }

  private addPhonesFormValidator() {
    if (this.phones) {
      const validatorArray = [Validators.required, Validators.minLength(14), Validators.maxLength(14)];
      this.phones.controls.phoneNumber.setValidators(validatorArray);
    }
  }

  private addEmailFormValidator() {
    if (this.emails) {
      const validatorArray = [Validators.required, Validators.email];
      this.emails.controls.emailAddress.setValidators(validatorArray);
    }
  }

  setActionSheetHeader(text: string) {
    return {
      header: text
    };
  }

  // here is generating the checkboxes with selected options for partnership
  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.people && this.people) || (changes.ownership && this.ownership)) {
      const peoplelist = this.people;
      this.ownerCheckboxList = [];
    }
    if (changes.lookupUnincorporated && changes.lookupUnincorporated.currentValue && changes.lookupUnincorporated.currentValue.length) {
      this.lookupUnincorporated = changes.lookupUnincorporated.currentValue;
    }
  }

  // set value for other entity form
  setOtherEntityFormValue(otherEntityValue: Organization) {
    if (this.otherEntityForm) {

      // stop the emit event for statusChanges and valueChanges for initialization
      const options = {
        emitEvent: false
      };
      this.otherEntityForm.patchValue(otherEntityValue, options);
    }
  }

  // get value from other entity form and set it to _otherEntity
  getOtherEntityFormValue(): Ownership {
    if (this._ownership && this.otherEntityForm) {
      this._ownership.organization = null;
      if (this.otherEntityForm.valid) {
        this._ownership.organization = cloneDeep(this.otherEntityForm.value);
        this._ownership.organization.organizationTypeId = this._ownership.ownershipTypeId === OwnershipType.OtherEntity ? OrganizationType.OtherEntity : null;
        this.replacePhoneNumber();
      }
      // change values
      this._ownership.isIncorporated = false;
      if (this._ownership.organization && this._ownership.organization.mainAddress && this._ownership.organization.mainAddress.counties) {
        this._ownership.organization.mainAddress.selectedCountyId = this._ownership.organization.mainAddress.counties[0].countyId;
      }
    }
    return this._ownership;
  }

  private replacePhoneNumber(): void {
    const phoneNumber = this._ownership.organization.phone.phoneNumber;
    this._ownership.organization.phone.phoneNumber = this.utlitiesService.replacePhoneNumber(phoneNumber);
  }

  // clear the fields when user change to individual
  public clearOwners() {
    const peoplelist = this.people;
    this.ownerCheckboxList = [];
    peoplelist.forEach(personnel => {
        this.ownerCheckboxList.push({
          value: personnel.personId,
          isChecked: false
        });
    });
    this.isValid = false;
  }
  // triggered when the segment control changes value
  segmentChanged(segValue: number) {
    if (this.otherEntityForm) {
      this.otherEntityForm.reset();
    }
    this.clearOwners();
    if (this._ownership) {
      this._ownership.ownershipTypeId = segValue;
    }
    // change the isdirty to true for the page
    this.isValid = true;
  }

  // when one owner is changed
  changeOwner(personId: number) {
    // change the isdirty to true for the page
    this.isDirty = true;
    this.isValid = true;
  }

  // when multiple owners is changed
  changeOwners(event: any, personId: number) {
    if (this._ownership.ownershipTypeId === OwnershipType.Partnership) {
    }
  }

  public otherEntityCrud() {
    const result = this.getOtherEntityFormValue();
    this.create.emit(result);
  }

  public setAddressEmailPhone() {
    this.setDefaultAddressValues(this.addresses.controls);
    this.setDefaultPhoneValues(this.phones.controls);
    this.setDefaultEmailValues(this.emails.controls);
  }

  setDefaultAddressValues(addresses) {
    addresses.addressTypeId.setValue(AddressType.Main);
  }

  setDefaultPhoneValues(phones) {
    phones.uniquePhoneId.setValue(0);
    phones.phoneNumberTypeId.setValue(PhoneType.Cell);
  }

  setDefaultEmailValues(emails) {
    emails.uniqueEmailId.setValue(0);
    emails.emailAddressTypeId.setValue(EmailAddressType.Main);
  }

  // create ownership information for provider
  createOwnership() {
    if (this.isValid) {
      const result = this.getOtherEntityFormValue();
      this.create.emit(result);
    }
  }

  // update ownership information for the provider
  updateOwnership() {
    if (this.isValid) {
      const result = this.getOtherEntityFormValue();
      this.update.emit(result);
    }
  }

  // determine whether it is going to be an update or a create action
  public ownershipCrud() {
    // if the organization id is valid and not equals to 0 then update, otherwise create
    if (this._ownership.organization && this._ownership.organization.organizationId && this._ownership.organization.organizationId !== 0) {
      this.updateOwnership();
    } else {
      this.createOwnership();
    }
  }


  public otherEntityFormValidation() {
    (Object as any).values(this.otherEntityForm.controls).forEach(control => {
      control.setValue(control.value);
    });
  }

  public checkOwnershipSelectedAndCount(): { ownershipTypeId: number, ownersCount: number } {
    if (!this.people.length) {
      return { ownershipTypeId: this._ownership.ownershipTypeId, ownersCount: 0 };
    } else {
      const ownersCount = this.people.filter(
        person => person.personTitles.some(personTitle => personTitle.personTitleId === PersonTitleId.Owner)
      ).length;
      return { ownershipTypeId: this._ownership.ownershipTypeId, ownersCount };
    }
  }

  // clear incorporated ownership information
  public clearOwnership() {
    this._ownership = {
      ownershipTypeId: null,
      organization: null,
      isIncorporated: this._ownership ? this._ownership.isIncorporated : false
    };

    // clear the value for the form
    if (this.otherEntityForm) {
      this.otherEntityForm.reset();
    }

    // reset the ownerid section
    this.clearOwners();

    // make the component invalid is the value is cleared
    this.isValid = false;
  }

  public createPartnershipProfile() {
    this.createOwnership();
    this.navigate(ApplicationConstants.url.page.ownershipPersonnelProfile);
  }

  public createIndividualProfile() {
    this.createOwnership();
    this.navigate(ApplicationConstants.url.page.ownershipPersonnelProfile);
  }

  public goToPersonnelPage() {
    this.navigate(ApplicationConstants.url.page.ownershipPersonnelProfile);
  }

  // Validation of Address API
  validateAddress() {
    if (this.addresses.valid && this.addresses.controls.streetAddress && this.addresses.controls.city && this.addresses.controls.state && this.addresses.controls.zipCode) {
      this.callAddressValidator(this.addresses);
    }
  }

  // call api to validate the address
  callAddressValidator(addressGroup: FormGroup) {
    const reqPayload = { ...addressGroup.value, addressId: 0, addressTypeId: AddressType.Main, isAddressChanged: true };
    // reset to set the dirty to false
    addressGroup.reset(reqPayload);
    this.applicationService.checkAddressValidation(reqPayload)
      .pipe(
        filter((res: AddressVerification[]) => Boolean(res && res.length)),
        map((res: AddressVerification[]) => res[0])
      ).subscribe(res => {
        if (res.smartyStreetsFootNote.length === 0 || res.smartyStreetsFootNote.map((note) => note.category).indexOf('A') === 0) {
          addressGroup.patchValue(res);
          if (res.counties.length === 1) {
            addressGroup.get('selectedCountyId').reset(res.counties[0].countyId);
          }
        }
        // reset to set the dirty to false
        this.addressSelection(reqPayload, res, addressGroup);
      });
  }

  async addressSelection(request, response, formGroup: FormGroup) {
    const modal = await this.modalController.create({
      component: AddressValidationModalComponent,
      cssClass: 'popover',
      componentProps: {
        enteredAddress: request,
        suggestedAddress: response,
        form: formGroup
      }
    });

    modal.onDidDismiss().then((data) => {
      if (data.data && data.data.needFocus === true) {
        this.needFocus = true;
        const input: any = document.querySelector('input[name=streetAddress]');
        input.focus();
      }
    });

    return await modal.present();
  }

  public getOwnershipTypeId(): number {
    return this._ownership.ownershipTypeId;
  }

  public checkSelectedListValidity(): boolean {
    let errConfig: IErrConfig;
    const { ownershipTypeId, ownersCount } = this.checkOwnershipSelectedAndCount();
    if (ownershipTypeId === OwnershipType.Individual) {
      errConfig = {
        title: 'Individual Error'
        , description: 'You have selected Individual, there must be atleast one Ownership Profile.', listItem: []
      };
      return this.checkValidity(ownersCount, 0, errConfig);
    } else if (ownershipTypeId === OwnershipType.Partnership) {
      errConfig = {
        title: 'Partnership Error'
        , description: 'You have selected Partnership, there must be atleast two Ownership Profiles.', listItem: []
      };
      return this.checkValidity(ownersCount, 1, errConfig);
    } else if (ownershipTypeId === OwnershipType.OtherEntity) {
      return this.checkOwnershipFormValidity();
    }
    return;
  }

  private checkValidity(count: number, validityCount: number, errConfig: IErrConfig): boolean {
    if (count > validityCount) {
      this.ownershipCrud();
      return true;
    } else {
      this.launchModal({
        title: errConfig.title,
        description: errConfig.description,
        listItem: errConfig.listItem
      });
    }
    return;
  }

  private checkOwnershipFormValidity(): boolean {
    if (this.otherEntityForm.valid) {
      this.setAddressEmailPhone();
      this.otherEntityCrud();
      return true;
    } else {
      this.otherEntityFormValidation();
    }
    return;
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

  public launchErrorModal() {
    this.launchModal({ title: 'Ownership Error', description: 'Please choose a organization type', listItem: [] });
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
