import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, pluck, filter } from 'rxjs/operators';
import { State } from '../../state/app.state';
import { IForm } from '../forms-interface';
import { FormsService } from '../forms.service';
import * as formsActions from './forms.actions';



@Injectable()
export class FormsEffects {
    constructor(
        private formsService: FormsService,
        private actions$: Actions,
        private store$: Store<State>,
    ) { }

    @Effect()
    getForms$: Observable<Action> = this.actions$.pipe(
        ofType(formsActions.ActionTypes.LoadForms),
        map(action => (action as formsActions.LoadForms)),
        mergeMap((action) =>
            this.formsService.getForms(action.payload).pipe(
                filter(value => typeof (value) !== 'string' && value !== null),
                map(forms => new formsActions.LoadFormsSuccess(forms)),
                catchError(err => of(new formsActions.LoadFormsFail(err)))
            )
        )
    );

    @Effect()
    archiveForm$ = this.actions$.pipe(
        ofType(formsActions.ActionTypes.ArchiveForm),
        map(action => (action as formsActions.ArchiveForm)),
        mergeMap((action) =>
            this.formsService.archiveForm(action.payload).pipe(
                map((form: IForm) => new formsActions.ArchiveFormSuccess(form)),
                catchError(err => of(new formsActions.ArchiveFormFail(err)))
            )
        )
    );

    // load form lookup values
    @Effect()
    loadFormLookups$: Observable<Action> = this.actions$.pipe(
        ofType(formsActions.ActionTypes.LoadFormLookups),
        map(action => (action as formsActions.LoadFormLookups)),
        mergeMap(action => {
            return this.formsService.getFormLookups().pipe(
                map(formLookups => new formsActions.LoadFormLookupsSuccess(formLookups)),
                catchError(err => of(new formsActions.LoadFormLookupsFail(err)))
            );
        })
    );
}
