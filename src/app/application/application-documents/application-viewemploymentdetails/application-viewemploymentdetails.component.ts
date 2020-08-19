import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { EmploymentDetails, ApplicationLookups } from '../../application-interface';

@Component({
  selector: 'app-application-viewemploymentdetails',
  templateUrl: './application-viewemploymentdetails.component.html',
  styleUrls: ['./application-viewemploymentdetails.component.scss'],
})
export class ApplicationViewemploymentdetailsComponent implements OnInit, OnChanges {
@Input() currentViewEmploymentDetail: EmploymentDetails;
otherReasonForSeveranceId: number;
@Input() applicationLookups: ApplicationLookups;
  constructor() { }

ngOnChanges() {
  if (this.applicationLookups && this.applicationLookups.lookupReasonForSeverance.length > 0) {
    const index = this.applicationLookups.lookupReasonForSeverance.findIndex((lookup) => lookup.reason === 'Other');
    this.otherReasonForSeveranceId = this.applicationLookups.lookupReasonForSeverance[index].reasonForSeveranceId;
    }

}

  ngOnInit() {}

}
