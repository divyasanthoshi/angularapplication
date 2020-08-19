import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Address, AddressVerification } from 'src/app/_shared/Interfaces/businessentity';
import { ApplicationLookups, LookupAddressType, LookupEmailAddressType, LookupPersonType, LookupPhoneType, Personnel, LookupPersonTitlePlus, PersonTitlePlusInfo } from '../application-interface';
import { ApplicationService } from '../application.service';
import { cloneDeep } from 'lodash';
import { AddressType, PhoneType, EmailAddressType } from 'src/app/_shared/enum';
import { BusinessPhone, BusinessEmail, BusinessAddress } from 'src/app/_shared/models/businessentity';
import { UtilityService } from 'src/app/_core/services/utility.service';
import { Constant } from 'src/app/_shared/constant';
import { AddressValidationModalComponent } from 'src/app/_shared/modals/address-validation-modal/addressvalidationmodal.component';
import { ModalController } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { ModalComponent } from 'src/app/_core/modal/modal.component';
import { CascadeCheckbox } from 'src/app/_shared/Interfaces/utility';
import { slideInOut } from 'src/app/_shared/animation/animation';
import _ from 'lodash';

@Component({
  selector: 'app-application-personnelprofile',
  templateUrl: './application-personnelprofile.component.html',
  styleUrls: ['./application-personnelprofile.component.scss'],
  animations: [slideInOut]
})

export class ApplicationPersonnelprofileComponent implements OnInit, OnChanges {
  // variables declared here
  public _personnel: Personnel;
  public phoneMask: any[] = Constant.maskPattern.phoneMask;
  public ssnMask: any[] = Constant.maskPattern.ssnMask;
  needFocus: boolean;
  dlInvalid = false;
  userChoiceArray: CascadeCheckbox[] = [];
  mappedPersonTitlePlusLookups: CascadeCheckbox[];
  displayPersonTitle;
  // intializing if person exists for loading if personnnel exists
  @Input() set personnel(personnel: Personnel) {
    this._personnel = cloneDeep(personnel);
  }

  get personnel() {
    return this._personnel;
  }
  // load application lookups
  @Input() applicationLookups: ApplicationLookups;
  @Input() providerId: number;
  @Input() personTitlePlusLookups: LookupPersonTitlePlus[];

  // emit create and update events
  @Output() public creates: EventEmitter<Personnel> = new EventEmitter<Personnel>();
  @Output() public update: EventEmitter<Personnel> = new EventEmitter<Personnel>();

  public personnelProfileForm: FormGroup;
  public get personnelForm() {
    return this.personnelProfileForm;
  }
  public get isDirty(): boolean {
    return this.personnelProfileForm.dirty;
  }
  public get isValid(): boolean {
    return this.personnelProfileForm.valid;
  }
  get phoneTypes(): LookupPhoneType[] {
    return this.applicationLookups.lookupPhoneType.filter(
      (phoneType) => phoneType.phoneNumberTypeId !== PhoneType.Cell && phoneType.phoneNumberTypeId !== PhoneType.Blank);
  }
  personId: number;
  customPickerOptions: any;
  primaryAddressType = AddressType.Home;
  cellPhoneType = PhoneType.Cell;
  primaryEmailType = EmailAddressType.Main;
  defaultRoles: string[];
  item: CascadeCheckbox;
  setPersonTitleId: number;

  get addresses(): FormArray {
    return this.personnelProfileForm.get('addresses') as FormArray;
  }

  get phones(): FormArray {
    return this.personnelProfileForm.get('phones') as FormArray;
  }

  get emails(): FormArray {
    return this.personnelProfileForm.get('emails') as FormArray;
  }

  get roleControl(): FormControl {
    return this.personnelProfileForm.get('personTitles') as FormControl;
  }

  constructor(
    private applicationService: ApplicationService,
    private utlitiesService: UtilityService,
    private formBuilder: FormBuilder,
    private modalcontroller: ModalController
  ) {
    this.displayPersonTitle = '';
  }

  addressGroup: Address = null;

  // check and do the crud operations for personnel
  public personnelCrud() {
    const personnel = this.convertFormValue(this.personnelProfileForm.value);
    if (this._personnel && this._personnel.personId === 0) {
      // create if personnelId is zero
      this.creates.emit(personnel);
      // update if exists
    } else if (this._personnel && this._personnel.personId !== null) {
      this.update.emit(personnel);
    } else {
      this.creates.emit(personnel);
    }
  }
  ngOnChanges() {
    // instantiating the mappedPersonTitlePlusLookups
    this.mappedPersonTitlePlusLookups = [];
    // mapping the personTitlePluslookups to model needed to be sent to persontitle modal component
    if (this.personTitlePlusLookups) {
      const distinctPersonTitleIds = [];
      // removing duplicate person titleId in checkboxlevel
      this.personTitlePlusLookups.forEach((lookup, i) => {
        if (distinctPersonTitleIds.findIndex(record => record.personTitleId === lookup.personTitleId) === -1) {
          distinctPersonTitleIds.push(this.personTitlePlusLookups[i]);
        }
      });
      let distinctPersonTitleMoreInfo1Id = 0;
      // foreach uniquePersonitleId filtering those lookups which have same PersonTitleIds
      distinctPersonTitleIds.forEach((uniquePersonTitle => {
        const personTitleMoreinfo1Radio: CascadeCheckbox[] = [];
        const groupedPersonTitleIdRecords = this.personTitlePlusLookups.filter((lookup) => lookup.personTitleId === uniquePersonTitle.personTitleId);
        // from the groupedPersonTitleId filtering those lookups which have same personTitleMoreInfo1Id
        groupedPersonTitleIdRecords.forEach((item) => {
          const personTitleMoreinfoChildItems: CascadeCheckbox[] = [];
          // flag to prevent duplicate personTitleMoreInfo1Id
          const personTitleMoreInfo1Id = item.personTitleMoreInfo1Id;
          const groupedPersonTitleMoreInfo1Id = groupedPersonTitleIdRecords.filter((lookup) => {
            return lookup.personTitleMoreInfo1Id === personTitleMoreInfo1Id;
          });
          // for  each record in groupedPersonTitleMoreInfo1Id pushing personTitleMoreinfoChildItems
          groupedPersonTitleMoreInfo1Id.forEach((record) => {
            // radioboxes at level3
            personTitleMoreinfoChildItems.push({
              value: record.personTitleMoreInfo2Id,
              text: record.personTitleMoreInfo2,
              description: record.ptmi2HelpText,
              isChecked: false,
              isSingleSelect: true,
              childItems: null,
            });
          });
          // to make sure no duplicate personTitleMoreInfo1Id at Level2 Radioboxes
          if (item.personTitleMoreInfo1Id !== distinctPersonTitleMoreInfo1Id) {
            personTitleMoreinfo1Radio.push({
              value: item.personTitleMoreInfo1Id,
              text: item.personTitleMoreInfo1,
              description: item.ptmi1HelpText,
              isChecked: false,
              isSingleSelect: true,
              childItems: item.personTitleMoreInfo2Id ? personTitleMoreinfoChildItems : null
            });
          }
          // setting the distinctPersonTitleMoreInfo1Id to the personTitleMoreInfo1Id at the end of loop to prevent duplicates
          distinctPersonTitleMoreInfo1Id = item.personTitleMoreInfo1Id;
        });
        // checkboxes at level1
        const personTitle = {
          value: uniquePersonTitle.personTitleId,
          text: uniquePersonTitle.personTitle,
          description: uniquePersonTitle.personTitleHelpText,
          isChecked: false,
          isSingleSelect: false,
          childItems: uniquePersonTitle.personTitleMoreInfo1Id ? personTitleMoreinfo1Radio : null
        };
        // for each unique personTitle pushing to the mappedPersonTitlePlusLookups
        this.mappedPersonTitlePlusLookups.push(personTitle);
      }));
    }

    // this is to handle when PersonTitle is set to Owner
    if (this.setPersonTitleId && this.personTitlePlusLookups) {
      const ownerLookup = this.personTitlePlusLookups.filter(lookup => lookup.personTitleId === this.setPersonTitleId);
      const personTypeArray: PersonTitlePlusInfo[] = [ownerLookup[0]];
      const index = this.mappedPersonTitlePlusLookups.findIndex(mappedPersonTitle => mappedPersonTitle.value === this.setPersonTitleId);
      this.mappedPersonTitlePlusLookups[index].isChecked = true;
      this.displayPersonTitle = ownerLookup[0].personTitle;
      this.roleControl.setValue(personTypeArray);
    }
    // this is to handle onload of Personnel to preselect the checkboxes with existing persontitles
    if (this._personnel && this.mappedPersonTitlePlusLookups.length > 0) {
      this._personnel.personTitles.forEach(personTitle => {
        const index = this.mappedPersonTitlePlusLookups.findIndex(lookup => lookup.value === personTitle.personTitleId);
        if (index !== -1) {
          this.mappedPersonTitlePlusLookups[index].isChecked = true;
          const level1ChildItemIndex = this.mappedPersonTitlePlusLookups[index].childItems?.findIndex(radioLevel1 => radioLevel1.value === personTitle.personTitleMoreInfo1Id);
          if (level1ChildItemIndex !== undefined && level1ChildItemIndex !== -1) {
            const level2ChildItemIndex = this.mappedPersonTitlePlusLookups[index].childItems[level1ChildItemIndex].childItems?.findIndex(radioLevel2 => radioLevel2.value === personTitle.personTitleMoreInfo2Id);
            if (level2ChildItemIndex !== undefined && level2ChildItemIndex !== -1) {
              this.mappedPersonTitlePlusLookups[index].childItems[level1ChildItemIndex].childItems[level2ChildItemIndex].isChecked = true;
            }
            this.mappedPersonTitlePlusLookups[index].childItems[level1ChildItemIndex].isChecked = true;
          }
        }
      });
    }
    // to displayPersonTitles on load
    if (this._personnel) {
      this.personTitleArrayMap(this._personnel.personTitles);
    }
  }


  ngOnInit() {
    this.initializePersonnelFormGroup();
    if (this.personnel && this.personnel.personId) {
      if (this._personnel.phones && this._personnel.phones.length > 1) {
        const additionalPhones = this._personnel.phones.length - 1;
        for (let i = 0; i < additionalPhones; i++) {
          this.addPhoneFormGroup();
        }
      }
      if (this._personnel.emails && this._personnel.emails.length > 1) {
        const additionalEmails = this._personnel.emails.length - 1;
        for (let i = 0; i < additionalEmails; i++) {
          this.addEmailFormGroup();
        }
      }

      this.setPersonnelProfileFormValue(this._personnel);
    }

    this.customPickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          handler: (data: any) => {
            this.personnelForm.get('driverLicenseExpiryDate').reset();
          }
        },
        {
          text: 'Done',
          handler: (data: any) => {
            const date = data.year.text + '/' + data.month.text + '/' + data.day.text;
            this.personnelForm.get('driverLicenseExpiryDate').setValue(date);
          }
        }]
    };
  }
  // initializing PersonnelFormGroup validations
  private initializePersonnelFormGroup(): void {
    this.personnelProfileForm = this.formBuilder.group({
      personId: 0,
      name: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      ssn: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(12)]],
      personTitles: [[], Validators.required],
      driverLicense: [''],
      driverLicenseState: ['', [Validators.minLength(2), Validators.maxLength(2)]],
      driverLicenseExpiryDate: [null],
      providerId: 0,
      addresses: this.formBuilder.array([this.AddAddressFormGroup(this.primaryAddressType)]),
      phones: this.formBuilder.array([this.formBuilder.group(new BusinessPhone(this.cellPhoneType))], { updateOn: 'blur' }),
      emails: this.formBuilder.array([this.formBuilder.group(new BusinessEmail(this.primaryEmailType))], { updateOn: 'blur' })
    });
    this.formArraysValidator();
  }

  // set header value for actionsheets
  setActionSheetHeader(text: string) {
    return {
      header: text
    };
  }

  // initializing the personnelprofileform controls
  addPhoneFormGroup(event?) {
    if (event) {
      event.target.parentElement.hidden = true;
    }
    this.phones.push(this.formBuilder.group(new BusinessPhone()));
  }

  // remove phone form group with index
  removePhoneFormGroup(phoneIndex: number) {
    this.phones.removeAt(phoneIndex);
  }

  // initializing the personnelprofileform controls
  addEmailFormGroup(event?) {
    if (event) {
      event.target.parentElement.hidden = true;
    }
    this.emails.push(this.formBuilder.group(new BusinessEmail()));
  }

  // remove email form group with index
  removeEmailFormGroup(emailIndex: number) {
    this.emails.removeAt(emailIndex);
  }

  // if the personnel form exists,patch personnel
  setPersonnelProfileFormValue(personnel: Personnel) {
    if (personnel) {
      const nonNullPersonnel: Personnel = this.refactorNullValues(personnel);
      this.personnelProfileForm.patchValue(nonNullPersonnel);
      this.personTitleArrayMap(personnel.personTitles);
      const name = nonNullPersonnel.firstName + ' ' + nonNullPersonnel.middleName + ' ' + nonNullPersonnel.lastName;
      this.personnelProfileForm.controls.name.patchValue(name);
    } else {
      this.personnelProfileForm.reset();
      this.initializePersonnelFormGroup();
    }
  }

  private refactorNullValues(personnel: Personnel) {
    return {
      ...personnel,
      addresses: personnel.addresses && personnel.addresses.length ? personnel.addresses : [],
      phones: personnel.phones && personnel.phones.length ? personnel.phones : [],
      emails: personnel.emails && personnel.emails.length ? personnel.emails : []
    };
  }

  // to split full name
  convertFormValue(formValue) {
    this.undoPhoneNumberMasking(formValue);
    this.undoSSNNumberMasking(formValue);
    this.undoDLNumberMaksing(formValue);
    const formValueObj = JSON.parse(JSON.stringify(formValue));
    const name = JSON.parse(JSON.stringify(formValueObj.name));
    delete formValueObj.name;
    const convertedNameObj = this.splitFullName(name);
    formValueObj.providerId = this.providerId;
    // formValueObj.driverLicense = formValueObj.driverLicense.trim();
    this.roleControl.setValue(formValueObj.personTitles);

    return { ...convertedNameObj, ...formValueObj };
  }
  private undoPhoneNumberMasking(personnel): void {
    personnel.phones.forEach((phone) => {
      phone.phoneNumber = this.utlitiesService.replacePhoneNumber(phone.phoneNumber);
    });
  }
  private undoSSNNumberMasking(personnel): void {
    personnel.ssn = this.utlitiesService.replaceSSNNumber(personnel.ssn);
  }
  private undoDLNumberMaksing(personnel): void {
    personnel.driverLicense = this.utlitiesService.replaceDLNumber(personnel.driverLicense);
  }

  splitFullName(fullName: string): object {
    const names = fullName.split(' ');
    const vet = name => name ? name : '';
    return {
      firstName: vet(names.shift()),
      lastName: vet(names.pop()),
      middleName: vet(names.join(' '))
    };
  }
  // validate address
  validateAddress() {
    const addressesArr = (this.personnelProfileForm.controls.addresses as FormArray);
    const addressGroup = addressesArr.controls[0];
    if (addressGroup.dirty && addressGroup.value.streetAddress && addressGroup.value.city && addressGroup.value.state && addressGroup.value.zipCode) {
      this.callAddressValidator(addressGroup);
      //  this.addressGroup ? this.observeValueChanges(addressGroup) : this.callAddressValidator(addressGroup);
    }
  }

  observeValueChanges(addressGroup) {
    if (this.addressGroup.streetAddress !== addressGroup.value.streetAddress
      || this.addressGroup.city !== addressGroup.value.city
      || this.addressGroup.state !== addressGroup.value.state
      || this.addressGroup.zipCode !== addressGroup.value.zipCode) {
      this.callAddressValidator(addressGroup);
    }
  }

  callAddressValidator(addressGroup) {
    const reqPayload = { ...addressGroup.value };
    addressGroup.reset(reqPayload);
    this.applicationService.checkAddressValidation(reqPayload)
      .pipe(
        filter((res: AddressVerification[]) => Boolean(res && res.length)),
        map((res: AddressVerification[]) => res[0])
      )
      .subscribe((res: AddressVerification) => {
        console.log('res', res);
        addressGroup.patchValue({
          addressId: res.addressId,
          streetAddress: res.streetAddress,
          city: res.city,
          state: res.state,
          zipCode: res.zipCode,
          addressTypeId: res.addressTypeId,
          counties: res.counties,
          selectedCountyId: res.counties && res.counties.length ? res.counties[0].countyId : res.selectedCountyId,
          uspsBarcode: res.uspsBarcode,
        });
        this.addressGroup = JSON.parse(JSON.stringify(addressGroup.value));
        this.addressSelection(reqPayload, res, addressGroup);
      });
  }
  async addressSelection(request, response, formGroup: FormGroup) {
    const modal = await this.modalcontroller.create({
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
        const addressesArr = this.personnelProfileForm.controls.addresses as FormArray;
        const addressGroup = addressesArr.controls[0] as FormGroup;
        const name = 'streetAddress';
        const input: any = document.querySelector('input[name=streetAddress]');
        input.focus();

      } else {
        this.needFocus = false;
      }
    });
    return await modal.present();
  }

  // Validation Part
  markAsTouched() {
    this.markFormGroupTouched(this.personnelProfileForm);
  }

  // Drivers License Validation
  validateLicenseFormControls() {
    const driverLicense = this.personnelProfileForm.controls.driverLicense;
    const driverLicenseExpiryDate = this.personnelProfileForm.controls.driverLicenseExpiryDate;
    const driverLicenseState = this.personnelProfileForm.controls.driverLicenseState;
    const pattern = new RegExp('^[a-zA-Z][0-9]{12}$');
    const result = pattern.test(driverLicense.value);
    if (
      driverLicense.value &&
      (
        (driverLicense.value.length > 5 && driverLicense.value.length < 20 && driverLicenseState.value !== 'FL') ||
        (driverLicense.value.length === 13 && result && driverLicenseState.value === 'FL')
      )
      && driverLicenseExpiryDate.value
    ) {
      return true;
    }
    if (driverLicense.value) {
      if (driverLicenseState.value === 'FL') {
        driverLicense.setValidators([Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern('^[a-zA-Z][0-9]{12}$')]);
        driverLicenseState.setValidators([Validators.required]);
        driverLicenseExpiryDate.setValidators([Validators.required]);
      } else {
        driverLicense.setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(19)]);
        driverLicenseState.setValidators([Validators.required]);
        driverLicenseExpiryDate.setValidators([Validators.required]);
      }
    } else if (driverLicenseState.value) {
      if (driverLicenseState.value === 'FL') {
        driverLicenseExpiryDate.setValidators([Validators.required]);
        driverLicense.setValidators([Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern('^[a-zA-Z][0-9]{12}$')]);
      } else {
        driverLicense.setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(19)]);
        driverLicenseExpiryDate.setValidators([Validators.required]);
      }
      this.dlInvalid = false;
      return false;
    } else if (driverLicenseExpiryDate.value) {
      if (driverLicenseState.value === 'FL') {
        driverLicense.setValidators([Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern('^[a-zA-Z][0-9]{12}$')]);
      } else {
        driverLicense.setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(19)]);
      }
      driverLicenseState.setValidators([Validators.required]);
      this.dlInvalid = false;
      return false;
    } else {
      driverLicense.clearValidators();
      driverLicenseState.clearValidators();
      driverLicenseExpiryDate.clearValidators();
      this.dlInvalid = false;
      return true;
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (Object as any).values(formGroup.controls).forEach(control => {
      control.setValue(control.value);
    });
  }
  // address form group for address type ID
  private AddAddressFormGroup(addressTypeId?: number): FormGroup {
    return this.formBuilder.group(new BusinessAddress(addressTypeId));
  }

  private formArraysValidator() {
    this.addAddressFormValidator();
    this.addPhonesFormValidator();
    this.addEmailFormValidator();
  }

  private addAddressFormValidator() {
    const index = this.addresses.length - 1, isRequired = true;
    const addressesControls = (this.addresses.controls[index] as FormGroup).controls;
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
    addressesControls.streetAddress.setValidators(validatorArray);
    addressesControls.city.setValidators(validatorArray);
    addressesControls.state.setValidators(validatorArray);
    addressesControls.zipCode.setValidators(zipCodeValiatorArray);
  }

  private addPhonesFormValidator() {
    const index = this.phones.length - 1, isRequired = !!(index === 0);
    const phonesControls = (this.phones.controls[index] as FormGroup).controls;
    const validatorArray = [Validators.required, Validators.minLength(14), Validators.maxLength(14)];
    if (!isRequired) {
      validatorArray.shift();
    }
    phonesControls.phoneNumber.setValidators(validatorArray);
  }

  private addEmailFormValidator() {
    const index = this.emails.length - 1, isRequired = !!(index === 0);
    const emailsControls = (this.emails.controls[index] as FormGroup).controls;
    const validatorArray = [Validators.required, Validators.email];
    if (!isRequired) {
      validatorArray.shift();
    }
    emailsControls.emailAddress.setValidators(validatorArray);
  }

  // handler for selectPersonTitles click event
  selectPersonTitles() {
    if (this.mappedPersonTitlePlusLookups.length > 0) {
      this.createModal();
    }
  }
  // to display personTitles on load
  personTitleArrayMap(userChoiceArray: PersonTitlePlusInfo[]) {
    if (userChoiceArray.length === 1) {
      this.displayPersonTitle = '' + userChoiceArray[0].personTitle;
    } else if (userChoiceArray.length > 1 && userChoiceArray.length < 3) {
      this.displayPersonTitle = '' + userChoiceArray[0].personTitle + ', ' + userChoiceArray[1].personTitle;
    } else if (userChoiceArray.length >= 3) {
      let countMoreThanTwo = (userChoiceArray.length - 2).toString();
      countMoreThanTwo = ', +' + countMoreThanTwo;
      this.displayPersonTitle = '' + userChoiceArray[0].personTitle + ', ' + userChoiceArray[1].personTitle + countMoreThanTwo;
    }
  }

  // create modal for personTitles
  async  createModal() {
    const modal = await this.modalcontroller.create({
      component: ModalComponent,
      componentProps: {
        title: 'Person Title',
        lookups: this.mappedPersonTitlePlusLookups
      }

    });
    modal.onDidDismiss().then((data) => {
      this.userChoiceArray = [];
      if (data && data.data?.selectedLookups) {
        this.mappedPersonTitlePlusLookups = cloneDeep(data.data.selectedLookups);
        this.userChoiceArray = data.data.selectedLookups.filter(selectedLookup => selectedLookup.isChecked === true);
        if (this.userChoiceArray.length > 0) {
          this.userChoiceArray.forEach((record, i) => {
            if (record.childItems) {
              this.userChoiceArray[i].childItems = record.childItems.filter((level1ChildItem) => level1ChildItem.isChecked === true);
              if (record.childItems[0].childItems) {
                this.userChoiceArray[i].childItems[0].childItems = this.userChoiceArray[i].childItems[0].childItems.filter(item => item.isChecked === true);
              }
            }
          });
        }
      }
      const personTitlePlusArray: PersonTitlePlusInfo[] = [];
      if (this.userChoiceArray.length === 0) {
        this.roleControl.reset();
      } else {
        this.userChoiceArray.forEach((userChoice) => {
          if (userChoice && userChoice.childItems && userChoice.childItems[0].childItems) {
            const index = this.personTitlePlusLookups.findIndex(lookup => lookup.personTitleId === userChoice.value &&
              lookup.personTitleMoreInfo1Id === userChoice.childItems[0].value && lookup.personTitleMoreInfo2Id === userChoice.childItems[0].childItems[0].value);
            if (index !== -1) {
              personTitlePlusArray.push(this.personTitlePlusLookups[index]);
              this.roleControl.patchValue(personTitlePlusArray);
            }
          } else if (userChoice && userChoice.childItems && !userChoice.childItems[0].childItems) {
            const index = this.personTitlePlusLookups.findIndex(lookup => lookup.personTitleId === userChoice.value && lookup.personTitleMoreInfo1Id === userChoice.childItems[0].value);
            if (index !== -1) {
              personTitlePlusArray.push(this.personTitlePlusLookups[index]);
              this.roleControl.patchValue(personTitlePlusArray);
            }
          } else if (userChoice && !userChoice.childItems) {
            const index = this.personTitlePlusLookups.findIndex(lookup => lookup.personTitleId === userChoice.value);
            if (index !== -1) {
              personTitlePlusArray.push(this.personTitlePlusLookups[index]);
              this.roleControl.patchValue(personTitlePlusArray);
            }
          }
          this.roleControl.markAsDirty();
        });
      }
      if (personTitlePlusArray.length === 0) {
        const displayroles = document.querySelector('ion-input[name=displayroles]');
        // this.displayPersonTitle = '' + personTitlePlusArray[0].personTitle;
        displayroles.innerHTML = '';
      } else if (personTitlePlusArray.length === 1) {
        const displayroles = document.querySelector('ion-input[name=displayroles]');
        // this.displayPersonTitle = '' + personTitlePlusArray[0].personTitle;
        displayroles.innerHTML = '' + this.userChoiceArray[0].text;
      } else if (personTitlePlusArray.length > 1 && personTitlePlusArray.length < 3) {
        const displayroles = document.querySelector('ion-input[name=displayroles]');
        displayroles.innerHTML = '' + personTitlePlusArray[0].personTitle + ', ' + personTitlePlusArray[1].personTitle;
      } else if (personTitlePlusArray.length >= 3) {
        let countMoreThanTwo = (personTitlePlusArray.length - 2).toString();
        countMoreThanTwo = ', +' + countMoreThanTwo;
        const displayroles = document.querySelector('ion-input[name=displayroles]');
        displayroles.innerHTML = '' + personTitlePlusArray[0].personTitle + ', ' + personTitlePlusArray[1].personTitle + countMoreThanTwo;
      }
      console.log(this.roleControl.value);
    });

    return await modal.present();

  }
}

