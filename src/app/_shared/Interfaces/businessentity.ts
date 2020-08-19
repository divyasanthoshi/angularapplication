export interface Address {
    addressId?: number | null;
    addressTypeId: number | null;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: number | null;
    counties: County[] | null;
    selectedCountyId: number| null;
    isAddressChanged: boolean;
    uspsBarcode: string | null;
}

export interface County {
    countyId: number;
    county: string;
}

export interface Phone {
    uniquePhoneId?: number | null;
    phoneNumberTypeId: number | null;
    phoneNumber: number;
    phoneNumberExtension: number | null;
}

export interface Email {
    uniqueEmailId?: number | null;
    emailAddress: string;
    emailAddressTypeId?: number| null;
}

export interface AddressVerification extends Address {
    smartyStreetsFootNote: SmartyStreetsFootNote[] | null;
}

export interface SmartyStreetsFootNote {
    category: string | null;
    description: string | null;
    title: string | null;
    code: string | null;
}
