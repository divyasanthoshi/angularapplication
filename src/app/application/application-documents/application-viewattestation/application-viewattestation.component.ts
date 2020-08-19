import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ApplicationConstants } from '../../application.constants';
import { AttestationOfGoodMoralCharacter, Provider } from '../../application-interface';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-application-viewattestation',
  templateUrl: 'application-viewattestation.component.html',
  styleUrls: ['./application-viewattestation.component.scss'],
})
export class ApplicationViewattestationComponent implements OnInit, OnChanges {
  attestationLinks = ApplicationConstants.attestationLinks;
  @Input() agmcDetails: AttestationOfGoodMoralCharacter;
  @Input() personName: string;
  @Input() provider: Provider;
  currentDate: any;
  showCurrentDate: string;

  constructor() {
    this.currentDate = new Date();
    this.showCurrentDate = this.currentDate.getDate() + '/' + Number(this.currentDate.getMonth() + 1) + '/' + this.currentDate.getFullYear();
   }

  ngOnChanges() {
    // if (this.agmcDetails.formId !== 0) {
    //   this.showCurrentDate = this.agmcDetails.formSignedDate.getDate() + Number(this.agmcDetails.formSignedDate.getMonth() + 1) + '/' + this.agmcDetails.formSignedDate.getFullYear();
    // }

  }

  ngOnInit() {}

}
