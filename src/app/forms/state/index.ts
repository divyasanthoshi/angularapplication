import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as fromForms from './forms.reducer';

export interface State extends fromRoot.State {
    forms: fromForms.State;
}

const getformProviderState = createFeatureSelector<fromForms.State>('forms');

export const getAllForms = createSelector(
    getformProviderState,
    state => state.forms
);

export const getTrackForms = createSelector(
    getformProviderState,
    state => state.forms.filter( form => form.isArchived === false)
);

export const getArchivedForms = createSelector(
    getformProviderState,
    state => state.forms.filter( form => form.isArchived === true)
);

export const getCurrentForm = createSelector(
    getformProviderState,
    state => state.forms.find(form => form.formId === state.currentFormId)
);

export const getCurrentFormId = createSelector(
    getformProviderState,
    state => state.currentFormId
);

export const getFormLookups = createSelector(
    getformProviderState,
    state => state.lookups
);

export const getFirstTrackFormId = createSelector(
    getformProviderState,
    getTrackForms,
    (state, trackForms) => {
        if (trackForms && trackForms.length > 1) {
            return trackForms[0].formId;
        } else {
            return null;
        }
    }
);

export const getLastTrackFormId = createSelector(
    getformProviderState,
    getTrackForms,
    (state, trackForms) => {
        if (trackForms && trackForms.length > 1) {
            return trackForms[trackForms.length - 1].formId;
        } else {
            return null;
        }
    }
);
