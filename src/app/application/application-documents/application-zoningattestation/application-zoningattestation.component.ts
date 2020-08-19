import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ApplicationConstants } from '../../application.constants';
import { Router } from '@angular/router';
import { ZoningAttestationSourceList, LookupZoningAttestationSource } from '../../application-interface';

@Component({
  selector: 'app-application-zoningattestation',
  templateUrl: './application-zoningattestation.component.html',
  styleUrls: ['./application-zoningattestation.component.scss'],
})
export class ApplicationZoningAttestationComponent implements OnInit, OnChanges {

  @Input() zoningAttestationSourceList: ZoningAttestationSourceList;

  @Output() navigateToAttestation = new EventEmitter<LookupZoningAttestationSource>();

  constructor(private route: Router) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes && changes.zoningAttestationSourceList && changes.zoningAttestationSourceList.currentValue) {
      this.zoningAttestationSourceList = changes.zoningAttestationSourceList.currentValue;
    }
  }

  navigateTo(item: LookupZoningAttestationSource) {
    this.navigateToAttestation.emit(item);
  }

}
