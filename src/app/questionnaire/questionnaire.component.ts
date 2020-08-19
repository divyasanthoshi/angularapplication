import { Component, OnInit, ChangeDetectionStrategy, HostListener, ɵConsole } from '@angular/core';
import { Router, UrlTree, ActivatedRoute, ChildActivationEnd, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromQuestionnaire from './state';
import * as questionnaireActions from './state/questionnaire.actions';
import { QuestionnaireConstants } from './questionnaire.constant';
import { ChildrenCount } from './questionnaire-enum';
import { filter, take } from 'rxjs/operators';


@Component({
    selector: 'app-questionnaire',
    templateUrl: './questionnaire.component.html',
    styleUrls: ['../../stylesheet/modules/ion-card-legend.scss', './questionnaire.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionnaireComponent implements OnInit {

    currentChildrenRange$: Observable<number>;
    pageView = 'propertytype';
    childValue: number;
    showHeader = true;
    constructor(
        private store: Store<fromQuestionnaire.State>,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.store.dispatch(new questionnaireActions.GetLookups());
        this.currentChildrenRange$ = this.store.pipe(select(fromQuestionnaire.getChildrenRange));
        this.currentChildrenRange$.subscribe((data) => {
            this.childValue = data;
        });
        this.router.events.pipe(
            filter(event => event instanceof ChildActivationEnd),
          ).subscribe((event: any) => {
            const url = event.snapshot._routerState.url;
            if (url && (url.includes('recommendation'))) {
                this.showHeader = false;
            } else {
                this.showHeader = true;
            }
          });
    }

    logQuestionnaire() {
        this.store.dispatch(new questionnaireActions.PostQuestionnaire());
    }

    nextPage() {
        // list of the child url segment that is going to navigate to
        const urlList = QuestionnaireConstants.urlList;
        // get the current url tree
        const urlTree: UrlTree = this.router.parseUrl(this.router.url);
        // get all the segment of the url
        const pageSegments = urlTree.root.children.primary.segments;
        // get the last segment of the url
        const relativeUrl = pageSegments[pageSegments.length - 1].path.toLowerCase();
        let increment = 1;
        // if the value of children is 2 to 10 kids, navigate to recommendation otherwise to disabledcare
        if (relativeUrl === 'children' && this.childValue === ChildrenCount.TwoToTenKids) {
            increment = 2;
            this.logQuestionnaire();
        }
        if (relativeUrl === 'disabledcare') {
            this.logQuestionnaire();
        }
        // get the child url of next page
        const nextPageChildUrl = urlList[urlList.indexOf(relativeUrl) + increment];
        // get the url of the next page
        let navigateUrl = QuestionnaireConstants.parentSegment.concat(nextPageChildUrl);

        if (relativeUrl === 'recommendation') {
            navigateUrl = '/providerprofile';
        }
        this.router.navigate([navigateUrl]);
    }

    previousPage() {
        // list of the child url segment that is going to navigate to
        const urlList = QuestionnaireConstants.urlList;
        // get the current url tree
        const urlTree: UrlTree = this.router.parseUrl(this.router.url);
        // get all the segment of the url
        const pageSegments = urlTree.root.children.primary.segments;
        // get the last segment of the url
        const relativeUrl = pageSegments[pageSegments.length - 1].path.toLowerCase();
        let increment = 1;
        // if the value of children is 2 to 10 kids, navigate to recommendation otherwise to disabledcare
        if (relativeUrl === 'recommendation' && this.childValue === ChildrenCount.TwoToTenKids) {
            increment = 2;
        }
        // get the child url of next page
        const nextPageChildUrl = urlList[urlList.indexOf(relativeUrl) - increment];
        // get the url of the next page
        const navigateUrl = QuestionnaireConstants.parentSegment.concat(nextPageChildUrl);
        this.router.navigate([navigateUrl]);
    }

    goHomePage() {
        this.router.navigate(['/forms']);
    }

    @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
        if (confirm('host You have unsaved changes! If you leave, your changes will be lost.')) {
            return true;
        } else {
          return false;
        }
      }

}
