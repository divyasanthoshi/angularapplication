import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ChildrenCount } from '../../questionnaire-enum';
import { LookupChildrenRange } from '../../questionnaire-interface';
import * as fromQuestionnaire from '../../state';
import * as questionnaireActions from '../../state/questionnaire.actions';
import { QuestionnaireConstants } from '../../questionnaire.constant';
import { QuestionnaireChildrenComponent } from '../../questionnaire-children/questionnaire-children.component';
import { Constant } from 'src/app/_shared/constant';

@Component({
    selector: 'app-children-container',
    templateUrl: './children-container.component.html',
    styleUrls: ['./children-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildrenContainerComponent implements OnInit {

    lookupChildrenRange$: Observable<LookupChildrenRange[]>;
    currentChildrenRange$: Observable<number>;
    childrenRange: number;
    nextPageUrl = `${QuestionnaireConstants.parentSegment}/${QuestionnaireConstants.urlList[4]}`;
    previousPageUrl = `${QuestionnaireConstants.parentSegment}/${QuestionnaireConstants.urlList[1]}`;

    @ViewChild(QuestionnaireChildrenComponent, { static: true }) children: QuestionnaireChildrenComponent;

    constructor(private store: Store<fromQuestionnaire.State>,
                private router: Router) { }

    ngOnInit() {
        this.lookupChildrenRange$ = this.store.pipe(select(fromQuestionnaire.getLookupChildrenRange));
        this.currentChildrenRange$ = this.store.pipe(select(fromQuestionnaire.getChildrenRange));
        this.currentChildrenRange$.subscribe((value) => {
            this.childrenRange = value;
            if (value === ChildrenCount.TwoToTenKids) {
                this.nextPageUrl = `${QuestionnaireConstants.parentSegment}/${QuestionnaireConstants.urlList[4]}`;
            } else {
                this.nextPageUrl = `${QuestionnaireConstants.parentSegment}/${QuestionnaireConstants.urlList[3]}`;
            }
        });
    }

    childrenRangeValue(childrenRange: number) {
        this.store.dispatch(new questionnaireActions.SetChildrenRange(childrenRange));
        // if the 2-10 kids options is selected, clear the disabled care value
        if (childrenRange === ChildrenCount.TwoToTenKids) {
            this.nextPageUrl = `${QuestionnaireConstants.parentSegment}/${QuestionnaireConstants.urlList[4]}`;
            this.store.dispatch(new questionnaireActions.ClearDisabledCare());
        } else {
            this.nextPageUrl = `${QuestionnaireConstants.parentSegment}/${QuestionnaireConstants.urlList[3]}`;
        }
    }

    nextPage() {
        this.children.isShow = false;

        if (this.childrenRange === ChildrenCount.TwoToTenKids) {
            this.store.dispatch(new questionnaireActions.PostQuestionnaire());
        } else {
            setTimeout(() => {
                this.router.navigate([this.nextPageUrl]);
            }, Constant.animation.pageLeaveDelay);
        }

    }
}
