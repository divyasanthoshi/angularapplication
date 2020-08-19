import { FormLookups, IForm } from './../forms-interface';
import * as FormsAction from './forms.actions';
import { cloneDeep } from 'lodash';


export interface State {
    forms: IForm[];
    lookups: FormLookups;
    currentFormId: number;
    error: string;
}

const initialState: State = {
    forms: [],
    lookups: null,
    currentFormId: null,
    error: ''
};

export function FormsReducer(state = initialState, action: FormsAction.FormActions) {
    switch (action.type) {

        case FormsAction.ActionTypes.LoadFormsSuccess: {
            return {
                ...state,
                forms: action.payload
            };
        }

        case FormsAction.ActionTypes.LoadFormsFail: {
            return {
                ...state,
                error: action.payload
            };
        }

        case FormsAction.ActionTypes.LoadFormLookupsSuccess: {
            return {
                ...state,
                lookups: action.payload
            };
        }
        case FormsAction.ActionTypes.SetCurrentFormId: {
            return {
                ...state,
                currentFormId: action.payload
            };
        }

        case FormsAction.ActionTypes.ArchiveFormSuccess: {
            const formId = action.payload.formId;
            const forms = cloneDeep(state.forms);
            // if the personId is valid
            if (formId) {
                const index = forms.findIndex((form) => form.formId === formId);
                // if the personnel exists, replace the personnel in people, otherwise, push in the array
                if (index > -1) {
                    forms[index] = action.payload;
                } else {
                    forms.push(action.payload);
                }
            }
            return {
                ...state,
                forms,
                currentFormId: action.payload.formId,
                error: ''
            };
        }

        case FormsAction.ActionTypes.ArchiveFormFail: {
            return {
                ...state,
                error: action.payload
            };
        }

        case FormsAction.ActionTypes.SubmitFormSuccess: {
            const updatedForms = state.forms.map(
                form => action.payload.formId === form.formId ? action.payload : form
            );
            return {
                ...state,
                forms: updatedForms,
                currentFormId: action.payload.formId,
                error: ''
            };
        }

        case FormsAction.ActionTypes.SubmitFormFail: {
            return {
                ...state,
                forms: null,
                error: action.payload
            };
        }

        default: {
            return state;
        }
    }
}
