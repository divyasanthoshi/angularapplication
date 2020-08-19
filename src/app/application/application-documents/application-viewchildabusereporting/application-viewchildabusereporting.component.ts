import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChildAbuseReportingDetails, FormList } from '../../application-interface';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-application-viewchildabusereporting',
  templateUrl: './application-viewchildabusereporting.component.html',
  styleUrls: ['./application-viewchildabusereporting.component.scss'],
})
export class ApplicationViewChildAbuseReportingComponent  implements OnInit, OnChanges {
  @Input() isDisabled: boolean;
  @Input() childAbuseReportingDetails: ChildAbuseReportingDetails;
  @Input() formItem: FormList;
  @Input() providerId: number;

  // emit create and update events
  @Output() create = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();
  childAbuseReportingDetails$ = new BehaviorSubject<ChildAbuseReportingDetails>(null);
  form: FormGroup;
  currentDate: any;
  showCurrentDate: string;

  constructor(private fb: FormBuilder) {
    this.currentDate = new Date();
    this.showCurrentDate = this.currentDate.getMonth() + 1 + '/' + Number(this.currentDate.getDate()) + '/' + this.currentDate.getFullYear();
   }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
    if (changes && changes.childAbuseReportingDetails && changes.childAbuseReportingDetails.currentValue) {
      this.childAbuseReportingDetails = changes.childAbuseReportingDetails.currentValue;
      if (!this.childAbuseReportingDetails.formSignedDate) {
        this.childAbuseReportingDetails.formSignedDate = new Date().toString();
      }
    }
  }

  goToLink(url: string) {
    window.open(url);
  }

}
