import * as fromRoot from '../../state/app.state';
import * as fromQuestionnaire from './questionnaire.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State extends fromRoot.State {
    questionnaire: fromQuestionnaire.State;
}

const getQuestionnaireFeatureState = createFeatureSelector<fromQuestionnaire.State>('questionnaire');

export const getLookupPropertyType = createSelector(
    getQuestionnaireFeatureState,
    state => state.lookups ? state.lookups.lookupPropertyType : null
);

export const getLookupZipcode = createSelector(
    getQuestionnaireFeatureState,
    state => {
        return state.lookups && state.lookups.lookupZipCode ? state.lookups.lookupZipCode : null;
    }
);

export const getLookupChildrenRange = createSelector(
    getQuestionnaireFeatureState,
    state => state.lookups ? state.lookups.lookupChildrenRange : null
);

export const getQuestionnaire = createSelector(
    getQuestionnaireFeatureState,
    state => state.questionnaire
);

export const getPropertyType = createSelector(
    getQuestionnaireFeatureState,
    state => state.questionnaire.propertyTypeId
);

export const getZipcode = createSelector(
    getQuestionnaireFeatureState,
    state => state.questionnaire.zipcode
);

export const getChildrenRange = createSelector(
    getQuestionnaireFeatureState,
    state => state.questionnaire.childrenRangeId
);

export const getDisabledCare = createSelector(
    getQuestionnaireFeatureState,
    state => state.questionnaire.isDisabledCare
);

export const getRecommandationInfo = createSelector(
    getQuestionnaireFeatureState,
    state => state.recommandation
);
