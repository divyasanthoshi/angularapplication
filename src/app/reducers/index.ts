import { ActionReducerMap, MetaReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';
import { State } from '../state/app.state';
import { routerReducer, RouterReducerState, getSelectors } from '@ngrx/router-store';
import {Params, } from '@angular/router';

// reducer for state
export const reducers: ActionReducerMap<State> = {
    router: routerReducer
  };

export const metaReducers: MetaReducer<State>[] = !environment.production ? [storeFreeze] : [];

export interface RouterState {
state: Route;
}

export interface Route {
  url: string;
  params: Params;
  queryParams: Params;
  navigationId: number;
}










