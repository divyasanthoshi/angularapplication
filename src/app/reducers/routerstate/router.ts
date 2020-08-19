import {Data, Params, RouterStateSnapshot} from '@angular/router';
import {RouterReducerState} from '@ngrx/router-store';
import { Route } from '../index';
export interface MergedRoute {
  url: string;
  queryParams: Params;
  params: Params;
  data: Data;
}


import { RouterStateSerializer } from '@ngrx/router-store';
export interface RouterStateUrl {
  state: Route;
}

export class CustomSerializer implements RouterStateSerializer<any> {
  serialize(routerState: RouterStateSnapshot): any {
    let route = routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const {
      url,
      root: { queryParams },
    } = routerState;
    const { params } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams };
  }
}
