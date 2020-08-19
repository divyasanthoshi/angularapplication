import { Action } from '@ngrx/store';
import {
    LookupQuestionnaire,
    RecommendationInfo
} from '../questionnaire-interface';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum ActionTypes {
    GetLookups = '[Questionnaire] LoadLookups',
    GetLookupsSuccess = '[Questionnaire] LoadLookupsSuccess',
    GetLookupsFail = '[Questionnaire] LoadLookupsFail',
    SetPropertyType = '[Questionnaire] SetPropertyType',
    SetZipcode = '[Questionnaire] SetZipcode',
    SetChildrenRange = '[Questionnaire] SetChildrenRange',
    SetDisabledCare = '[Questionnaire] SetDisabledCare',
    PostQuestionnaire = '[Questionnaire] PostQuestionnaire',
    PostQuestionnaireSuccess = '[Questionnaire] PostQuestionnaireSuccess',
    PostQuestionnaireFail = '[Questionnaire] PostQuestionnaireFail',
    ClearDisabledCare = '[Questionnaire] ClearDisabledCare',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

export class GetLookups implements Action {
    readonly type = ActionTypes.GetLookups;
}

export class GetLookupsSuccess implements Action {
    readonly type = ActionTypes.GetLookupsSuccess;

    constructor(public payload: LookupQuestionnaire) { }
}

export class GetLookupsFail implements Action {
    readonly type = ActionTypes.GetLookupsFail;

    constructor(public payload: string) { }
}

export class SetPropertyType implements Action {
    readonly type = ActionTypes.SetPropertyType;

    constructor(public payload: number) { }
}

export class SetZipcode implements Action {
    readonly type = ActionTypes.SetZipcode;

    constructor(public payload: number) { }
}

export class SetChildrenRange implements Action {
    readonly type = ActionTypes.SetChildrenRange;

    constructor(public payload: number) { }
}

export class SetDisabledCare implements Action {
    readonly type = ActionTypes.SetDisabledCare;

    constructor(public payload: boolean) { }
}

export class PostQuestionnaire implements Action {
    readonly type = ActionTypes.PostQuestionnaire;
}

export class PostQuestionnaireSuccess implements Action {
    readonly type = ActionTypes.PostQuestionnaireSuccess;

    constructor(public payload: RecommendationInfo[]) { }
}

export class PostQuestionnaireFail implements Action {
    readonly type = ActionTypes.PostQuestionnaireFail;

    constructor(public payload: string) { }
}

export class ClearDisabledCare implements Action {
    readonly type = ActionTypes.ClearDisabledCare;
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
                        = GetLookups
                        | GetLookupsSuccess
                        | GetLookupsFail
                        | SetPropertyType
                        | SetZipcode
                        | SetChildrenRange
                        | SetDisabledCare
                        | PostQuestionnaire
                        | PostQuestionnaireSuccess
                        | PostQuestionnaireFail
                        | ClearDisabledCare
                        ;
