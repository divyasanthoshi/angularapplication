import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { cloneDeep } from 'lodash';
import { take, map, filter } from 'rxjs/operators';
import { AddressValidationModalComponent } from 'src/app/_shared/modals/address-validation-modal/addressvalidationmodal.component';
import { AddressType, EmailAddressType, PhoneType } from 'src/app/_shared/enum';
import { BusinessAddress, BusinessCounty, BusinessEmail, BusinessPhone } from 'src/app/_shared/models/businessentity';
import { Constant } from '../../_shared/constant';
import { ApplicationLookups, LookupPhoneType, Provider } from '../application-interface';
import { ApplicationService } from '../application.service';
import { UtilityService } from 'src/app/_core/services/utility.service';
import { AddressVerification } from 'src/app/_shared/Interfaces/businessentity';
import { Router } from '@angular/router';


@Component({
  selector: 'app-application-providerprofile',
  templateUrl: 'application-providerprofile.component.html',
  styleUrls: ['./application-providerprofile.component.scss'],
})

export class ApplicationProviderprofileComponent implements OnInit, OnChanges {
  // variables declared here
  public _provider: Provider;
  public phoneMask: any[] = Constant.maskPattern.phoneMask;
  public extensionMask: any[] = Constant.maskPattern.extensionMask;
  public doingBusiness = false;

  // intializing if provider exists for loading if provider exists
  @Input() set provider(provider: Provider) {
    this._provider = cloneDeep(provider);
  }
  // load application lookups
  @Input() applicationLookups: ApplicationLookups;
  @Input() programTypeId: number;
  @Input() licenseStatusId: number;
  // emit create and update events
  @Output() public create: EventEmitter<Provider> = new EventEmitter(null);
  @Output() public update: EventEmitter<Provider> = new EventEmitter(null);

  public providerForm: FormGroup;
  public get isDirty(): boolean {
    return this.providerForm.dirty;
  }
  public get isValid(): boolean {
    return this.providerForm.valid;
  }
  public needFocus: boolean;

  get phoneTypes(): LookupPhoneType[] {
    return this.applicationLookups.lookupPhoneType.filter(
      (phoneType) => phoneType.phoneNumberTypeId !== PhoneType.Landline && phoneType.phoneNumberTypeId !== PhoneType.Blank);
  }
  providerId: number;
  mainAddressType = AddressType.Main;
  landlinePhoneType = PhoneType.Landline;
  primaryEmailType = EmailAddressType.Main;
  currentUrl = this.router.url;
  // use as form array for address, phone and email
  get addresses(): FormArray {
    return this.providerForm.get('addresses') as FormArray;
  }
  get counties(): FormArray {
    return this.providerForm.get('counties') as FormArray;
  }
  get phones(): FormArray {
    return this.providerForm.get('phones') as FormArray;
  }
  get emails(): FormArray {
    return this.providerForm.get('emails') as FormArray;
  }
  doingBusinessLabel = 'Doing Business As (Optional)';

  constructor(
    private formBuilder: FormBuilder,
    private applicationService: ApplicationService,
    private utlitiesService: UtilityService,
    private modalcontroller: ModalController,
    private router: Router,
  ) { }


  // check and do the crud operations for provider
  public providerCrud() {
    const provider = this.getProviderFormValue();
    if (this._provider.providerId && this._provider.providerId !== 0) {
      this.update.emit(provider);
    } else {
      this.create.emit(provider);
    }
  }

  // get the provider form value and return
  public getProviderFormValue(): Provider {
    if (this._provider && this.providerForm) {
      this._provider = cloneDeep(this.providerForm.value);
      this.replacePhoneNumber();
    }
    return this._provider;
  }
  private replacePhoneNumber(): void {
    this._provider.phones.forEach((phone) => {
      phone.phoneNumber = this.utlitiesService.replacePhoneNumber(phone.phoneNumber);
    });
  }

  // set the value of forms and provider id if the provider value is valid
  ngOnChanges(changes: SimpleChanges) {
    if (this.providerForm && this._provider && this._provider.providerId !== 0) {
      if (this._provider.addresses && this._provider.addresses.length > 1) {
        if (this.providerForm.get('addresses').value.length !== this._provider.addresses.length) {
          const additionalAddresses = this._provider.addresses.length - 1;
          for (let i = 0; i < additionalAddresses; i++) {
            this.addAddressFormGroup();
          }
        }
      }
      if (this._provider.phones && this._provider.phones.length > 1) {
        if (this.providerForm.get('phones').value.length !== this._provider.phones.length) {
          const additionalPhones = this._provider.phones.length - 1;
          for (let i = 0; i < additionalPhones; i++) {
            this.addPhoneFormGroup();
          }
        }
      }
      if (this._provider.emails && this._provider.emails.length > 1) {
        if (this.providerForm.get('emails').value.length !== this._provider.emails.length) {
          const additionalEmails = this._provider.emails.length - 1;
          for (let i = 0; i < additionalEmails; i++) {
            this.addEmailFormGroup();
          }
        }
      }
      this.setProviderFormValue(this._provider);
      this.providerId = this._provider.providerId;
    }
  }

  // initializing the providerForm controls and validations
  ngOnInit() {

    this.providerForm = this.formBuilder.group({
      formId: 0,
      providerId: 0,
      providerNumber: '',
      licenseStatusId: this.licenseStatusId,
      licenseSubTypeId: 0,
      programTypeId: this.programTypeId,
      name: ['', [Validators.required]],
      dbaName: [''],
      website: [''],
      addresses: this.formBuilder.array(
        [this.buildAddress(this.mainAddressType)]),
      phones: this.formBuilder.array(
        [this.formBuilder.group(new BusinessPhone(this.landlinePhoneType))], { updateOn: 'blur' }),
      emails: this.formBuilder.array(
        [this.formBuilder.group(new BusinessEmail(this.primaryEmailType))], { updateOn: 'blur' }),
    });
    this.formArraysValidator();
  }

  // set header value for actionsheets
  setActionSheetHeader(text: string) {
    return {
      header: text
    };
  }

  // build address form group along with counties
  buildAddress(addressTypeId?: number) {
    const address = this.formBuilder.group(new BusinessAddress(addressTypeId));
    const counties = this.formBuilder.array([new BusinessCounty()]);
    address.setControl('counties', counties);
    return address;
  }

  // add address form group to the form
  addAddressFormGroup(event?) {
    if (event) {
      event.target.parentElement.hidden = true;
    }
    this.addresses.push(this.buildAddress());
    this.addAddressFormValidator();
  }

  // remove address form group with index
  removeAddressFormGroup(addressIndex: number, event: any) {
    this.addresses.removeAt(addressIndex);
  }

  // initializing the providerForm controls and validations
  addPhoneFormGroup(event?) {
    if (event) {
      event.target.parentElement.hidden = true;
    }
    this.phones.push(this.formBuilder.group(new BusinessPhone()));
    this.addPhonesFormValidator();
  }

  // remove phone form gropu with index
  removePhoneFormGroup(phoneIndex: number, event: any) {
    this.phones.removeAt(phoneIndex);
  }

  // initializing the providerForm controls and validations
  addEmailFormGroup(event?) {
    if (event) {
      event.target.parentElement.hidden = true;
    }
    this.emails.push(this.formBuilder.group(new BusinessEmail()));
    this.addEmailFormValidator();
  }

  // remove email form group with index
  removeEmailFormGroup(emailIndex: number, event: any) {
    this.emails.removeAt(emailIndex);
  }

  // if the provider form exists,patch provider
  setProviderFormValue(provider: Provider) {
    this.providerForm.patchValue(provider);
  }

  // set value for program type and license type
  setProgramTypeIdAndLicenseStatusId(programTypeId: number, licenseStatusId: number) {
    if (programTypeId !== 0 && licenseStatusId !== 0) {
      this.providerForm.patchValue({
        programTypeId,
        licenseStatusId
      });
    }
  }

  // Validation of Address API
  validateAddress(addressIndex: number) {
    const addressesArr = this.providerForm.controls.addresses as FormArray;
    const addressGroup = addressesArr.controls[addressIndex] as FormGroup;
    if (addressGroup.dirty && addressGroup.value.streetAddress && addressGroup.value.city && addressGroup.value.state && addressGroup.value.zipCode) {
      this.callAddressValidator(addressGroup, addressIndex);
    }
  }

  callAddressValidator(addressGroup: FormGroup, i: number) {
    const reqPayload = { ...addressGroup.value };
    // reset to set the dirty to false
    addressGroup.reset(reqPayload);
    this.applicationService.checkAddressValidation(reqPayload).pipe(filter((res: AddressVerification[]) => Boolean(res && res.length)), map(res => res[0])).subscribe((res: AddressVerification) => {
      // console.log('res', res);
      if (res.smartyStreetsFootNote && (res.smartyStreetsFootNote.length === 0 || res.smartyStreetsFootNote.map((note) => note.category).indexOf('A') === 0)) {
        addressGroup.patchValue(res);
        if (res.counties && res.counties.length === 1) {
          addressGroup.get('selectedCountyId').reset(res.counties[0].countyId);
        } else if (res.counties && res.counties.length > 1) {
          const array = addressGroup.get('counties').value;
          array.pop();
          res.counties.forEach(county => array.push(county));
        }
      }
      // creating the address modal pop up
      this.addressSelection(reqPayload, res, addressGroup, i);
    });
  }

  // Validation Part
  markAsTouched() {
    this.markFormGroupTouched(this.providerForm);
  }

  // event to change the phone type
  changePhoneType(event: any) {
    // hide extension section for other phone types other than landline
    // const hideExt = event.target.value === PhoneType.Landline;
    // if (hideExt) {
    //   event.target.parentElement.parentElement.nextElementSibling.nextElementSibling.hidden = false;
    // } else {
    //   event.target.parentElement.parentElement.nextElementSibling.nextElementSibling.hidden = true;
    // }
  }

  private markFormGroupTouched(formGroup: FormGroup) {

    (Object as any).values(formGroup.controls).forEach(control => {
      control.setValue(control.value);
    });
  }
  async addressSelection(request, response, formGroup: FormGroup, i: number) {
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
        const addressesArr = this.providerForm.controls.addresses as FormArray;
        const addressGroup = addressesArr.controls[i] as FormGroup;
        // addressGroup.controls.streetAddress.nativeElement.focus()
        const name = 'streetAddress' + i;
        if (name === 'streetAddress0') {
          const input: any = document.querySelector('input[name=streetAddress0]');
          input.focus();
        } else if (name === 'streetAddress1') {
          const input: any = document.querySelector('input[name=streetAddress1]');
          input.focus();
        }

      } else {
        this.needFocus = false;
      }
    });
    return await modal.present();
  }

  // Validation part
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

  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  updateDoingBusinessLabel() {
    const dbaName = this.providerForm.get('dbaName').value;
    if (dbaName) {
      this.doingBusinessLabel = 'Doing Business As';
    } else {
      this.doingBusinessLabel = 'Doing Business As (Optional)';
    }
  }

}


