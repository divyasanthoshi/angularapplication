import { Address } from '../_shared/Interfaces/businessentity';

// named as IForm because the conflict with Angular/Form library
export interface IForm {
    userId: number;
    formId: number;
    formStatusId: number;
    formTypeId: number;
    providerId: number;
    providerName: string;
    providerAddress: Address;
    statusUpdatedDateTime: Date;
    trackingNumber: number;
    personID: number;
    isArchived: boolean;
    statusList: History[];
}

export interface History {
    formStatusId: number;
    formStatusLabel: string;
    date: Date;
}

export interface FormLookups {
    lookupFormType: LookupFormType[];
    lookupFormStatus: LookupFormStatus[];
}
export interface LookupFormType {
    formTypeId: number;
    description: string;
}
export interface LookupFormStatus {
    formStatusId: number;
    formStatus: string;
    formType: string;
    formTypeId: number;
}




