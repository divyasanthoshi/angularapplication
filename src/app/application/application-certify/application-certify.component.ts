import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup , FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-application-certify',
  templateUrl: './application-certify.component.html',
  styleUrls: ['./application-certify.component.scss'],
})
export class ApplicationCertifyComponent implements OnInit {
  isChecked = false;

  @Output() isCertify = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {}

  // check certify when the checkbox is clicked
  certify(event: any) {
    const isChecked = !event.currentTarget.checked;
    this.isCertify.emit(isChecked);
  }

}
