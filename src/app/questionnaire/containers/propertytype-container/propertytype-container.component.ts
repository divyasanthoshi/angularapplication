import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LookupPropertyType } from '../../questionnaire-interface';
import * as fromQuestionnaire from '../../state';
import * as questionnaireActions from '../../state/questionnaire.actions';
import { QuestionnaireConstants } from '../../questionnaire.constant';
import { QuestionnairePropertytypeComponent } from '../../questionnaire-propertytype/questionnaire-propertytype.component';
import { Constant } from 'src/app/_shared/constant';



@Component({
  selector: 'app-propertytype-container',
  templateUrl: './propertytype-container.component.html',
  styleUrls: ['./propertytype-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class  PropertytypeContainerComponent implements OnInit {

  lookupPropertyType$: Observable<LookupPropertyType[]>;
  currentPropertyTypeId$: Observable<number>;
  nextPageUrl = `${QuestionnaireConstants.parentSegment}/${QuestionnaireConstants.urlList[1]}`;

  @ViewChild(QuestionnairePropertytypeComponent, { static: true }) propertyType: QuestionnairePropertytypeComponent;

  constructor(private store: Store<fromQuestionnaire.State>, private router: Router) { }

  ngOnInit() {
    this.lookupPropertyType$ = this.store.pipe(select(fromQuestionnaire.getLookupPropertyType));
    this.currentPropertyTypeId$ = this.store.pipe(select(fromQuestionnaire.getPropertyType));
  }

  // this is used to unselected the previous property type and select the new property type
  selectPropertyType(selectedValue: number) {
    this.store.dispatch(new questionnaireActions.SetPropertyType(selectedValue));
  }

  // Page Level validation
  validatePropertyType() {
    const valid = this.propertyType.validateForm();
    if (valid) {
      this.propertyType.isShow = false;
      setTimeout(() => {
        this.router.navigate([this.nextPageUrl]);
      }, Constant.animation.pageLeaveDelay);
    }
  }
}
