import { Action } from '@ngrx/store';
import { FormLookups, IForm } from './../forms-interface';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum ActionTypes {
    LoadForms = '[Forms] LoadForms',
    LoadFormsSuccess = '[Forms] LoadFormsSuccess',
    LoadFormsFail = '[Forms] LoadFormsFail',
    LoadFormLookups = '[Forms] LoadFormLookups',
    LoadFormLookupsSuccess = '[Forms] LoadFormLookupsSuccess',
    LoadFormLookupsFail = '[Forms] LoadFormLookupsFail',
    SetCurrentFormId = '[Forms] SetCurrentFormId',
    ArchiveForm = '[Forms] ArchiveForm',
    ArchiveFormSuccess = '[Forms] ArchiveFormSuccess',
    ArchiveFormFail = '[Forms] ArchiveFormFail',
    SubmitForm = '[Forms] SubmitForm',
    SubmitFormSuccess = '[Forms] SubmitFormSuccess',
    SubmitFormFail = '[Forms] SubmitFormFail'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadForms implements Action {
    readonly type = ActionTypes.LoadForms;

    constructor(public payload: number) { }
}

export class LoadFormsSuccess implements Action {
    readonly type = ActionTypes.LoadFormsSuccess;

    constructor(public payload: IForm) { }
}

export class LoadFormsFail implements Action {
    readonly type = ActionTypes.LoadFormsFail;

    constructor(public payload: IForm) { }
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

export class SetCurrentFormId {
    readonly type = ActionTypes.SetCurrentFormId;

    constructor(public payload: number) { }
}

export class ArchiveForm {
    readonly type = ActionTypes.ArchiveForm;

    constructor(public payload: IForm) { }
}

export class ArchiveFormSuccess {
    readonly type = ActionTypes.ArchiveFormSuccess;

    constructor(public payload: IForm) { }
}

export class ArchiveFormFail {
    readonly type = ActionTypes.ArchiveFormFail;

    constructor(public payload: string) { }
}

export class SubmitForm implements Action {
    readonly type = ActionTypes.SubmitForm;

    constructor(public payload: {formId: number, formStatusId: number}) { }
}

export class SubmitFormSuccess implements Action {
    readonly type = ActionTypes.SubmitFormSuccess;

    constructor(public payload: IForm) { }
}


export class SubmitFormFail implements Action {
    readonly type = ActionTypes.SubmitFormFail;

    constructor(public payload: string) { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
// export type FormActions = AddFormAction
export type FormActions = LoadForms
    | LoadFormsSuccess
    | LoadFormsFail
    | LoadFormLookups
    | LoadFormLookupsSuccess
    | LoadFormLookupsFail
    | SetCurrentFormId
    | ArchiveForm
    | ArchiveFormSuccess
    | ArchiveFormFail
    | SubmitForm
    | SubmitFormSuccess
    | SubmitFormFail
    ;

