import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Checkbox } from 'src/app/_shared/Interfaces/utility';
import { sortBy } from 'lodash';
import * as fromRoot from '../../state/app.state';
import * as fromApplication from './application.reducer';
import * as fromForms from '../../forms/state/forms.reducer';
import * as fromQuestionnaire from '../../questionnaire/state/questionnaire.reducer';
import * as fromRouter from '../../reducers/index';

export interface State extends fromRoot.State {
    application: fromApplication.State;
}

export interface RouterState extends fromRoot.State {
    router: fromRouter.RouterState;
}

const getApplicationFeatureState = createFeatureSelector<fromApplication.State>('application');
const getQuesionnaireFeatureState = createFeatureSelector<fromQuestionnaire.State>('questionnaire');
const getFormFeatureState = createFeatureSelector<fromForms.State>('forms');
const getRouterFeatureState = createFeatureSelector<fromRouter.RouterState>('router');

export const getRouterInfo = createSelector(
    getRouterFeatureState,
    state => state.state
);

// export const getForm = createSelector(
//     getFormFeatureState,
//     state => state.formProvider && state.formProvider.length ? state.formProvider[0] : null
// );

export const getProgramTypeId = createSelector(
    getQuesionnaireFeatureState,
    state => {
        if (state && state.recommandation && state.recommandation.length > 0) {
            return state.recommandation[0].programTypeId;
        }
    }
);

export const getFormId = createSelector(
    getApplicationFeatureState,
    state => state.provider.formId
);

export const getFormIdByProviderId = createSelector(
    getFormFeatureState,
    getApplicationFeatureState,
    (formState, applicationState) => {
        if (formState && formState.forms && formState.forms.length && applicationState.provider.formId) {
            // return formState.formProvider.filter((form) => {
            //     return form.providerId === applicationState.provider.providerId;
            // })[0].formId;
            return formState.forms.find((form) => {
                return form.formId === applicationState.provider.formId;
            });
        }
    }
);

export const getLicenseStatusId = createSelector(
    getQuesionnaireFeatureState,
    state => {
        if (state && state.recommandation && state.recommandation.length > 0) {
            return state.recommandation[0].licenseStatusId;
        }
    }
);

export const getPeople = createSelector(
    getApplicationFeatureState,
    state => {
        return sortBy(state.people, ['firstName']);
    }
);

export const getCurrentPersonId = createSelector(
    getApplicationFeatureState,
    state => state.currentPersonnelId
);


export const getCurrentPerson = createSelector(
    getApplicationFeatureState,
    getCurrentPersonId,
    (state, currentPersonId) => {
        return (currentPersonId === 0 || currentPersonId) && state.people && state.people instanceof Array && state.people.length ? state.people.find(p => p.personId === currentPersonId) : null;
    }
);

export const getApplicationLookups = createSelector(
    getApplicationFeatureState,
    state => state.lookups
);
export const getFormLookups = createSelector(
    getApplicationFeatureState,
    state => state.formLookups
);

export const getPersonTypeLookup = createSelector(
    getApplicationFeatureState,
    state => state.lookups.lookupPersonType
);

export const getIsIncorporated = createSelector(
    getApplicationFeatureState,
    state => state.ownership.isIncorporated
);

export const getOwnership = createSelector(
    getApplicationFeatureState,
    state => state.ownership
);

export const getOwnershipType = createSelector(
    getApplicationFeatureState,
    state => state.ownership.ownershipTypeId
);


export const getOrganization = createSelector(
    getApplicationFeatureState,
    state => state.ownership.organization
);

export const getDocumentNumber = createSelector(
    getApplicationFeatureState,
    state => state.ownership.organization.documentNumber
);

export const getOrganizationTypeLookups = createSelector(
    getApplicationFeatureState,
    state => state.lookups.lookupOrganizationType
);


export const getOwnershipTypeLookups = createSelector(
    getApplicationFeatureState,
    state => state.lookups.lookupOwnership
);

export const getOwnerIdsCheckbox = createSelector(
    getApplicationFeatureState,
    state => {
        const peoplelist = state.people;
        const ownerlist: Checkbox[] = [];
        return ownerlist;
    }
);

export const getCurrentProviderId = createSelector(
    getApplicationFeatureState,
    state => state.provider.providerId
);

export const getProvider = createSelector(
    getApplicationFeatureState,
    state => state.provider
);

export const getPersonTitlePlusLookups = createSelector(
    getApplicationFeatureState,
    state => state.lookups.lookupPersonTitlePlus
);

export const getServiceLookups = createSelector(
    getApplicationFeatureState,
    state => state.lookups.lookupServiceType
);

export const getServices = createSelector(
    getApplicationFeatureState,
    state => state.services
);
export const getMonthsofOperationLookups = createSelector(
    getApplicationFeatureState,
    state => state.lookups.lookupMonthsOfOperation
);
export const getBusinessHours = createSelector(
    getApplicationFeatureState,
    state => state.businessHours
);

export const getDocumentsList = createSelector(
    getApplicationFeatureState,
    state => state.documents.listOfDocuments
);

export const getPeopleDocuments = createSelector(
    getApplicationFeatureState,
    state => state.documents.peopleDocuments
);

export const getPeopleDocumentByPersonId = createSelector(
    getApplicationFeatureState,
    state => state.documents.peopleDocuments && state.documents.peopleDocuments.formList && state.documents.peopleDocuments.formList.length ?
        state.documents.peopleDocuments.formList.find(formItem => formItem.personId === state.currentPersonnelId) : {}
);

export const getEmploymentHistory = createSelector(
    getApplicationFeatureState,
    state => state.documents.employmentHistory
);

export const getCurrentEmploymentHistoryByApplicantId = createSelector(
    getApplicationFeatureState,
    state => state.currentEmploymentHistoryByApplicantId
);
export const getCurrentEmploymentHistoryFormId = createSelector(
    getApplicationFeatureState,
    state => state.currentEmploymentHistoryFormId
);


export const getEmploymentDetails = createSelector(
    getApplicationFeatureState,
    state => state.documents.employmentDetails
);

export const getUnEmploymentDetails = createSelector(
    getApplicationFeatureState,
    state => state.documents.unemploymentDetails
);
export const getAGMCDetails = createSelector(
    getApplicationFeatureState,
    state => state.documents.agmc
);
export const getAGMCFormId = createSelector(
    getApplicationFeatureState,
    state => state.agmcFormId
);

export const getChildAbuseReportingDetails = createSelector(
    getApplicationFeatureState,
    state => state.documents.childAbuseReportingDetails
);

export const getZoningAttestationSourceList = createSelector(
    getApplicationFeatureState,
    state => state.documents.zoningAttestationSourceList
);

export const getSelfAttestationDetails = createSelector(
    getApplicationFeatureState,
    state => state.documents.selfAttestationDetails
);




