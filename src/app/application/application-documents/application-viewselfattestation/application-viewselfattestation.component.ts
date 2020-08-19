import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelfAttestationDetails, FormList, ZoningAttestationDetail } from '../../application-interface';

@Component({
  selector: 'app-application-viewselfattestation',
  templateUrl: './application-viewselfattestation.component.html',
  styleUrls: ['./application-viewselfattestation.component.scss'],
})
export class ApplicationViewSelfAttestationComponent implements OnInit, OnChanges {
  @Input() selfAttestationDetails: SelfAttestationDetails;
  @Input() providerId: number;
  currentDate: any;
  showCurrentDate: string;

  constructor() {
    this.currentDate = new Date();
    this.showCurrentDate = this.currentDate.getMonth() + 1 + '/' + Number(this.currentDate.getDate()) + '/' + this.currentDate.getFullYear();
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (changes.selfAttestationDetails && changes.selfAttestationDetails.currentValue && changes.selfAttestationDetails.currentValue) {
        this.selfAttestationDetails = changes.selfAttestationDetails.currentValue;
      }
    }
  }

}
