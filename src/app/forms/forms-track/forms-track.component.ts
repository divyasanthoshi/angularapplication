import { Component, EventEmitter, Input, Output, OnInit, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { FormLookups, IForm } from '../forms-interface';
import { FormStatus } from 'src/app/_shared/enum';
import { Constant } from 'src/app/_shared/constant';
import {orderBy } from 'lodash' ;


@Component({
  selector: 'app-forms-track',
  templateUrl: './forms-track.component.html',
  styleUrls: ['../../../stylesheet/modules/ion-list-detail.scss' , './forms-track.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormsTrackComponent implements OnChanges {

  @Input() formLookups: FormLookups;
  @Input() trackForms: IForm[];
  @Input() selectedForm: IForm;
  @Input() isArhivedForm: boolean;
  @Output() clickedForm = new EventEmitter<number>();
  @Output() archive = new EventEmitter<IForm>();

  constructor() { }

  formClicked(formId: number) {
    // this.selectedForm = formTrack;
    this.clickedForm.emit(formId);
  }

  archiveForm(form: IForm) {
    this.archive.emit(form);
  }

  statusToColorMap(formStatusId: number) {
    let color = '';
    switch (formStatusId) {
      case FormStatus.InProgress: color = 'light'; break;
      case FormStatus.ReadyToSubmit: color = 'light'; break;
      case FormStatus.Submitted: color = 'primary'; break;
      case FormStatus.AssignedToCounselor: color = 'light'; break;
      case FormStatus.UnderReview: color = 'light'; break;
      case FormStatus.RequestForInformation: color = 'warning'; break;
      case FormStatus.NotifiedToApply: color = 'medium'; break;
      case FormStatus.Closed: color = 'dark'; break;
      case FormStatus.PendingInspection: color = 'light'; break;
      case FormStatus.Approved: color = 'success'; break;
      case FormStatus.Denied: color = 'danger'; break;
      default: color = 'light';
    }
    return color;
  }
  ngOnChanges() {
    this.trackForms = orderBy(this.trackForms, (form) =>  form.statusUpdatedDateTime , ['desc']);
  }
}
