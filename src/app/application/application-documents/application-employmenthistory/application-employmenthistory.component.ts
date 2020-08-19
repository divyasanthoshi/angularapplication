import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { ApplicationConstants } from '../../application.constants';
import { EmploymentDetails, EmploymentHistory } from '../../application-interface';
import { Router } from '@angular/router';
import { Constant } from 'src/app/_shared/constant';

@Component({
  selector: 'app-application-employmenthistory',
  templateUrl: 'application-employmenthistory.component.html',
  styleUrls: ['./application-employmenthistory.component.scss'],
})
export class ApplicationEmploymentHistoryComponent implements OnInit, OnChanges {
  @Input() employmentHistory: EmploymentHistory;
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() create = new EventEmitter<boolean>();
  @Output() view = new EventEmitter<any[]>();
  @Output() isEmployed = new EventEmitter<boolean>();
  employmentDetailsLink = ApplicationConstants.url.page.viewEmploymentDetails;
  // employeeHistoryList = [{ title: 'Kids First Dev Academy', personTitles: ['Director'], fromYear: '1-11-2019', tillYear: 'till Date' },
  //                       { title: 'Sweet Ones Daycare', personTitles: ['VPK teacher'], fromYear: '1-11-2019', tillYear: '1-10-2018' },
  //                       { title: 'Burger King', personTitles: ['Supervisor'], fromYear: '1-10-2018', tillYear: '1-10-2017' }
  //                     ];

  constructor(private router: Router) { }

  ngOnChanges(data) {

  }

  ngOnInit() {
console.log(this.employmentHistory);

  }

  clickEdit(employmentHistoryByApplicantId: number) {
    this.edit.emit(employmentHistoryByApplicantId);
  }

  clickDelete(employmentHistoryByApplicantId: number) {
    this.delete.emit(employmentHistoryByApplicantId);
  }
  clickView(isEmployed: boolean, employmentHistoryByApplicantId: number) {
    this.view.emit([employmentHistoryByApplicantId, isEmployed]);
    // this.isEmployed.emit(isEmployed);
  }


  navigateTo() {
    this.create.emit(true);
  }


}
