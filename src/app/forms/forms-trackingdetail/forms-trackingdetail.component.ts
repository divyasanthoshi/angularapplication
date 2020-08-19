import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormLookups, IForm, LookupFormType, LookupFormStatus } from '../forms-interface';

@Component({
  selector: 'app-forms-trackingdetail',
  templateUrl: './forms-trackingdetail.component.html',
  styleUrls: ['../../../stylesheet/modules/ion-list-statausdetail.scss', './forms-trackingdetail.component.scss'],
})

export class FormsTrackingdetailComponent implements OnInit {
  @Input() form: IForm;
  _formLookups: FormLookups;
  @Input() formLookups: FormLookups;
  @Output() loadApplication = new EventEmitter<any>();
  statusList: any;
  constructor() { }

  ngOnInit() {

  }

  getFormType(formTypeId: number) {
    if (this.formLookups && this.formLookups.lookupFormType && this.formLookups.lookupFormType.length) {
      const matchedForm = this.formLookups.lookupFormType.find(formType => formType.formTypeId === formTypeId);
      if (matchedForm) {
        return matchedForm.description;
      }
    }
  }

  reviewApplication(formId: number, providerId: number) {
    if (formId) {
      this.loadApplication.emit({ formId, providerId });
    }
  }

  getStatusList(form, allStatusList: LookupFormStatus[]) {
    if (form && form.formTypeId && allStatusList && allStatusList.length) {
      const responseStatusList = form.statusList;
      const formStatusList: LookupFormStatus[] = allStatusList.filter((status: LookupFormStatus) => status.formTypeId === form.formTypeId);
      formStatusList.sort((statusa, statusb) => statusb.formTypeId - statusa.formTypeId);
      if (formStatusList && formStatusList.length && responseStatusList && responseStatusList.length && responseStatusList.length !== formStatusList.length) {
        const returnList = [];
        formStatusList.forEach((statusItem) => {
          const matchedStatus = responseStatusList.find((responseStatus) => responseStatus.formStatusId === statusItem.formStatusId);
          if (matchedStatus) {
            returnList.push(matchedStatus);
          } else {
            returnList.push(statusItem);
          }
        });
        this.statusList = JSON.parse(JSON.stringify(returnList));
        return returnList;
      } else {
        this.statusList = JSON.parse(JSON.stringify(responseStatusList));
        return responseStatusList;
      }
    }
  }

  trackByMethod(index: number, el: any): number {
    return el.formStatusId;
  }

  isMostRecent(date) {
    if (date) {
      this.statusList.forEach(e => e.statusDate = e.statusDate ? new Date(e.statusDate).getTime() : 0);
      const mostRecentStatus = this.statusList.sort((a, b) => b.statusDate - a.statusDate)[0];
      if (new Date(date).getTime() === mostRecentStatus.statusDate) {
        return true;
      }
    }
  }

}
