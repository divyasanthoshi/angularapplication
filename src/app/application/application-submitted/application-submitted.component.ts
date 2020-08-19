import { Component, Input, OnInit } from '@angular/core';
import { IForm } from 'src/app/forms/forms-interface';
import { FormsConstants } from 'src/app/forms/forms.constants';
import * as fromApplication from '../state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-submitted',
  templateUrl: './application-submitted.component.html',
  styleUrls: ['./application-submitted.component.scss'],
})
export class ApplicationSubmittedComponent implements OnInit {

  @Input() submittedForm: IForm;

  constructor(
    private router: Router) { }

  ngOnInit() { }
  trackApplication() {
    const url = FormsConstants.baseUrl;
    this.router.navigateByUrl(url);
  }

}
