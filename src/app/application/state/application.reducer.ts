import {
    ApplicationLookups,
    Ownership,
    Personnel,
    Provider,
    Services,
    BusinessHours,
    Documents,
    ChildAbuseReportingDetails,
    ZoningAttestationSourceList,
    SelfAttestationDetails
} from '../application-interface';
import * as ApplicationActions from './application.actions';
import { cloneDeep } from 'lodash';
import { state } from '@angular/animations';
import { FormLookups } from 'src/app/forms/forms-interface';
import { DocumentsOfficeuseonlyComponent } from 'src/app/_shared/components/documents-officeuseonly/documents-officeuseonly.component';

export interface State {
    provider: Provider;
    currentProviderId: number;
    people: Personnel[];
    currentPersonnelId: number;
    agmcFormId: number;
    currentEmploymentHistoryByApplicantId: number;
    currentEmploymentHistoryFormId: number;
    businessHours: BusinessHours;
    formLookups: FormLookups;
    lookups: ApplicationLookups;
    ownership: Ownership;
    services: Services;
    documents: Documents;
    error: string;
}

const initialPeople: Personnel[] = [
];

const initialState: State = {
    provider: {
        formId: 0,
        providerId: 0,
        providerNumber: '',
        programTypeId: 0,
        licenseStatusId: 0,
        licenseSubTypeId: 0,
        name: '',
        dbaName: '',
        addresses: [],
        phones: [],
        emails: [],
        website: '',
    },
    currentProviderId: 0,
    people: initialPeople,
    currentPersonnelId: 0,
    currentEmploymentHistoryByApplicantId: 0,
    agmcFormId: 0,
    currentEmploymentHistoryFormId: 0,
    businessHours:
    {
        providerId: 0,
        monthsOfOperation: []
    },
    formLookups: {
        lookupFormType: [],
        lookupFormStatus: []

    },
    lookups: {
        lookupPhoneType: [],
        lookupEmailAddressType: [],
        lookupPersonType: [],
        lookupState: [],
        lookupOrganizationType: [],
        lookupAddressType: [],
        lookupOwnership: [],
        lookupServiceType: [],
        lookupPersonTitlePlus: [],
        lookupMonthsOfOperation: [],
        lookupReasonForSeverance: [],
    },
    ownership: {
        ownershipTypeId: null,
        organization: null,
        isIncorporated: true,
    },
    services: {
        providerId: 0,
        serviceList: [],
    },
    documents: {
        employmentHistory: {
            personId: 0,
            personName: '',
            employmentHistoryDetails: [],

        },
        employmentDetails: {
            formId: 0,
            // providerId: 0,
            personId: 0,
            employmentHistoryByApplicantId: 0,
            personName: '',
            isEmployed: true,
            isCurrent: false,
            startDate: '',
            endDate: '',
            employerName: '',
            positionHeld: '',
            employerStreetAddress: '',
            employerCity: '',
            employerState: '',
            employerZipCode: 0,
            employerPhone: 0,
            employerPhoneExtn: null,
            employerEmail: '',
            employerWebsite: '',
            supervisorName: '',
            supervisorPhone: 0,
            supervisorPhoneExtn: 0,
            supervisorEmail: '',
            reasonForSeveranceId: 0,
            reason: '',
            reasonForSeveranceDescription: '',
            jobDuties: '',
            formStatusId: 0,
            formStatus: '',
            formSignedBy: '',
            formSignedByPersonId: 0,
            formSignedDate: null,
            employmentHistoryAttachmentCount: 0,

        },
        unemploymentDetails: {
            formId: 0,
            // providerId: 0,
            personId: 0,
            employmentHistoryByApplicantId: 0,
            personName: '',
            isEmployed: false,
            isCurrent: false,
            startDate: '',
            endDate: '',
            formStatusId: 0,
            formStatus: '',
            employmentHistoryAttachmentCount: 0

        },
        agmc: {
            personId: 0,
            formId: 0,
            personName: '',
            formStatusId: 0,
            formStatus: '',
            hasCommittedOffence: null,
            formSignedByPersonId: 0,
            formSignedBy: '',
            formSignedDate: null,
            attachmentCount: 0

        },
        peopleDocuments: {
            // providerId: 0,
            formTypeId: 0,
            formTypeLabel: '',
            formList: []
        },
        listOfDocuments: {
            formList: []
        },
        childAbuseReportingDetails: {} as ChildAbuseReportingDetails,
        zoningAttestationSourceList: {} as ZoningAttestationSourceList,
        selfAttestationDetails: {} as SelfAttestationDetails
    },
    error: ''
};


// tslint:disable-next-line:no-shadowed-variable
export function reducer(state = initialState, action: ApplicationActions.Actions): State {
    switch (action.type) {

        case ApplicationActions.ActionTypes.CreatePersonnelSuccess: {
            const personId = action.payload.personId;
            const people = cloneDeep(state.people);
            // if the personId is valid
            if (personId && personId !== 0) {
                const index = people.findIndex((personnel) => personnel.personId === personId);
                // if the personnel exists, replace the personnel in people, otherwise, push in the array
                if (index > -1) {
                    people[index] = action.payload;
                } else {
                    people.push(action.payload);
                }
            }
            return {
                ...state,
                people,
                currentPersonnelId: action.payload.personId,
                error: ''
            };
        }

        case ApplicationActions.ActionTypes.CreatePersonnelFail: {
            return {
                ...state,
                error: action.payload
            };
        }

        case ApplicationActions.ActionTypes.UpdatePersonnelSuccess: {
            const personId = action.payload.personId;
            const people = cloneDeep(state.people);
            // if the personId is valid
            if (personId && personId !== 0) {
                const index = people.findIndex((personnel) => personnel.personId === personId);
                // if the personnel exists, replace the personnel in people, otherwise, push in the array
                if (index > -1) {
                    people[index] = action.payload;
                } else {
                    people.push(action.payload);
                }
            }
            return {
                ...state,
                people,
                currentPersonnelId: action.payload.personId,
                error: ''
            };
        }

        case ApplicationActions.ActionTypes.UpdatePersonnelFail: {
            return {
                ...state,
                error: action.payload
            };
        }

        case ApplicationActions.ActionTypes.LoadPersonnelFail: {
            return {
                ...state,
                error: action.payload
            };
        }

        case ApplicationActions.ActionTypes.LoadPeople: {
            return {
                ...state,
            };
        }

        case ApplicationActions.ActionTypes.LoadPeopleSuccess: {
            return {
                ...state,
                people: action.payload,
                error: ''
            };
        }

        case ApplicationActions.ActionTypes.LoadPeopleFail: {
            return {
                ...state,
                error: action.payload
            };
        }

        case ApplicationActions.ActionTypes.SetCurrentPersonnelId: {
            return {
                ...state,
                currentPersonnelId: action.payload,
                error: ''
            };
        }

        case ApplicationActions.ActionTypes.ResetCurrentPersonId: {
            const existingstate = { ...initialState };
            const newCurrentPersonnelId = existingstate.currentPersonnelId;
            return {
                ...state,
                currentPersonnelId: newCurrentPersonnelId
            };
        }


        case ApplicationActions.ActionTypes.LoadApplicationLookupsSuccess: {
            return {
                ...state,
                lookups: action.payload
            };
        }

        case ApplicationActions.ActionTypes.LoadPeopleFail: {
            return {
                ...state,
                error: action.payload
            };
        }

        case ApplicationActions.ActionTypes.DeletePersonSuccess: {
            const updatedPeople = state.people.filter((personnel) => personnel.personId !== action.payload);
            return {
                ...state,
                people: updatedPeople,
                currentPersonnelId: 0
            };
        }
        case ApplicationActions.ActionTypes.LoadOwnership: {
            return {
                ...state
            };
        }

        case ApplicationActions.ActionTypes.LoadOwnershipSuccess: {
            return {
                ...state,
                ownership: action.payload
            };
        }

        case ApplicationActions.ActionTypes.LoadOwnershipFail: {
            return {
                ...state,
                error: action.payload
            };
        }

        case ApplicationActions.ActionTypes.SetIsIncorporated: {
            return {
                ...state,
                ownership: {
                    ...state.ownership,
                    isIncorporated: action.payload
                }
            };
        }

        case ApplicationActions.ActionTypes.SetOrganization: {
            return {
                ...state,
                ownership: {
                    ...state.ownership,
                    organization: action.payload
                }
            };
        }

        case ApplicationActions.ActionTypes.SetOwnerIds: {
            return {
                ...state,
                ownership: {
                    ...state.ownership
                }
            };
        }

        case ApplicationActions.ActionTypes.SetOwnershipTypeId: {
            return {
                ...state,
                ownership: {
                    ...state.ownership,
                    ownershipTypeId: action.payload
                }
            };
        }

        case ApplicationActions.ActionTypes.SetCurrentProviderId: {
            return {
                ...state,
                provider: {
                    ...state.provider,
                    providerId: action.payload ? action.payload : state.provider.providerId,
                },
            };
        }

        case ApplicationActions.ActionTypes.CreateProviderSuccess: {
            return {
                ...state,
                provider: action.payload,
                currentProviderId: action.payload.providerId,
                error: ''
            };
        }

        case ApplicationActions.ActionTypes.CreateProviderFail: {
            return {
                ...state,
                error: action.payload
            };
        }

        case ApplicationActions.ActionTypes.UpdateProviderSuccess: {

            return {
                ...state,
                provider: action.payload,
                // currentProviderId: action.payload.providerId,
                error: ''
            };
        }

        case ApplicationActions.ActionTypes.UpdateProviderFail: {
            return {
                ...state,
                error: ''
            };
        }

        case ApplicationActions.ActionTypes.DeleteProvider: {
            return {
                ...state,
                provider: null,
                currentProviderId: 0,
            };
        }

        case ApplicationActions.ActionTypes.SetCurrentProviderId: {
            return {
                ...state,
                currentProviderId: action.payload,

            };

        }

        case ApplicationActions.ActionTypes.LoadProviderSuccess: {
            return {
                ...state,
                provider: action.payload,
                error: ''
            };
        }

        case ApplicationActions.ActionTypes.LoadProviderFail: {
            return {
                ...state,
                error: action.payload
            };
        }

        case ApplicationActions.ActionTypes.SetDocumentNumber: {
            return {
                ...state,
                ownership: {
                    ...state.ownership,
                    organization: {
                        ...state.ownership.organization,
                        documentNumber: action.payload
                    }
                }
            };
        }

        case ApplicationActions.ActionTypes.ClearOwnhershipType: {
            return {
                ...state,
                ownership: {
                    ...state.ownership,
                    ownershipTypeId: initialState.ownership.ownershipTypeId,
                    organization: initialState.ownership.organization
                }
            };
        }

        case ApplicationActions.ActionTypes.ClearOwnerIds: {
            return {
                ...state,
                ownership: {
                    ...state.ownership
                }
            };
        }

        case ApplicationActions.ActionTypes.ClearOrganization: {
            return {
                ...state,
                ownership: {
                    ...state.ownership,
                    organization: initialState.ownership.organization
                }
            };
        }

        case ApplicationActions.ActionTypes.SetOwnership: {
            return {
                ...state,
                ownership: action.payload
            };
        }

        case ApplicationActions.ActionTypes.CreateOwnershipSuccess: {
            return {
                ...state,
                ownership: action.payload
            };
        }

        case ApplicationActions.ActionTypes.CreateOwnershipFail: {
            return {
                ...state,
                error: action.payload
            };
        }

        case ApplicationActions.ActionTypes.UpdateOwnershipSuccess: {
            return {
                ...state,
                ownership: action.payload
            };
        }

        case ApplicationActions.ActionTypes.UpdateOwnershipFail: {
            return {
                ...state,
                error: action.payload
            };
        }

        case ApplicationActions.ActionTypes.SetProvider: {
            return {
                ...state,
                provider: action.payload
            };
        }

        case ApplicationActions.ActionTypes.SetPersonnel: {
            const personId = action.payload.personId;
            const people = cloneDeep(state.people);
            // if the personId is valid
            if (personId && personId !== 0) {
                const index = people.findIndex((personnel) => personnel.personId === personId);
                // if the personnel exists, replace the personnel in people, otherwise, push in the array
                if (index > -1) {
                    people[index] = action.payload;
                } else {
                    people.push(action.payload);
                }
                // if the personId is not valid
            } else {
                people.push(action.payload);
            }
            return {
                ...state,
                people
            };
        }
        case ApplicationActions.ActionTypes.LoadPersonTitlePlusLookupsSuccess: {
            const personTitlePlusLookups = action.payload;
            const lookups = cloneDeep(state.lookups);
            if (personTitlePlusLookups.length > 0) {
                lookups.lookupPersonTitlePlus = personTitlePlusLookups;
            }
            return {
                ...state,
                lookups
            };
        }
        case ApplicationActions.ActionTypes.LoadPersonTitlePlusLookupsFail: {
            return {
                ...state,
                error: action.payload
            };
        }
        case ApplicationActions.ActionTypes.CreateServicesSuccess: {
            return {
                ...state,
                services: action.payload
            };
        }

        case ApplicationActions.ActionTypes.CreateServicesFail: {
            return {
                ...state,
                error: action.payload
            };
        }
        case ApplicationActions.ActionTypes.UpdateServicesSuccess: {
            return {
                ...state,
                services: action.payload
            };
        }

        case ApplicationActions.ActionTypes.UpdateServicesFail: {
            return {
                ...state,
                error: action.payload
            };
        }
        case ApplicationActions.ActionTypes.CreateBusinessHoursSuccess: {
            return {
                ...state,
                businessHours: action.payload
            };
        }
        case ApplicationActions.ActionTypes.CreateBusinessHoursFail: {
            return {
                ...state,
                error: action.payload
            };
        }
        case ApplicationActions.ActionTypes.UpdateBusinessHoursSuccess: {
            return {
                ...state,
                businessHours: action.payload
            };
        }
        case ApplicationActions.ActionTypes.UpdateBusinessHoursFail: {
            return {
                ...state,
                error: action.payload
            };
        }
        case ApplicationActions.ActionTypes.LoadBusinessHoursSuccess: {
            return {
                ...state,
                businessHours: action.payload
            };
        }
        case ApplicationActions.ActionTypes.LoadBusinessHoursFail: {
            return {
                ...state,
                error: action.payload
            };
        }

        case ApplicationActions.ActionTypes.LoadServicesSuccess: {
            return {
                ...state,
                services: action.payload
            };
        }
        case ApplicationActions.ActionTypes.LoadServicesFail: {
            return {
                ...state,
                error: action.payload
            };
        }
        // case ApplicationActions.ActionTypes.LoadEmploymentHistory: {
        //     return {
        //         ...state,
        //     };
        // }

        case ApplicationActions.ActionTypes.LoadEmploymentHistorySuccess: {
            const document = cloneDeep(state.documents);
            document.employmentHistory = action.payload;
            return {
                ...state,
                documents: document,
                error: ''
            };
        }

        case ApplicationActions.ActionTypes.LoadEmploymentHistoryFail: {
            return {
                ...state,
                error: action.payload
            };
        }
        case ApplicationActions.ActionTypes.LoadEmploymentDetailSuccess: {
            const document = cloneDeep(state.documents);
            document.employmentDetails = action.payload;
            document.unemploymentDetails = null;
            return {
                ...state,
                documents: document,
                error: ''
            };
        }

        case ApplicationActions.ActionTypes.LoadEmploymentDetailFail: {
            return {
                ...state,
                error: action.payload
            };
        }
        case ApplicationActions.ActionTypes.LoadUnEmploymentDetailSuccess: {
            const document = cloneDeep(state.documents);
            document.unemploymentDetails = action.payload;
            document.employmentDetails = null;
            return {
                ...state,
                documents: document,
                error: ''
            };
        }

        case ApplicationActions.ActionTypes.LoadUnEmploymentDetailFail: {
            return {
                ...state,
                error: action.payload
            };
        }


        case ApplicationActions.ActionTypes.SetCurrentEmploymentHistoryFormId: {
            return {
                ...state,
                currentEmploymentHistoryFormId: action.payload,
                error: ''
            };
        }

        case ApplicationActions.ActionTypes.DeleteEmploymentDetailSuccess: {
            const updatedDocuments = cloneDeep(state.documents);
            updatedDocuments.employmentHistory.employmentHistoryDetails = state.documents.employmentHistory.employmentHistoryDetails.filter((employmentDetail) => employmentDetail.employmentHistoryByApplicantId !== action.payload);
            updatedDocuments.employmentDetails = null;
            return {
                ...state,
                documents: updatedDocuments,
                currentEmploymentHistoryByApplicantId: 0,
                currentPersonnelId: updatedDocuments.employmentHistory ? state.currentPersonnelId : 0
            };
        }
        case ApplicationActions.ActionTypes.DeleteEmploymentDetailFail: {
            return {
                ...state,
                error: action.payload
            };
        }

        case ApplicationActions.ActionTypes.DeleteUnEmploymentDetailSuccess: {
            const updatedDocuments = cloneDeep(state.documents);
            updatedDocuments.employmentHistory.employmentHistoryDetails = state.documents.employmentHistory.employmentHistoryDetails.filter((employmentDetail) => employmentDetail.employmentHistoryByApplicantId !== action.payload);
            updatedDocuments.unemploymentDetails = null;
            return {
                ...state,
                documents: updatedDocuments,
                currentEmploymentHistoryByApplicantId: 0,
                currentPersonnelId: updatedDocuments.employmentHistory ? state.currentPersonnelId : 0
            };
        }
        case ApplicationActions.ActionTypes.DeleteUnEmploymentDetailFail: {
            return {
                ...state,
                error: action.payload
            };
        }
        case ApplicationActions.ActionTypes.CreateEmploymentDetailsSuccess: {
            const personId = action.payload.personId;
            const employmentHistoryByApplicantId = action.payload.employmentHistoryByApplicantId;
            const documents = cloneDeep(state.documents);
            documents.employmentDetails = action.payload;
            documents.unemploymentDetails = null;

            return {
                ...state,
                documents,
                currentPersonnelId: action.payload.personId,
                error: ''
            };
        }

        case ApplicationActions.ActionTypes.CreateEmploymentDetailsFail: {
            return {
                ...state,
                error: action.payload
            };
        }
        case ApplicationActions.ActionTypes.CreateUnEmploymentDetailsSuccess: {
            const personId = action.payload.personId;
            const employmentHistoryByApplicantId = action.payload.employmentHistoryByApplicantId;
            const documents = cloneDeep(state.documents);
            documents.unemploymentDetails = action.payload;
            documents.employmentDetails = null;
            return {
                ...state,
                documents,
                currentPersonnelId: action.payload.personId,
                error: ''
            };
        }

        case ApplicationActions.ActionTypes.CreateUnEmploymentDetailsFail: {
            return {
                ...state,
                error: action.payload
            };
        }

        case ApplicationActions.ActionTypes.UpdateEmploymentDetailsSuccess: {
            const personId = action.payload.personId;
            const employmentHistoryByApplicantId = action.payload.employmentHistoryByApplicantId;
            const documents = cloneDeep(state.documents);
            documents.employmentDetails = action.payload;
            documents.unemploymentDetails = null;
            return {
                ...state,
                documents,
                currentPersonnelId: action.payload.personId,
                error: ''
            };
        }

        case ApplicationActions.ActionTypes.UpdateEmploymentDetailsFail: {
            return {
                ...state,
                error: action.payload
            };
        }

        case ApplicationActions.ActionTypes.UpdateUnEmploymentDetailsSuccess: {
            const personId = action.payload.personId;
            const employmentHistoryByApplicantId = action.payload.employmentHistoryByApplicantId;
            const documents = cloneDeep(state.documents);
            documents.unemploymentDetails = action.payload;
            documents.employmentDetails = null;
            return {
                ...state,
                documents,
                currentPersonnelId: action.payload.personId,
                error: ''
            };
        }

        case ApplicationActions.ActionTypes.UpdateUnEmploymentDetailsFail: {
            return {
                ...state,
                error: action.payload
            };
        }

        case ApplicationActions.ActionTypes.ResetCurrentEmploymentHistoryByApplicantId: {
            const existingstate = { ...initialState };
            const newCurrentEmploymentHIstoryByApplicantId = existingstate.currentEmploymentHistoryByApplicantId;
            return {
                ...state,
                currentEmploymentHistoryByApplicantId: newCurrentEmploymentHIstoryByApplicantId
            };
        }


        case ApplicationActions.ActionTypes.LoadListOfDocumentsSuccess: {
            const document = cloneDeep(state.documents);
            document.listOfDocuments = action.payload;
            return {
                ...state,
                documents: document
            };
        }
        case ApplicationActions.ActionTypes.LoadListOfDocumentsFail: {
            return {
                ...state,
                error: action.payload
            };
        }
        case ApplicationActions.ActionTypes.LoadPeopleDocumentsSuccess: {
            const document = cloneDeep(state.documents);
            document.peopleDocuments = action.payload;
            return {
                ...state,
                documents: { ...document }
            };
        }

        case ApplicationActions.ActionTypes.LoadPeopleDocumentsFail: {
            return {
                ...state,
                error: action.payload
            };
        }
        case ApplicationActions.ActionTypes.SetCurrentEmploymentHistoryByApplicantlId: {
            return {
                ...state,
                currentEmploymentHistoryByApplicantId: action.payload,
                error: ''
            };
        }
        case ApplicationActions.ActionTypes.SetAttestationOfGoodMoralCharacterFormId: {
            return {
                ...state,
                agmcFormId: action.payload,
                error: ''
            };
        }

        case ApplicationActions.ActionTypes.LoadFormLookupsSuccess: {
            return {
                ...state,
                formLookups: action.payload
            };
        }
        case ApplicationActions.ActionTypes.CreateAGMCDetailsSuccess: {
            const updatedDocuments = cloneDeep(state.documents);
            updatedDocuments.agmc = action.payload;
            return {
                ...state,
                documents: updatedDocuments,
                error: ''
            };
        }

        case ApplicationActions.ActionTypes.CreateAGMCDetailsFail: {
            return {
                ...state,
                error: action.payload
            };
        }

        case ApplicationActions.ActionTypes.UpdateAGMCDetailsSuccess: {
            const updatedDocuments = cloneDeep(state.documents);
            updatedDocuments.agmc = action.payload;
            return {
                ...state,
                documents: updatedDocuments,
                error: ''
            };
        }

        case ApplicationActions.ActionTypes.UpdateAGMCDetailsFail: {
            return {
                ...state,
                error: ''
            };
        }
        case ApplicationActions.ActionTypes.LoadAGMCDetailsSuccess: {
            const updatedDocuments = cloneDeep(state.documents);
            updatedDocuments.agmc = action.payload;
            return {
                ...state,
                documents: updatedDocuments,
            };

        }
        case ApplicationActions.ActionTypes.LoadAGMCDetailsFail: {
            return {
                ...state,
                error: '',
            };

        }

        case ApplicationActions.ActionTypes.CreateChildAbuseReportingDetailSuccess: {
            const document = cloneDeep(state.documents);
            document.childAbuseReportingDetails = action.payload;
            return {
                ...state,
                documents: { ...document }
            };
        }

        case ApplicationActions.ActionTypes.CreateChildAbuseReportingDetailFail: {
            return {
                ...state,
                error: action.payload
            };
        }

        case ApplicationActions.ActionTypes.UpdateChildAbuseReportingDetailSuccess: {
            const document = cloneDeep(state.documents);
            document.childAbuseReportingDetails = action.payload;
            return {
                ...state,
                documents: { ...document }
            };
        }

        case ApplicationActions.ActionTypes.UpdateChildAbuseReportingDetailFail: {
            return {
                ...state,
                error: action.payload
            };
        }

        case ApplicationActions.ActionTypes.LoadChildAbuseReportingDetailSuccess: {
            const document = cloneDeep(state.documents);
            document.childAbuseReportingDetails = action.payload;
            return {
                ...state,
                documents: { ...document }
            };
        }

        case ApplicationActions.ActionTypes.LoadChildAbuseReportingDetailFail: {
            return {
                ...state,
                error: action.payload
            };
        }

        case ApplicationActions.ActionTypes.LoadZoningAttestationSourceListSuccess: {
            const document = cloneDeep(state.documents);
            document.zoningAttestationSourceList = action.payload;
            return {
                ...state,
                documents: { ...document }
            };
        }

        case ApplicationActions.ActionTypes.LoadZoningAttestationSourceListFail: {
            return {
                ...state,
                error: action.payload
            };
        }

        //#region Self Attestation
        case ApplicationActions.ActionTypes.CreateSelfAttestationDetailSuccess: {
            const document = cloneDeep(state.documents);
            document.selfAttestationDetails = action.payload;
            return {
                ...state,
                documents: { ...document }
            };
        }

        case ApplicationActions.ActionTypes.CreateSelfAttestationDetailFail: {
            return {
                ...state,
                error: action.payload
            };
        }

        case ApplicationActions.ActionTypes.UpdateSelfAttestationDetailSuccess: {
            const document = cloneDeep(state.documents);
            document.selfAttestationDetails = action.payload;
            return {
                ...state,
                documents: { ...document }
            };
        }

        case ApplicationActions.ActionTypes.UpdateSelfAttestationDetailFail: {
            return {
                ...state,
                error: action.payload
            };
        }

        case ApplicationActions.ActionTypes.LoadSelfAttestationDetailSuccess: {
            const document = cloneDeep(state.documents);
            document.selfAttestationDetails = action.payload;
            return {
                ...state,
                documents: { ...document }
            };
        }

        case ApplicationActions.ActionTypes.LoadSelfAttestationDetailFail: {
            return {
                ...state,
                error: action.payload
            };
        }
        //#endregion Self Attestation


        default: {
            return state;
        }
    }
}
