import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';



export const GO = '[Router] Go';
export const BACK = '[Router] Back';
export const FORWARD = '[Router] Forward';

export enum ActionTypes {
   GO = '[Router] Go',
  BACK = '[Router] Back',
  FORWARD = '[Router] Forward'
}

export class Go implements Action {
    readonly type = ActionTypes.GO;

    constructor(public payload: {
                path: any[];
                query?: object;
              extras?: NavigationExtras;
    })       {}
}

export class Forward implements Action {
  readonly type = FORWARD;
}

export class Back implements Action {
  readonly type = BACK;
}

export type Actions = Go
                | Forward
                | Back
                ;
