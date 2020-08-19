import { Action } from '@ngrx/store';
import {
    ApplicationLookups, Organization, Ownership,
    Personnel, Provider, LookupPersonTitlePlus, Services,
    BusinessHours, ListOfDocuments, DocumentsPeople, EmploymentDetails,
    EmploymentHistory, UnEmploymentDetails, ChildAbuseReportingDetails, ZoningAttestationSourceList,
    SelfAttestationDetails
        // IForm
} from '../application-interface';
import {IForm, FormLookups} from '../../forms/forms-interface';


/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum ActionTypes {
    LoadSampleOwnership = '[Application] LoadSampleOwnership',
    LoadSampleProvider = '[Application] LoadSampleProvider',
    LoadSamplePeople = '[Application] LoadSamplePeople',
    //#region Provider
    LoadProviderId = '[Application] LoadProviderId',
    CreateProvider = '[Application] CreateProvider',
    CreateProviderSuccess = '[Application] CreateProviderSuccess',
    CreateProviderFail = '[Application] CreateProviderFail',
    SetCurrentProviderId = '[Application] SetCurrentProviderId',
    SetProvider = '[Application] SetProvider',
    UpdateProvider = '[Application] UpdateProvider',
    UpdateProviderSuccess = '[Application] UpdateProviderSuccess',
    UpdateProviderFail = '[Application] UpdateProviderFail',
    checkAddress = '[Application] checkAddress ',
    DeleteProvider = '[Application] DeleteProvider',
    DeleteProviderSuccess = '[Application] DeleteProviderSuccess',
    DeleteProviderFail = '[Application] DeleteProviderFail',
    LoadProvider = '[Application] LoadProvider',
    LoadProviderSuccess = '[Application] LoadProviderSuccess',
    LoadProviderFail = '[Application] LoadProviderFail',
    //#endregion Provider

    //#region People
    CreatePersonnel = '[Application] CreatePersonnnel',
    CreatePersonnelSuccess = '[Application] CreatePersonnelSuccess',
    CreatePersonnelFail = '[Application] CreatePersonnelFail',
    UpdatePersonnel = '[Application] UpdatePersonnel',
    UpdatePersonnelSuccess = '[Application] UpdatePersonnelSuccess',
    UpdatePersonnelFail = '[Application] UpdatePersonnelFail',
    LoadPeople = '[Application] LoadPeople',
    LoadPeopleSuccess = '[Application] LoadPeopleSuccess',
    LoadPeopleFail = '[Application] LoadPeopleFail',
    LoadPersonnel = '[Application] LoadPersonnel',
    LoadPersonnelSuccess = '[Application] LoadPersonnelSuccess',
    LoadPersonnelFail = '[Application] LoadPersonnelFail',
    SetCurrentPersonnelId = '[Application] SetCurrentPersonnel',
    SetPersonnel = '[Application] SetPersonnel',
    ResetCurrentPersonId = '[Application] ResetCurrentPerson',
    DeletePerson = '[Application] DeletePerson',
    DeletePersonSuccess = '[Application] DeletePersonSuccess',
    DeletePersonFail = '[Application] DeletePersonFail',
    LoadPersonTitlePlusLookups = '[Application] LoadPersonTitlePlusLookups',
    LoadPersonTitlePlusLookupsSuccess = '[Application] LoadPersonTitlePlusLookupsSuccess',
    LoadPersonTitlePlusLookupsFail = '[Application] LoadPersonTitlePlusLookupsFail',
    //#endregion People

    //#region Ownership
    LoadOwnership = '[Application] LoadOwnership',
    LoadOwnershipSuccess = '[Application] LoadOwnershipSuccess',
    LoadOwnershipFail = '[Application] LoadOwnershipFail',
    SetIsIncorporated = '[Application] SetIsIncorporated',
    SetOrganization = '[Application] SetOrganization',
    SetOwnershipTypeId = '[Application] SetOwnershipTypeId',
    SetOwnerIds = '[Application] SetOwnerIds',
    SetOwnership = '[Application] SetOwnership',
    SetDocumentNumber = '[Application] SetDocumentNumber',
    ClearOwnhershipType = '[Application] ClearOwnhershipType',
    ClearOwnerIds = '[Application] ClearOwnerIds',
    ClearOrganization = '[Application] ClearOrganization',
    UpdateOwnership = '[Application] UpdateOwnership',
    UpdateOwnershipSuccess = '[Application] UpdateOwnershipSuccess',
    UpdateOwnershipFail = '[Application] UpdateOwnershipFail',
    CreateOwnership = '[Application] CreateOwnership',
    CreateOwnershipSuccess = '[Application] CreateOwnershipSuccess',
    CreateOwnershipFail = '[Application] CreateOwnershipFail',
    //#endregion Ownership

    //#region Application
    LoadApplicationLookups = '[Application] LoadApplicationLookups',
    LoadApplicationLookupsSuccess = '[Application] LoadApplicationLookupsSuccess',
    LoadApplicationLookupsFail = '[Application] LoadApplicationLookupsFail',
    //#endregion Application

     //#region Application
     LoadFormLookups = '[Application] LoadFormLookups',
     LoadFormLookupsSuccess = '[Application] LoadFormLookupsSuccess',
     LoadFormLookupsFail = '[Application] LoadFormLookupsFail',
     //#endregion Application

    //#region Services
    LoadServices = '[Application] LoadServices',
    LoadServicesSuccess = '[Application] LoadServicesSuccess',
    LoadServicesFail = '[Application] LoadServicesFail',
    CreateServices = '[Application] CreateServices',
    CreateServicesSuccess = '[Application] CreateServicesSuccess',
    CreateServicesFail = '[Application] CreateServicesFail',
    UpdateServices = '[Application] UpdateServices',
    UpdateServicesSuccess = '[Application] UpdateServicesSuccess',
    UpdateServicesFail = '[Application] UpdateServicesFail',
    //#endregion Services

    //#region BusinessHours
    CreateBusinessHours = '[Application] CreateBusinessHours',
    CreateBusinessHoursSuccess = '[Application] CreateBusinessHoursSuccess',
    CreateBusinessHoursFail = '[Application] CreateBusinessHoursFail',
    UpdateBusinessHours = '[Application] UpdateBusinessHours',
    UpdateBusinessHoursSuccess = '[Application] UpdateBusinessHoursSuccess',
    UpdateBusinessHoursFail = '[Application] UpdateBusinessHoursFail',
    LoadBusinessHours =  '[Application] LoadBusinessHours',
    LoadBusinessHoursSuccess =  '[Application] LoadBusinessHoursSuccess',
    LoadBusinessHoursFail =  '[Application] LoadBusinessHoursFail',
    //#endregion BusinessHours

     //#region EmploymentHistory
     LoadEmploymentHistory = '[Application] LoadEmploymentHistory',
     LoadEmploymentHistorySuccess = '[Application] LoadEmploymentHistorySuccess',
     LoadEmploymentHistoryFail = '[Application] LoadEmploymentHistoryFail',
     SetCurrentEmploymentHistoryByApplicantlId = '[Application] SetCurrentEmploymentHistoryByApplicantlId',
     ResetCurrentEmploymentHistoryByApplicantId = '[Application] ResetCurrentEmploymentHistoryByApplicantId',
     SetCurrentEmploymentHistoryFormId = '[Application] SetCurrentEmploymentHistoryFormId',
      //#endregion EmploymentHistory

      //#region EmploymentDetails
      CreateEmploymentDetails = '[Application] CreateEmploymentDetails',
      CreateEmploymentDetailsSuccess = '[Application] CreateEmploymentDetailsSuccess',
      CreateEmploymentDetailsFail = '[Application] CreateEmploymentDetailsFail',
      CreateUnEmploymentDetails = '[Application] CreateUnEmploymentDetails',
      CreateUnEmploymentDetailsSuccess = '[Application] CreateUnEmploymentDetailsSuccess',
      CreateUnEmploymentDetailsFail = '[Application] CreateUnEmploymentDetailsFail',
      UpdateEmploymentDetails = '[Application] UpdateEmploymentDetails',
      UpdateEmploymentDetailsSuccess = '[Application] UpdateEmploymentDetailsSuccess',
      UpdateEmploymentDetailsFail = '[Application] UpdateEmploymentDetailsFail',
      UpdateUnEmploymentDetails = '[Application] UpdateUnemploymentDetails',
      UpdateUnEmploymentDetailsSuccess = '[Application] UpdateUnemploymentDetailsSuccess',
      UpdateUnEmploymentDetailsFail = '[Application] UpdateUnemploymentDetailsFail',
      LoadEmploymentDetail = '[Application] LoadEmploymentDetail',
      LoadEmploymentDetailSuccess = '[Application] LoadEmploymentDetailSuccess',
      LoadEmploymentDetailFail = '[Application] LoadEmploymentDetailFail',
      LoadUnEmploymentDetail = '[Application] LoadUnEmploymentDetail',
      LoadUnEmploymentDetailSuccess = '[Application] LoadUnEmploymentDetailSuccess',
      LoadUnEmploymentDetailFail = '[Application] LoadUnEmploymentDetailFail',
      DeleteEmploymentDetail = '[Application] DeleteEmploymentDetail',
      DeleteEmploymentDetailSuccess = '[Application] DeleteEmploymentDetailSuccess',
      DeleteEmploymentDetailFail = '[Application] DeleteEmploymentDetailFail',
      DeleteUnEmploymentDetail = '[Application] DeleteUnEmploymentDetail',
      DeleteUnEmploymentDetailSuccess = '[Application] DeleteUnEmploymentDetailSuccess',
      DeleteUnEmploymentDetailFail = '[Application] DeleteUnEmploymentDetailFail',
    //#endregion BusinessHours

    //#region Documents
    LoadListOfDocuments =  '[Application] LoadListOfDocuments',
    LoadListOfDocumentsSuccess =  '[Application] LoadListOfDocumentsSuccess',
    LoadListOfDocumentsFail = '[Application] LoadListOfDocumentsFail',
    //#endregion Documents

    //#region People Documents
    LoadPeopleDocuments=  '[Application] LoadPeopleDocuments',
    LoadPeopleDocumentsSuccess =  '[Application] LoadPeopleDocumentsSuccess',
    LoadPeopleDocumentsFail =  '[Application] LoadPeopleDocumentsFail',
    //#endregion People Documents

    // #region agmc
    CreateAGMCDetails = '[Application] CreateAGMCDetails',
    CreateAGMCDetailsSuccess = '[Application] CreateAGMCDetailsSuccess',
    CreateAGMCDetailsFail = '[Application] CreateAGMCDetailsFail',
    UpdateAGMCDetails = '[Application] UpdateAGMCDetails',
    UpdateAGMCDetailsSuccess = '[Application] UpdateAGMCDetailsSuccess',
    UpdateAGMCDetailsFail = '[Application] UpdateAGMCDetailsFail',
    LoadAGMCDetails = '[Application] LoadAGMCDetails',
    LoadAGMCDetailsSuccess = '[Application] LoadAGMCDetailsSuccess',
    LoadAGMCDetailsFail = '[Application] LoadAGMCDetailsFail',
    SetAttestationOfGoodMoralCharacterFormId = '[Application] SetAttestationOfGoodMoralCharacterFormId',
    //#endregion agmc

    // #region Child Abuse Reporting Details
    CreateChildAbuseReportingDetail = '[Application] CreateChildAbuseReportingDetail',
    CreateChildAbuseReportingDetailSuccess = '[Application] CreateChildAbuseReportingDetailSuccess',
    CreateChildAbuseReportingDetailFail = '[Application] CreateChildAbuseReportingDetailFail',
    UpdateChildAbuseReportingDetail = '[Application] UpdateChildAbuseReportingDetail',
    UpdateChildAbuseReportingDetailSuccess = '[Application] UpdateChildAbuseReportingDetailSuccess',
    UpdateChildAbuseReportingDetailFail = '[Application] UpdateChildAbuseReportingDetailFail',
    LoadChildAbuseReportingDetail = '[Application] LoadChildAbuseReportingDetail',
    LoadChildAbuseReportingDetailSuccess = '[Application] LoadChildAbuseReportingDetailSuccess',
    LoadChildAbuseReportingDetailFail = '[Application] LoadChildAbuseReportingDetailFail',
    // #endregion Child Abuse Reporting Details

    // #region load Zoning Attestation Source List
    LoadZoningAttestationSourceList = '[Application] LoadZoningAttestationSourceList',
    LoadZoningAttestationSourceListSuccess = '[Application] LoadZoningAttestationSourceListSuccess',
    LoadZoningAttestationSourceListFail = '[Application] LoadZoningAttestationSourceListFail',
    // #endregion load Zoning Attestation Source List

    // #region load Zoning Attestation Detail
    LoadZoningAttestationDetail = '[Application] LoadZoningAttestationDetail',
    LoadZoningAttestationDetailSuccess = '[Application] LoadZoningAttestationDetailSuccess',
    LoadZoningAttestationDetailFail = '[Application] LoadZoningAttestationDetailFail',
    // #endregion load Zoning Attestation Detail

    // #region Self Attestation Details
    CreateSelfAttestationDetail = '[Application] CreateSelfAttestationDetail',
    CreateSelfAttestationDetailSuccess = '[Application] CreateSelfAttestationDetailSuccess',
    CreateSelfAttestationDetailFail = '[Application] CreateSelfAttestationDetailFail',
    UpdateSelfAttestationDetail = '[Application] UpdateSelfAttestationDetail',
    UpdateSelfAttestationDetailSuccess = '[Application] UpdateSelfAttestationSuccess',
    UpdateSelfAttestationDetailFail = '[Application] UpdateSelfAttestationDetailFail',
    LoadSelfAttestationDetail = '[Application] LoadSelfAttestationDetail',
    LoadSelfAttestationDetailSuccess = '[Application] LoadSelfAttestationDetailSuccess',
    LoadSelfAttestationDetailFail = '[Application] LoadSelfAttestationDetailFail',
    // #endregion Self Attestation Details
 }

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadSampleOwnership implements Action {
    readonly type = ActionTypes.LoadSampleOwnership;
}

export class LoadSampleProvider implements Action {
    readonly type = ActionTypes.LoadSampleProvider;
}

export class LoadSamplePeople implements Action {
    readonly type = ActionTypes.LoadSamplePeople;
}

export class CreatePersonnel implements Action {
    readonly type = ActionTypes.CreatePersonnel;

    constructor(public payload: Personnel) { }
}

export class CreatePersonnelSuccess implements Action {
    readonly type = ActionTypes.CreatePersonnelSuccess;

    constructor(public payload: Personnel) { }
}

export class CreatePersonnelFail implements Action {
    readonly type = ActionTypes.CreatePersonnelFail;

    constructor(public payload: string) { }
}

export class UpdatePersonnel implements Action {
    readonly type = ActionTypes.UpdatePersonnel;

    constructor(public payload: Personnel) { }
}

export class UpdatePersonnelSuccess implements Action {
    readonly type = ActionTypes.UpdatePersonnelSuccess;

    constructor(public payload: Personnel) { }
}

export class UpdatePersonnelFail implements Action {
    readonly type = ActionTypes.UpdatePersonnelFail;

    constructor(public payload: string) { }
}

export class LoadPeople implements Action {
    readonly type = ActionTypes.LoadPeople;
    constructor(public payload: number) { }
}

export class LoadPeopleSuccess implements Action {
    readonly type = ActionTypes.LoadPeopleSuccess;

    constructor(public payload: Personnel[]) { }
}

export class LoadPeopleFail implements Action {
    readonly type = ActionTypes.LoadPeopleFail;

    constructor(public payload: string) { }
}

export class SetCurrentPersonnelId implements Action {
    readonly type = ActionTypes.SetCurrentPersonnelId;

    constructor(public payload: number) { }
}

export class ResetCurrentPersonId implements Action {
    readonly type = ActionTypes.ResetCurrentPersonId;
}

export class LoadPersonnel implements Action {
    readonly type = ActionTypes.LoadPersonnel;

    constructor(public payload: number) { }
}

export class LoadPersonnelSuccess implements Action {
    readonly type = ActionTypes.LoadPersonnelSuccess;

    constructor(public payload: Personnel[]) { }
}

export class LoadPersonnelFail implements Action {
    readonly type = ActionTypes.LoadPersonnelFail;

    constructor(public payload: string) { }
}

export class LoadApplicationLookups implements Action {
    readonly type = ActionTypes.LoadApplicationLookups;
}

export class LoadApplicationLookupsSuccess implements Action {
    readonly type = ActionTypes.LoadApplicationLookupsSuccess;

    constructor(public payload: ApplicationLookups) { }
}

export class LoadApplicationLookupsFail implements Action {
    readonly type = ActionTypes.LoadApplicationLookupsFail;

    constructor(public payload: string) { }
}

export class DeletePerson implements Action {
    readonly type = ActionTypes.DeletePerson;

    constructor(public payload: number) { }
}

export class DeletePersonSuccess implements Action {
    readonly type = ActionTypes.DeletePersonSuccess;

    constructor(public payload: number) { }
}

export class DeletePersonFail implements Action {
    readonly type = ActionTypes.DeletePersonFail;

    constructor(public payload: number) { }
}

export class LoadOwnership implements Action {
    readonly type = ActionTypes.LoadOwnership;
}

export class LoadOwnershipSuccess implements Action {
    readonly type = ActionTypes.LoadOwnershipSuccess;

    constructor(public payload: any) { }
}

export class LoadOwnershipFail implements Action {
    readonly type = ActionTypes.LoadOwnershipFail;

    constructor(public payload: string) { }
}

export class SetIsIncorporated implements Action {
    readonly type = ActionTypes.SetIsIncorporated;

    constructor(public payload: boolean) { }
}

export class SetOrganization implements Action {
    readonly type = ActionTypes.SetOrganization;

    constructor(public payload: Organization) { }
}

export class SetOwnershipTypeId implements Action {
    readonly type = ActionTypes.SetOwnershipTypeId;

    constructor(public payload: number) { }
}

export class SetCurrentProviderId implements Action {
    readonly type = ActionTypes.SetCurrentProviderId;

    constructor(public payload: number) { }
}

export class CreateProvider implements Action {
    readonly type = ActionTypes.CreateProvider;

    constructor(public payload: Provider) { }
}

export class CreateProviderSuccess implements Action {
    readonly type = ActionTypes.CreateProviderSuccess;

    constructor(public payload: Provider) { }
}

export class CreateProviderFail implements Action {
    readonly type = ActionTypes.CreateProviderFail;

    constructor(public payload: string) { }
}


export class UpdateProvider implements Action {
    readonly type = ActionTypes.UpdateProvider;

    constructor(public payload: Provider) { }
}


export class UpdateProviderSuccess implements Action {
    readonly type = ActionTypes.UpdateProviderSuccess;

    constructor(public payload: Provider) { }
}

export class UpdateProviderFail implements Action {
    readonly type = ActionTypes.UpdateProviderFail;

    constructor(public payload: string) { }
}

export class DeleteProvider implements Action {
    readonly type = ActionTypes.DeleteProvider;

    constructor(public payload: number) { }
}

export class DeleteProviderSuccess implements Action {
    readonly type = ActionTypes.DeleteProviderSuccess;
}

export class DeleteProviderFail implements Action {
    readonly type = ActionTypes.DeleteProviderFail;

    constructor(public payload: number) { }
}


export class SetOwnerIds implements Action {
    readonly type = ActionTypes.SetOwnerIds;

    constructor(public payload: number[]) { }
}

export class SetDocumentNumber implements Action {
    readonly type = ActionTypes.SetDocumentNumber;

    constructor(public payload: string) { }
}

export class ClearOwnhershipType implements Action {
    readonly type = ActionTypes.ClearOwnhershipType;
}

export class ClearOwnerIds implements Action {
    readonly type = ActionTypes.ClearOwnerIds;
}

export class ClearOrganization implements Action {
    readonly type = ActionTypes.ClearOrganization;
}

export class LoadProviderId implements Action {
    readonly type = ActionTypes.LoadProviderId;

    constructor(public payload: number) { }
}

export class LoadProvider implements Action {
    readonly type = ActionTypes.LoadProvider;
}

export class LoadProviderSuccess implements Action {
    readonly type = ActionTypes.LoadProviderSuccess;

    constructor(public payload: Provider) { }
}

export class LoadProviderFail implements Action {
    readonly type = ActionTypes.LoadProviderFail;

    constructor(public payload: string) { }
}

export class CreateOwnership implements Action {
    readonly type = ActionTypes.CreateOwnership;

    constructor(public payload: any) { }
}

export class CreateOwnershipSuccess implements Action {
    readonly type = ActionTypes.CreateOwnershipSuccess;

    constructor(public payload: Ownership) { }
}

export class CreateOwnershipFail implements Action {
    readonly type = ActionTypes.CreateOwnershipFail;

    constructor(public payload: string) { }
}

export class UpdateOwnership implements Action {
    readonly type = ActionTypes.UpdateOwnership;

    constructor(public payload: any) { }
}

export class UpdateOwnershipSuccess implements Action {
    readonly type = ActionTypes.UpdateOwnershipSuccess;

    constructor(public payload: Ownership) { }
}

export class UpdateOwnershipFail implements Action {
    readonly type = ActionTypes.UpdateOwnershipFail;

    constructor(public payload: string) { }
}

export class SetOwnership implements Action {
    readonly type = ActionTypes.SetOwnership;

    constructor(public payload: Ownership) { }
}

export class SetProvider implements Action {
    readonly type = ActionTypes.SetProvider;

    constructor(public payload: Provider) { }
}

export class SetPersonnel implements Action {
    readonly type = ActionTypes.SetPersonnel;

    constructor(public payload: Personnel) { }
}

export class LoadPersonTitlePlusLookups implements Action {
    readonly type = ActionTypes.LoadPersonTitlePlusLookups;

    constructor(public payload: number) { }
}

export class LoadPersonTitlePlusLookupsSuccess implements Action {
    readonly type = ActionTypes.LoadPersonTitlePlusLookupsSuccess;

    constructor(public payload: LookupPersonTitlePlus[]) { }
}

export class LoadPersonTitlePlusLookupsFail implements Action {
    readonly type = ActionTypes.LoadPersonTitlePlusLookupsFail;

    constructor(public payload: string) { }
}

export class LoadServices implements Action {
    readonly type = ActionTypes.LoadServices;
    constructor(public payload: number) {}
}

export class LoadServicesSuccess implements Action {
    readonly type = ActionTypes.LoadServicesSuccess;

    constructor(public payload: Services) { }
}

export class LoadServicesFail implements Action {
    readonly type = ActionTypes.LoadServicesFail;

    constructor(public payload: string) { }
}

export class CreateServices implements Action {
    readonly type = ActionTypes.CreateServices;
    constructor(public payload: Services) { }
}

export class CreateServicesSuccess implements Action {
    readonly type = ActionTypes.CreateServicesSuccess;

    constructor(public payload: Services) { }
}

export class CreateServicesFail implements Action {
    readonly type = ActionTypes.CreateServicesFail;

    constructor(public payload: string) { }
}
export class UpdateServices implements Action {
    readonly type = ActionTypes.UpdateServices;
    constructor(public payload: Services) { }
}

export class UpdateServicesSuccess implements Action {
    readonly type = ActionTypes.UpdateServicesSuccess;

    constructor(public payload: Services) { }
}

export class UpdateServicesFail implements Action {
    readonly type = ActionTypes.UpdateServicesFail;
    constructor(public payload: string) { }
}
export class CreateEmploymentDetails implements Action {
    readonly type = ActionTypes.CreateEmploymentDetails;

    constructor(public payload: any) {}

}

export class CreateEmploymentDetailsSuccess implements Action {
    readonly type = ActionTypes.CreateEmploymentDetailsSuccess;

    constructor(public payload: any) {}
}

export class CreateEmploymentDetailsFail implements Action {
    readonly type = ActionTypes.CreateEmploymentDetailsFail;

    constructor(public payload: string) {}
}

export class CreateUnEmploymentDetails implements Action {
    readonly type = ActionTypes.CreateUnEmploymentDetails;

    constructor(public payload: any) {}

}

export class CreateUnEmploymentDetailsSuccess implements Action {
    readonly type = ActionTypes.CreateUnEmploymentDetailsSuccess;

    constructor(public payload: any) {}
}

export class CreateUnEmploymentDetailsFail implements Action {
    readonly type = ActionTypes.CreateUnEmploymentDetailsFail;

    constructor(public payload: string) {}
}

export class UpdateEmploymentDetails implements Action {
    readonly type = ActionTypes.UpdateEmploymentDetails;

    constructor(public payload: any) {}
}
export class UpdateEmploymentDetailsSuccess implements Action {
    readonly type = ActionTypes.UpdateEmploymentDetailsSuccess;

    constructor(public payload: any) {}
}
export class UpdateEmploymentDetailsFail implements Action {
    readonly type = ActionTypes.UpdateEmploymentDetailsFail;

    constructor(public payload: string) {}
}

export class UpdateUnEmploymentDetailsFail implements Action {
    readonly type = ActionTypes.UpdateUnEmploymentDetailsFail;

    constructor(public payload: string) {}
}
export class UpdateUnEmploymentDetailsSuccess implements Action {
    readonly type = ActionTypes.UpdateUnEmploymentDetailsSuccess;

    constructor(public payload: any) {}
}
export class UpdateUnEmploymentDetails implements Action {
    readonly type = ActionTypes.UpdateUnEmploymentDetails;

    constructor(public payload: any) {}
}

export class LoadEmploymentHistory implements Action {
    readonly type = ActionTypes.LoadEmploymentHistory;

    constructor(public payload: number ) {}
}

export class SetCurrentEmploymentHistoryFormId implements Action {
    readonly type = ActionTypes.SetCurrentEmploymentHistoryFormId;

    constructor(public payload: number) { }
}

export class LoadEmploymentHistorySuccess implements Action {
    readonly type = ActionTypes.LoadEmploymentHistorySuccess;

    constructor(public payload: EmploymentHistory) {}
}

export class LoadEmploymentHistoryFail implements Action {
    readonly type = ActionTypes.LoadEmploymentHistoryFail;

    constructor(public payload: string) {}
}
export class LoadEmploymentDetail implements Action {
    readonly type = ActionTypes.LoadEmploymentDetail;

    constructor(public payload: number ) {}
}

export class LoadEmploymentDetailSuccess implements Action {
    readonly type = ActionTypes.LoadEmploymentDetailSuccess;

    constructor(public payload: any) {}
}

export class LoadEmploymentDetailFail implements Action {
    readonly type = ActionTypes.LoadEmploymentDetailFail;

    constructor(public payload: string) {}
}

export class LoadUnEmploymentDetail implements Action {
    readonly type = ActionTypes.LoadUnEmploymentDetail;

    constructor(public payload: number ) {}
}

export class LoadUnEmploymentDetailSuccess implements Action {
    readonly type = ActionTypes.LoadUnEmploymentDetailSuccess;

    constructor(public payload: any) {}
}

export class LoadUnEmploymentDetailFail implements Action {
    readonly type = ActionTypes.LoadUnEmploymentDetailFail;

    constructor(public payload: string) {}
}

export class DeleteEmploymentDetail  implements Action {
    readonly type = ActionTypes.DeleteEmploymentDetail;

    constructor(public payload: number ) {}
}

export class DeleteEmploymentDetailSuccess implements Action {
    readonly type = ActionTypes.DeleteEmploymentDetailSuccess;

    constructor(public payload: number) {}
}

export class DeleteEmploymentDetailFail implements Action {
    readonly type = ActionTypes.DeleteEmploymentDetailFail;

    constructor(public payload: string) {}
}


export class DeleteUnEmploymentDetail  implements Action {
    readonly type = ActionTypes.DeleteUnEmploymentDetail;

    constructor(public payload: number ) {}
}

export class DeleteUnEmploymentDetailSuccess implements Action {
    readonly type = ActionTypes.DeleteUnEmploymentDetailSuccess;

    constructor(public payload: number) {}
}

export class DeleteUnEmploymentDetailFail implements Action {
    readonly type = ActionTypes.DeleteUnEmploymentDetailFail;

    constructor(public payload: string) {}
}

export class SetCurrentEmploymentHistoryByApplicantlId implements Action {
    readonly type = ActionTypes.SetCurrentEmploymentHistoryByApplicantlId;

    constructor(public payload: number) { }
}

export class SetAttestationOfGoodMoralCharacterFormId implements Action {
    readonly type = ActionTypes.SetAttestationOfGoodMoralCharacterFormId;

    constructor(public payload: number) { }
}

export class ResetCurrentEmploymentHistoryByApplicantId implements Action {
    readonly type = ActionTypes.ResetCurrentEmploymentHistoryByApplicantId;
}
export class CreateBusinessHours implements Action {
    readonly type = ActionTypes.CreateBusinessHours;

    constructor(public payload: BusinessHours) {}

}

export class CreateBusinessHoursSuccess implements Action {
    readonly type = ActionTypes.CreateBusinessHoursSuccess;

    constructor(public payload: BusinessHours) {}
}

export class CreateBusinessHoursFail implements Action {
    readonly type = ActionTypes.CreateBusinessHoursFail;

    constructor(public payload: string) {}
}

export class UpdateBusinessHours implements Action {
    readonly type = ActionTypes.UpdateBusinessHours;

    constructor(public payload: BusinessHours) {}
}
export class UpdateBusinessHoursSuccess implements Action {
    readonly type = ActionTypes.UpdateBusinessHoursSuccess;

    constructor(public payload: BusinessHours) {}
}
export class UpdateBusinessHoursFail implements Action {
    readonly type = ActionTypes.UpdateBusinessHoursFail;

    constructor(public payload: string) {}
}

export class LoadBusinessHours implements Action {
    readonly type = ActionTypes.LoadBusinessHours;

    constructor(public payload: number) {}
}

export class LoadBusinessHoursSuccess implements Action {
    readonly type = ActionTypes.LoadBusinessHoursSuccess;

    constructor(public payload: BusinessHours) {}
}

export class LoadBusinessHoursFail implements Action {
    readonly type = ActionTypes.LoadBusinessHoursFail;

    constructor(public payload: string) {}
}

export class LoadListOfDocuments implements Action {
    readonly type = ActionTypes.LoadListOfDocuments;

    constructor(public payload: number) {}
}

export class LoadListOfDocumentsSuccess implements Action {
    readonly type = ActionTypes.LoadListOfDocumentsSuccess;

    constructor(public payload: ListOfDocuments) {}
}

export class LoadListOfDocumentsFail implements Action {
    readonly type = ActionTypes.LoadListOfDocumentsFail;

    constructor(public payload: string) {}
}

export class LoadPeopleDocuments implements Action {
    readonly type = ActionTypes.LoadPeopleDocuments;

    constructor(public payload: any) {}
}

export class LoadPeopleDocumentsSuccess implements Action {
    readonly type = ActionTypes.LoadPeopleDocumentsSuccess;

    constructor(public payload: DocumentsPeople) {}
}

export class LoadPeopleDocumentsFail implements Action {
    readonly type = ActionTypes.LoadPeopleDocumentsFail;

    constructor(public payload: string) {}
}

export class LoadFormLookups implements Action {
    readonly type = ActionTypes.LoadFormLookups;
}
export class LoadFormLookupsSuccess implements Action {
    readonly type = ActionTypes.LoadFormLookupsSuccess;

    constructor(public payload: FormLookups) { }
}

export class LoadFormLookupsFail implements Action {
    readonly type = ActionTypes.LoadFormLookupsFail;

    constructor(public payload: string) { }
}

export class CreateAGMCDetails implements Action {
    readonly type = ActionTypes.CreateAGMCDetails;

    constructor(public payload: any) {}

}

export class CreateAGMCDetailsSuccess implements Action {
    readonly type = ActionTypes.CreateAGMCDetailsSuccess;

    constructor(public payload: any) {}
}

export class CreateAGMCDetailsFail implements Action {
    readonly type = ActionTypes.CreateAGMCDetailsFail;

    constructor(public payload: string) {}
}
export class UpdateAGMCDetails implements Action {
    readonly type = ActionTypes.UpdateAGMCDetails;

    constructor(public payload: any) {}

}

export class UpdateAGMCDetailsSuccess implements Action {
    readonly type = ActionTypes.UpdateAGMCDetailsSuccess;

    constructor(public payload: any) {}
}

export class UpdateAGMCDetailsFail implements Action {
    readonly type = ActionTypes.UpdateAGMCDetailsFail;

    constructor(public payload: string) {}
}
export class LoadAGMCDetails implements Action {
    readonly type = ActionTypes.LoadAGMCDetails;

    constructor(public payload: number) {}

}

export class LoadAGMCDetailsSuccess implements Action {
    readonly type = ActionTypes.LoadAGMCDetailsSuccess;

    constructor(public payload: any) {}
}

export class LoadAGMCDetailsFail implements Action {
    readonly type = ActionTypes.LoadAGMCDetailsFail;

    constructor(public payload: string) {}
}

export class CreateChildAbuseReportingDetail implements Action {
    readonly type = ActionTypes.CreateChildAbuseReportingDetail;

    constructor(public payload: ChildAbuseReportingDetails) { }
}

export class CreateChildAbuseReportingDetailSuccess implements Action {
    readonly type = ActionTypes.CreateChildAbuseReportingDetailSuccess;

    constructor(public payload: ChildAbuseReportingDetails) { }
}

export class CreateChildAbuseReportingDetailFail implements Action {
    readonly type = ActionTypes.CreateChildAbuseReportingDetailFail;

    constructor(public payload: string) { }
}

export class UpdateChildAbuseReportingDetail implements Action {
    readonly type = ActionTypes.UpdateChildAbuseReportingDetail;

    constructor(public payload: ChildAbuseReportingDetails) { }
}

export class UpdateChildAbuseReportingDetailSuccess implements Action {
    readonly type = ActionTypes.UpdateChildAbuseReportingDetailSuccess;

    constructor(public payload: ChildAbuseReportingDetails) { }
}

export class UpdateChildAbuseReportingDetailFail implements Action {
    readonly type = ActionTypes.UpdateChildAbuseReportingDetailFail;

    constructor(public payload: string) { }
}

export class LoadChildAbuseReportingDetail implements Action {
    readonly type = ActionTypes.LoadChildAbuseReportingDetail;

    constructor(public payload: number) { }
}

export class LoadChildAbuseReportingDetailSuccess implements Action {
    readonly type = ActionTypes.LoadChildAbuseReportingDetailSuccess;

    constructor(public payload: ChildAbuseReportingDetails) { }
}

export class LoadChildAbuseReportingDetailFail implements Action {
    readonly type = ActionTypes.LoadChildAbuseReportingDetailFail;

    constructor(public payload: string) { }
}

export class LoadZoningAttestationSourceList implements Action {
    readonly type = ActionTypes.LoadZoningAttestationSourceList;

    constructor(public payload: number) {}
}

export class LoadZoningAttestationSourceListSuccess implements Action {
    readonly type = ActionTypes.LoadZoningAttestationSourceListSuccess;

    constructor(public payload: ZoningAttestationSourceList) {}
}

export class LoadZoningAttestationSourceListFail implements Action {
    readonly type = ActionTypes.LoadZoningAttestationSourceListFail;

    constructor(public payload: string) {}
}

//#region Self Attestation
export class CreateSelfAttestationDetail implements Action {
    readonly type = ActionTypes.CreateSelfAttestationDetail;

    constructor(public payload: SelfAttestationDetails) { }
}

export class CreateSelfAttestationDetailSuccess implements Action {
    readonly type = ActionTypes.CreateSelfAttestationDetailSuccess;

    constructor(public payload: SelfAttestationDetails) { }
}

export class CreateSelfAttestationDetailFail implements Action {
    readonly type = ActionTypes.CreateSelfAttestationDetailFail;

    constructor(public payload: string) { }
}

export class UpdateSelfAttestationDetail implements Action {
    readonly type = ActionTypes.UpdateSelfAttestationDetail;

    constructor(public payload: SelfAttestationDetails) { }
}

export class UpdateSelfAttestationDetailSuccess implements Action {
    readonly type = ActionTypes.UpdateSelfAttestationDetailSuccess;

    constructor(public payload: SelfAttestationDetails) { }
}

export class UpdateSelfAttestationDetailFail implements Action {
    readonly type = ActionTypes.UpdateSelfAttestationDetailFail;

    constructor(public payload: string) { }
}

export class LoadSelfAttestationDetail implements Action {
    readonly type = ActionTypes.LoadSelfAttestationDetail;

    constructor(public payload: number) { }
}

export class LoadSelfAttestationDetailSuccess implements Action {
    readonly type = ActionTypes.LoadSelfAttestationDetailSuccess;

    constructor(public payload: SelfAttestationDetails) { }
}

export class LoadSelfAttestationDetailFail implements Action {
    readonly type = ActionTypes.LoadSelfAttestationDetailFail;

    constructor(public payload: string) { }
}
//#endregion Self Attestation

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions = CreatePersonnel
    | CreatePersonnelSuccess
    | CreatePersonnelFail
    | UpdatePersonnel
    | UpdatePersonnelSuccess
    | UpdatePersonnelFail
    | LoadPeople
    | LoadPeopleSuccess
    | LoadPeopleFail
    | SetCurrentPersonnelId
    | ResetCurrentPersonId
    | LoadApplicationLookups
    | LoadApplicationLookupsSuccess
    | LoadApplicationLookupsFail
    | DeletePerson
    | DeletePersonSuccess
    | DeletePersonFail
    | CreateProvider
    | CreateProviderSuccess
    | CreateProviderFail
    | UpdateProvider
    | UpdateProviderSuccess
    | UpdateProviderFail
    | DeleteProvider
    | DeleteProviderSuccess
    | DeleteProviderFail
    | LoadOwnership
    | LoadOwnershipSuccess
    | LoadOwnershipFail
    | SetIsIncorporated
    | SetOrganization
    | SetOwnershipTypeId
    | SetOwnerIds
    | SetDocumentNumber
    | ClearOwnhershipType
    | ClearOwnerIds
    | ClearOrganization
    | LoadProvider
    | LoadProviderSuccess
    | LoadProviderFail
    | CreateOwnership
    | CreateOwnershipSuccess
    | CreateOwnershipFail
    | UpdateOwnership
    | UpdateOwnershipSuccess
    | UpdateOwnershipFail
    | SetCurrentProviderId
    | LoadPersonnel
    | LoadPersonnelSuccess
    | LoadPersonnelFail
    | SetOwnership
    | LoadSampleOwnership
    | LoadSamplePeople
    | LoadSampleProvider
    | SetProvider
    | SetPersonnel
    | LoadProviderId
    | LoadPersonTitlePlusLookups
    | LoadPersonTitlePlusLookupsSuccess
    | LoadPersonTitlePlusLookupsFail
    | LoadServices
    | LoadServicesSuccess
    | LoadServicesFail
    | CreateServices
    | CreateServicesSuccess
    | CreateServicesFail
    | UpdateServices
    | UpdateServicesSuccess
    | UpdateServicesFail
    | CreateBusinessHours
    | CreateBusinessHoursSuccess
    | CreateBusinessHoursFail
    | UpdateBusinessHours
    | UpdateBusinessHoursSuccess
    | UpdateBusinessHoursFail
    | LoadBusinessHours
    | LoadBusinessHoursSuccess
    | LoadBusinessHoursFail
    | CreateEmploymentDetails
    | CreateEmploymentDetailsSuccess
    | CreateEmploymentDetailsFail
    | UpdateEmploymentDetails
    | UpdateEmploymentDetailsSuccess
    | UpdateEmploymentDetailsFail
    | LoadEmploymentHistory
    | LoadEmploymentHistorySuccess
    | LoadEmploymentHistoryFail
    | LoadEmploymentDetail
    | LoadEmploymentDetailSuccess
    | LoadEmploymentDetailFail
    | DeleteEmploymentDetail
    | DeleteEmploymentDetailSuccess
    | DeleteEmploymentDetailFail
    | SetCurrentEmploymentHistoryByApplicantlId
    | LoadListOfDocuments
    | LoadListOfDocumentsSuccess
    | LoadListOfDocumentsFail
    | LoadPeopleDocuments
    | LoadPeopleDocumentsSuccess
    | LoadPeopleDocumentsFail
    | ResetCurrentEmploymentHistoryByApplicantId
    | SetCurrentEmploymentHistoryFormId
    | LoadFormLookups
    | LoadFormLookupsSuccess
    | LoadFormLookupsFail
    | CreateUnEmploymentDetailsFail
    | CreateUnEmploymentDetails
    | CreateUnEmploymentDetailsSuccess
    | UpdateUnEmploymentDetails
    | UpdateUnEmploymentDetailsSuccess
    | UpdateUnEmploymentDetailsFail
    | LoadUnEmploymentDetail
    | LoadUnEmploymentDetailSuccess
    | LoadUnEmploymentDetailFail
    | DeleteUnEmploymentDetail
    | DeleteUnEmploymentDetailSuccess
    | DeleteUnEmploymentDetailFail
    | CreateAGMCDetails
    | CreateAGMCDetailsSuccess
    | CreateAGMCDetailsFail
    | UpdateAGMCDetails
    | UpdateAGMCDetailsSuccess
    | UpdateAGMCDetailsFail
    | LoadAGMCDetails
    | LoadAGMCDetailsSuccess
    | LoadAGMCDetailsFail
    | SetAttestationOfGoodMoralCharacterFormId
    | CreateChildAbuseReportingDetail
    | CreateChildAbuseReportingDetailSuccess
    | CreateChildAbuseReportingDetailFail
    | UpdateChildAbuseReportingDetail
    | UpdateChildAbuseReportingDetailSuccess
    | UpdateChildAbuseReportingDetailFail
    | LoadChildAbuseReportingDetail
    | LoadChildAbuseReportingDetailSuccess
    | LoadChildAbuseReportingDetailFail
    | LoadZoningAttestationSourceList
    | LoadZoningAttestationSourceListSuccess
    | LoadZoningAttestationSourceListFail
    | CreateSelfAttestationDetail
    | CreateSelfAttestationDetailSuccess
    | CreateSelfAttestationDetailFail
    | UpdateSelfAttestationDetail
    | UpdateSelfAttestationDetailSuccess
    | UpdateSelfAttestationDetailFail
    | LoadSelfAttestationDetail
    | LoadSelfAttestationDetailSuccess
    | LoadSelfAttestationDetailFail
    ;
