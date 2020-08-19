import { Address, Phone, Email } from '../_shared/Interfaces/businessentity';
import { FormLookups } from '../forms/forms-interface';
import { ProgressStatusEnum } from '../_shared/enum';

export interface Provider {
    formId: number;
    providerId?: number | null;
    providerNumber?: string | null;
    programTypeId: number | null;
    licenseStatusId: number | null;
    licenseSubTypeId: number | null;
    name: string;
    dbaName: string;
    addresses: Address[];
    phones: Phone[];
    emails: Email[];
    website: string;
}

export interface IForm {
    userId: number;
    formId: number;
    formStatusId: number;
    formTypeId: number;
    providerId: number;
    providerName: string;
    providerAddress: Address;
    statusUpdatedDateTime: Date;
    lastViewedDateTime: Date;
    lastModifiedDateTime: Date;
    trackingNumber: number;
    personID: number;
    isArchieved: boolean;
    statusList: History[];
}

export interface Personnel {
    [x: string]: any;
    providerId: number | null;
    personId?: number | null;
    firstName: string;
    middleName: string;
    lastName: string;
    dob: Date | null;
    ssn: string;
    personTitles: PersonTitlePlusInfo[] | null;
    addresses: Address[];
    phones: Phone[];
    emails: Email[];
    driverLicense: string | null;
    driverLicenseState: string | null;
    driverLicenseExpiryDate: Date | null;
}

export interface ApplicationLookups {
    lookupPhoneType: LookupPhoneType[];
    lookupEmailAddressType: LookupEmailAddressType[];
    lookupPersonType: LookupPersonType[];
    lookupState: LookupState[];
    lookupOrganizationType: LookupOrganizationType[];
    lookupAddressType: LookupAddressType[];
    lookupOwnership: LookupOwnershipType[];
    lookupPersonTitlePlus: LookupPersonTitlePlus[];
    lookupServiceType: LookupServiceType[];
    lookupMonthsOfOperation: LookupMonthsOfOperation[];
    lookupReasonForSeverance: LookupReasonForSeverance[];
}

export interface LookupMonthsOfOperation {
    monthsOfOperationId: number;
    description: string;
}
export interface LookupServiceType {
    serviceId: number;
    description: string;
}

export interface Ownership {
    ownershipTypeId: number | null;
    organization: Organization | null;
    isIncorporated: boolean;
}

export interface LookupPhoneType {
    phoneNumberTypeId: number;
    description: string;
}

export interface LookupEmailAddressType {
    emailAddressTypeId: number;
    description: string;
}

export interface LookupAddressType {
    addressTypeId: number;
    description: string;
}

export interface LookupPersonType {
    personTypeId: number;
    personType: string;
}

export interface LookupState {
    statecode: string;
    state: string;
}

export interface LookupOrganization {
    organizationId: number;
    abbreviation: string;
    name: string;
    documentNumber: string;
    fein: string;
    organizationTypeId: number;
    website: string;
    isDocumentNumberValid: boolean;
}

export interface Organization extends LookupOrganization {
    mainAddress: Address;
    status: string;
    businessType: string;
    phone: Phone;
    email: Email;
    representative: string;
}

export interface LookupOrganizationType {
    organizationTypeId: number;
    description: string;
}

export interface LookupOwnershipType {
    ownershipTypeId: number;
    description: string;
}

export interface LookupReasonForSeverance {
    reasonForSeveranceId: number;
    reason: string;
}

export interface IErrConfig {
    title: string;
    description: string;
    listItem: string[];
}

export interface LookupPersonTitlePlus {
    programTypeId: number;
    programType: string;
    personTitlePlusId: number;
    personTitleId: number;
    personTitle: string;
    personTitleHelpText: string;
    personTitleMoreInfo1Id: number;
    personTitleMoreInfo1: string;
    ptmi1HelpText: string;
    personTitleMoreInfo2Id: number;
    personTitleMoreInfo2: string;
    ptmi2HelpText: string;
}

export interface PersonTitlePlusInfo {
    programTypeId: number;
    programType: string;
    personTitlePlusId: number;
    personTitleId: number;
    personTitle: string;
    personTitleHelpText: string;
    personTitleMoreInfo1Id: number;
    personTitleMoreInfo1: string;
    ptmi1HelpText: string;
    personTitleMoreInfo2Id: number;
    personTitleMoreInfo2: string;
    ptmi2HelpText: string;
}

export interface Service {
    serviceId: number;
}

export interface Services {
    providerId: number;
    serviceList: Service[];

}

export interface ServiceList {
    serviceId: number;
    title: string;
    description: string;
    isChecked: boolean;
    imagePath: string;
}

export interface TimeSlot {
    timeOpen: string;
    timeClose: string;
}

export interface BusinessDays {
    dayOfWeekId: number;
    dayOfWeek: string;
    timeSlot: TimeSlot[];
}

export interface MonthsOfOperationType {
    monthsOfOperationId: number;
    monthsOfOperation: string;
    businessDays: BusinessDays[];
}

export interface BusinessHours {
    providerId: number | null;
    monthsOfOperation: MonthsOfOperationType[];
}

export interface EmploymentDetails {
    formId: number;
    // providerId: number;
    personId: number;
    employmentHistoryByApplicantId: number;
    personName: string;
    isEmployed: boolean;
    isCurrent: boolean;
    startDate: string;
    endDate: string;
    employerName: string;
    positionHeld: string;
    employerStreetAddress: string;
    employerCity: string;
    employerState: string;
    employerZipCode: number;
    employerPhone: number;
    employerPhoneExtn: number | null;
    employerEmail: string;
    employerWebsite: string;
    supervisorName: string;
    supervisorPhone: number;
    supervisorPhoneExtn: number | null;
    supervisorEmail: string;
    reasonForSeveranceId: number;
    reason: string;
    reasonForSeveranceDescription: string | null;
    jobDuties: string;
    formStatusId: number;
    formStatus: string;
    formSignedBy: string;
    formSignedByPersonId: number;
    formSignedDate: Date;
    employmentHistoryAttachmentCount: number;
}

export interface UnEmploymentDetails {
    formId: number;
    // providerId: number;
    personId: number;
    employmentHistoryByApplicantId: number;
    personName: string;
    isEmployed: boolean;
    isCurrent: boolean;
    startDate: string;
    endDate: string;
    formStatusId: number;
    formStatus: string;
    employmentHistoryAttachmentCount: number;
}

export interface EmploymentHistory {
    personId: number;
    personName: string;
    employmentHistoryDetails: EmploymentInfo[];
}


export interface EmploymentInfo {
    employmentHistoryByApplicantId: number;
    formId: number;
    isEmployed: boolean;
    isCurrent: boolean;
    employerName: string;
    startDate: string;
    endDate: string;

}

export interface Documents {
    employmentHistory: EmploymentHistory;
    employmentDetails: EmploymentDetails;
    unemploymentDetails: UnEmploymentDetails;
    agmc: AttestationOfGoodMoralCharacter;
    peopleDocuments: DocumentsPeople;
    listOfDocuments: ListOfDocuments;
    childAbuseReportingDetails: ChildAbuseReportingDetails;
    zoningAttestationSourceList: ZoningAttestationSourceList;
    selfAttestationDetails: SelfAttestationDetails;
}

export interface AttestationOfGoodMoralCharacter {
    personId: number;
    formId: number;
    personName: string;
    formStatusId: number;
    formStatus: string;
    hasCommittedOffence: boolean;
    formSignedByPersonId: number;
    formSignedBy: string;
    formSignedDate: Date;
    attachmentCount: number;
}

export interface ListOfDocuments {
    formList: DocumentsList[];
}

export interface ChildAbuseReportingDetails {
    formId: number;
    providerId?: number;
    providerName?: string;
    personId?: number;
    personName?: string;
    formTypeId?: number;
    formTypeLabel?: string;
    formStatusId: number;
    formStatusLabel?: string;
    formSignedBy: string;
    formSignedByPersonId: number;
    formSignedDate: string;
    attachmentCount?: number;
}

export interface DocumentsList {
    formTypeId: number;
    formTypeLabel: string;
    notes: string;
    isValidated: boolean;
}

export interface DocumentsPeople {
    // providerId: number;
    formTypeId: number;
    formTypeLabel: string;
    formList: FormList[];
}

export interface FormList {
    formId: number;
    formStatusId: number;
    formStatus: string;
    personName: string;
    personId: number;
    showPersonHistory?: boolean;
}

export interface LookupZoningAttestationSource {
    zoningAttestationSourceId: number;
    description: string;
}

export interface ZoningAttestationDetail {
        formId: number;
        providerId: number;
        personId: number;
        personName: string;
        formSignedBy: string;
        formSignedByPersonId: number;
        formSignedDate: Date;
        attachmentCount: number;
        formStatusId: number;
        formStatus: string;
        zoningAttestationSourceId: number;
        zoningAttestationSource: string;
}

export interface ZoningAttestationSourceList {
    lookupZoningAttestationSource: LookupZoningAttestationSource[];
    zoningAttestationDetail: ZoningAttestationDetail;
}

export interface SelfAttestationDetails {
    formId?: number;
    providerId: number;
    personId?: number;
    providerName?: string;
    personName?: string;
    formSignedBy: string;
    formSignedByPersonId: number;
    formSignedDate: string;
    attachmentCount?: number;
    formStatusId?: number;
    formStatus?: string;
    zoningAttestationSourceId?: number;
    zoningAttestationSource?: string;
}

export interface ProgressStatus {
    status: ProgressStatusEnum;
    percentage?: number;
  }

