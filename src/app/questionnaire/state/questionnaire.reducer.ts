import * as QuestionnaireAction from './questionnaire.actions';
import { Questionnaire, LookupQuestionnaire, RecommendationInfo } from '../questionnaire-interface';

export interface State {
         questionnaire: Questionnaire;
         lookups: LookupQuestionnaire;
         recommandation: RecommendationInfo[];
         error: string;
}

const initialState: State = {
        questionnaire: {
            propertyTypeId: null,
            zipcode: null,
            childrenRangeId: 1,
            isDisabledCare: null
        },
        lookups: null,
        recommandation: [],
        error: ''
};

export function reducer(state = initialState, action: QuestionnaireAction.Actions ): State {

    switch (action.type) {

        case QuestionnaireAction.ActionTypes.GetLookupsSuccess: {
            return {
                ...state,
                lookups: action.payload,
                error: ''
            };
        }

        case QuestionnaireAction.ActionTypes.GetLookupsFail: {
            return {
                ...state,
                error: action.payload
            };
        }

        case QuestionnaireAction.ActionTypes.SetPropertyType: {
            return {
                ...state,
                questionnaire: {
                    ...state.questionnaire,
                    propertyTypeId: action.payload
                },
            };
        }

        case QuestionnaireAction.ActionTypes.SetZipcode: {
            return {
                ...state,
                questionnaire: {
                    ...state.questionnaire,
                    zipcode: action.payload
                }
            };
        }

        case QuestionnaireAction.ActionTypes.SetChildrenRange: {
            return {
                ...state,
                questionnaire: {
                    ...state.questionnaire,
                    childrenRangeId: action.payload
                }
            };
        }

        case QuestionnaireAction.ActionTypes.SetDisabledCare: {
            return{
                ...state,
                questionnaire: {
                    ...state.questionnaire,
                    isDisabledCare: action.payload
                }
            };
        }

        case QuestionnaireAction.ActionTypes.PostQuestionnaireSuccess: {
            return {
                ...state,
                recommandation: action.payload,
                error: ''
            };
        }

        case QuestionnaireAction.ActionTypes.PostQuestionnaireFail: {
            return {
                ...state,
                error: action.payload
            };
        }

        case QuestionnaireAction.ActionTypes.ClearDisabledCare: {
            return{
                ...state,
                questionnaire: {
                    ...state.questionnaire,
                    isDisabledCare: null
                }
            };
        }
        default: {
            return state;
        }
    }
}
