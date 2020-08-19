
export interface RecommendationInfo {
    label: string;
    agencyName: string;
    website: string;
    programTypeId?: number;
    licenseStatusId?: number;
    personContacts: PersonContact[];
    childrenRangeId: number;
    isDisabledCare: any;
    isRecommended: boolean;
    propertyTypeId: number;
    recommendationDescription: string;
    zipcode: number;
}

export interface Questionnaire {
    propertyTypeId: number | null;
    zipcode: number | null;
    childrenRangeId: number;
    isDisabledCare: boolean | null;
}

export interface LookupPropertyType {
    propertyTypeId: number;
    description: string;
}

export interface LookupZipcode {
    zipCode: string;
}

export interface LookupChildrenRange {
    childrenCountId: number;
    description: string;
}


export interface LookupQuestionnaire {
    lookupPropertyType: LookupPropertyType[];
    lookupZipCode: LookupZipcode[];
    lookupChildrenRange: LookupChildrenRange[];
}

export interface PersonContact {
    personId: number;
    name: string;
    address: string;
    phoneNumber: number;
    email: string;
    personTitle: string;
}

export interface LinkDescription {
    [key: string]: {
        title: string,
        description: string,
        counties: {
            countyName: string,
            personName: string,
            personAddress: string,
            personAddress2: string,
            personTelephone: string,
            personEmail: string
        }[]
    };
}
