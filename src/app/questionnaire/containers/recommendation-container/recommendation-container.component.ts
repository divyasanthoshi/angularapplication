import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, tap, map } from 'rxjs/operators';
import { RecommendationInfo } from '../../questionnaire-interface';
import * as fromQuestionnaire from '../../state';
import { Router } from '@angular/router';
import { QuestionnaireConstants } from '../../questionnaire.constant';
import { ApplicationConstants } from 'src/app/application/application.constants';
import { ChildrenCount } from '../../questionnaire-enum';
import { ProgramType, LicenseStatus } from 'src/app/_shared/enum';
import { QuestionnaireRecommendationComponent } from '../../questionnaire-recommendation/questionnaire-recommendation.component';

@Component({
  selector: 'app-recommendation-container',
  templateUrl: './recommendation-container.component.html',
  styleUrls: ['./recommendation-container.component.scss'],
})
export class RecommendationContainerComponent implements OnInit {
  currentRecommandations$: Observable<RecommendationInfo[]>;
  propertyId$: Observable<number>;
  childrenRange$: Observable<number>;

  nextPageUrl = `${ApplicationConstants.url.page.providerprofile}`;
  startPageUrl = `/questionnaire/propertytype`;
  previousPageUrl = '';
  @ViewChild(QuestionnaireRecommendationComponent)
  private recommendation: QuestionnaireRecommendationComponent;

  constructor(
    private store: Store<fromQuestionnaire.State>,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentRecommandations$ = this.store.pipe(select(fromQuestionnaire.getRecommandationInfo));
    this.propertyId$ = this.store.pipe(select(fromQuestionnaire.getPropertyType));
    this.childrenRange$ = this.store.pipe(select(fromQuestionnaire.getChildrenRange));
    this.childrenRange$.subscribe((value) => {
      if (value === ChildrenCount.TwoToTenKids) {
        this.previousPageUrl = `${QuestionnaireConstants.parentSegment}/${QuestionnaireConstants.urlList[2]}`;
      } else {
        this.previousPageUrl = `${QuestionnaireConstants.parentSegment}/${QuestionnaireConstants.urlList[3]}`;
      }
    });
  }

  // Business Validation for Provider Profile Page
  onApply() {
    this.currentRecommandations$.pipe(take(1)).subscribe((recommendations: RecommendationInfo[]) => {
      if (recommendations && recommendations.length) {
        const doingBusiness: boolean = recommendations.some((recommendation: RecommendationInfo) => {
          return (recommendation.programTypeId === ProgramType.FamilyDayCareHome || recommendation.programTypeId === ProgramType.LargeFamilyChildCareHome) &&
            (recommendation.licenseStatusId === LicenseStatus.Licensed || recommendation.licenseStatusId === LicenseStatus.Registered);
        });

        // Todo: use this apply method and pass the doingBusiness object from state to application provider component
        // this.sharedService.doingBusiness$.next(doingBusiness);
      }
    });
  }

  navigateTo() {
    this.router.navigate([this.nextPageUrl]);
  }

  navigateToStart() {
    this.router.navigate([this.startPageUrl]);
  }

}
