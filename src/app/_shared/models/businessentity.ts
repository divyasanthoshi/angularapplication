import { County, Address, Phone, Email } from '../Interfaces/businessentity';



export class BusinessAddress implements Address {

    addressId = 0;
    addressTypeId = 0;
    streetAddress = '';
    city = '';
    state = '';
    zipCode = null;
    counties = [];
    selectedCountyId = null;
    uspsBarcode = '';
    isAddressChanged = true;
    constructor(addressTypeId: number = 0) {
        if (addressTypeId !== 0) {
            this.addressTypeId = addressTypeId;
        }
    }
}


export class BusinessPhone implements Phone {

    uniquePhoneId = 0;
    phoneNumberTypeId = 0;
    phoneNumber = null;
    phoneNumberExtension = null;

    constructor(phoneTypeId: number = 0) {
        this.phoneNumberTypeId = phoneTypeId;
    }
}

export class BusinessEmail implements Email {
    uniqueEmailId = 0;
    emailAddress = '';
    emailAddressTypeId = 0;

    constructor(emailAddressTypeId: number = 0) {
        this.emailAddressTypeId = emailAddressTypeId;
    }
}

export class BusinessCounty implements County {
    countyId = 0;
    county = '';
}


