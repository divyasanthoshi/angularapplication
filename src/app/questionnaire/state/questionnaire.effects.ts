import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, catchError, map, withLatestFrom, tap } from 'rxjs/operators';

import * as questionnaireActions from './questionnaire.actions';
import { QuestionnaireService } from '../questionnaire.service';
import { State } from '../../state/app.state';
import * as fromQuestionnaire from '.';
import { QuestionnaireConstants } from '../questionnaire.constant';
import {Router} from '@angular/router';

@Injectable()
export class QuestionnaireEffects {
    recommendationPageUrl = `${QuestionnaireConstants.parentSegment}/${QuestionnaireConstants.urlList[4]}`;
    constructor(
        private questionnaireService: QuestionnaireService,
        private actions$: Actions,
        private store$: Store<State>,
        private router: Router
    ) {}

    // get lookup values for questionnaire
    @Effect()
    getLookups$: Observable<Action> = this.actions$.pipe(
        ofType(questionnaireActions.ActionTypes.GetLookups),
        mergeMap(() =>
            this.questionnaireService.getQuestionnaireLookups().pipe(
                map(lookups => new questionnaireActions.GetLookupsSuccess(lookups)),
                catchError(err => of(new questionnaireActions.GetLookupsFail(err))
                )
            )
        )
    );

    // post questionnaire to get recommendationinfo
    @Effect()
    getQuestionnaire$: Observable<Action> = this.actions$.pipe(
        ofType(questionnaireActions.ActionTypes.PostQuestionnaire),
        withLatestFrom(this.store$.select(fromQuestionnaire.getQuestionnaire)),
        mergeMap(([_, questionnaire]) =>
            this.questionnaireService.getQuestionnaire(questionnaire).pipe(
                map(recommendation => (new questionnaireActions.PostQuestionnaireSuccess(recommendation))),
                catchError(err => of(new questionnaireActions.PostQuestionnaireFail(err)))
            )
        )
    );
    @Effect({dispatch: false})
    postQuestionnaireSuccess$ = this.actions$.pipe(
        ofType(questionnaireActions.ActionTypes.PostQuestionnaireSuccess),
        map(action => action as questionnaireActions.PostQuestionnaireSuccess),
        tap(() => this.router.navigateByUrl(this.recommendationPageUrl))
    );
    @Effect({dispatch: false})
    postQuestionnaireFail$ = this.actions$.pipe(
        ofType(questionnaireActions.ActionTypes.PostQuestionnaireFail),
        map(action => action as questionnaireActions.PostQuestionnaireFail),
        tap(() => this.router.navigateByUrl(this.recommendationPageUrl))
    );

}
