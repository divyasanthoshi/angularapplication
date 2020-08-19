import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { QuestionnaireSickchildrenComponent } from '../../questionnaire-sickchildren/questionnaire-sickchildren.component';
import { QuestionnaireConstants } from '../../questionnaire.constant';
import * as fromQuestionnaire from '../../state';
import * as questionnaireActions from '../../state/questionnaire.actions';
import { Constant } from 'src/app/_shared/constant';


@Component({
  selector: 'app-sickchildren-container',
  templateUrl: './sickchildren-container.component.html',
  styleUrls: ['./sickchildren-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SickchildrenContainerComponent implements OnInit {

  currentDisabledCare$: Observable<boolean>;
  nextPageUrl = `${QuestionnaireConstants.parentSegment}/${QuestionnaireConstants.urlList[4]}`;
  previousPageUrl = `${QuestionnaireConstants.parentSegment}/${QuestionnaireConstants.urlList[2]}`;

  @ViewChild(QuestionnaireSickchildrenComponent, { static: true }) disabledChildren: QuestionnaireSickchildrenComponent;

  constructor(private store: Store<fromQuestionnaire.State>) { }

  ngOnInit() {
    this.currentDisabledCare$ = this.store.pipe(select(fromQuestionnaire.getDisabledCare));
  }

  selectDisabledCare(isDisabledCare: boolean) {
    this.store.dispatch(new questionnaireActions.SetDisabledCare(isDisabledCare));
  }

  nextPage() {
      // Page Level validation
      const valid = this.disabledChildren.validateForm();
      if (valid) {
      this.disabledChildren.isShow = false;
      this.store.dispatch(new questionnaireActions.PostQuestionnaire());
      //setTimeout(() => {
       // this.router.navigate([this.nextPageUrl]);
     // }, Constant.animation.pageLeaveDelay);
    }
  }
}
