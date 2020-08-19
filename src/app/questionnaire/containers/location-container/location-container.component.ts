import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LookupZipcode } from '../../questionnaire-interface';
import * as fromQuestionnaire from '../../state';
import * as questionnaireActions from '../../state/questionnaire.actions';
import { Router } from '@angular/router';
import { QuestionnaireConstants } from '../../questionnaire.constant';
import { QuestionnaireLocationComponent } from '../../questionnaire-location/questionnaire-location.component';
import { ChildrenCount } from '../../questionnaire-enum';
import { Constant } from 'src/app/_shared/constant';

@Component({
  selector: 'app-location-container',
  templateUrl: './location-container.component.html',
  styleUrls: ['./location-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationContainerComponent implements OnInit {
  lookupZipcode$: Observable<LookupZipcode[]>;
  currentZipcode$: Observable<number>;
  nextPageUrl = `${QuestionnaireConstants.parentSegment}/${QuestionnaireConstants.urlList[2]}`;
  previousPageUrl = `${QuestionnaireConstants.parentSegment}/${QuestionnaireConstants.urlList[0]}`;

  @ViewChild(QuestionnaireLocationComponent, { static: true }) location: QuestionnaireLocationComponent;

  constructor(private store: Store<fromQuestionnaire.State>, private router: Router) { }

  ngOnInit() {
    this.lookupZipcode$ = this.store.pipe(select(fromQuestionnaire.getLookupZipcode));
    this.currentZipcode$ = this.store.pipe(select(fromQuestionnaire.getZipcode));
  }

  storeZipcode(zipcode: number) {
    this.store.dispatch(new questionnaireActions.SetZipcode(zipcode));
  }

  // Page Level validation
  validateLocation()  {
      const valid: boolean = this.location.validateForm();
      if (valid) {
        const isValidZipCode: boolean = this.location.saveZipcode();
        if (isValidZipCode) {
          this.router.navigate([this.nextPageUrl]);
        }
      }
    }
}
