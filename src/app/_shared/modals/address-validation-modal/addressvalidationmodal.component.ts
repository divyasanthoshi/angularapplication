import { Component, OnInit, Input} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import {Address, AddressVerification} from '../../Interfaces/businessentity';



@Component({
  selector: 'app-modal',
  templateUrl: './addressvalidationmodal.component.html',
  styleUrls: ['../../../../stylesheet/modules/ion-modal.scss', './addressvalidationmodal.component.scss'],
})
export class AddressValidationModalComponent implements OnInit {
  @Input() enteredAddress: Address;
  @Input() suggestedAddress: AddressVerification;
  @Input() form: FormGroup;
  addressToBeUpdated: any ;
  hasMessages: boolean;
  hasinfo = true;
  hasErrors: boolean;
  correctedAddress = false;
  showMessages = false;
  isCityDiff = false;
  isStateDiff = false;
  isZipCodeDiff = false;
  isAddressChanged: boolean;
  constructor(private modalController: ModalController) { }

  // to dismiss the modal
  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
      needFocus: this.isAddressChanged,
      address: this.addressToBeUpdated
    });
  }
  ngOnInit() {
   //  to check if there are error messages
    if (this.suggestedAddress.smartyStreetsFootNote.map((note) => note.category) .indexOf('E') === 0) {
         this.hasErrors = true;
    } else {
      this.hasErrors = false;
    }
    // if (this.suggestedAddress.smartyStreetsFootNote.length === 0 || this.suggestedAddress.smartyStreetsFootNote.map((note) => note.category) .indexOf('A') === 0) {
    //    this.form.patchValue(this.suggestedAddress);
    //    this.form.get('selectedCountyId').reset( this.suggestedAddress.counties[0].countyId);
    // }
  }
  // populating the user choice in the providerprofileform
  public populateSuggestion(isAddressChanged: boolean) {
    this.isAddressChanged = !isAddressChanged;
    if (isAddressChanged === true) {
    this.addressToBeUpdated = this.suggestedAddress;
    this.addressToBeUpdated.streetAddress = this.enteredAddress.streetAddress;
    this.addressToBeUpdated.city = this.enteredAddress.city;
    this.addressToBeUpdated.state = this.enteredAddress.state;
    this.addressToBeUpdated.zipCode = this.enteredAddress.zipCode;
    this.addressToBeUpdated.isAddressChanged = isAddressChanged;
    if (this.suggestedAddress.counties.length === 1) {
    this.addressToBeUpdated.selectedCountyId = this.suggestedAddress.counties[0].countyId;
    }
    this.form.patchValue(this.addressToBeUpdated);
    } else {
      this.enteredAddress.isAddressChanged = isAddressChanged;
      this.addressToBeUpdated = this.enteredAddress;
      this.form.patchValue(this.enteredAddress);
    }
    this.dismiss();
  }

}
