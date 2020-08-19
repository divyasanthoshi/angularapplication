import { Injectable } from '@angular/core';
import { Organization } from 'src/app/application/application-interface';

@Injectable()
export class ProviderService {

  constructor() { }

  searchCorporation(docNum: string): Organization {
    const a = docNum;
    return {
      organizationId: 314629,
      abbreviation: '',
      name: 'KLC Academy LLC',
      documentNumber: 'L17000170351',
      fein: '822470623',
      organizationTypeId: 4,
      website: null,
      isDocumentNumberValid: true,
      mainAddress: {
        addressId: 100,
        addressTypeId: 2,
        streetAddress: '3982 West Palm Street',
        city: 'Palmbeach',
        state: 'FL',
        zipCode: 33172,
        counties: [],
        selectedCountyId: null,
        uspsBarcode: null,
        isAddressChanged: true,
    },
      status: 'Active',
      businessType: 'Florida Limited Liability Corporation',
      phone: {
          uniquePhoneId: 10320,
          phoneNumberTypeId: 2,
          phoneNumber: 4736289308,
          phoneNumberExtension: 0,
      },
      email: {
        uniqueEmailId: 101,
        emailAddress: 'actdfds@gmail.com',
        emailAddressTypeId: 2,
      },
      representative: 'Lia Winter'
    };
  }
}
