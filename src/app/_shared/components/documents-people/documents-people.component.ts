import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ApplicationConstants } from '../../../application/application.constants';
import { DocumentsPeople, FormList } from 'src/app/application/application-interface';
@Component({
  selector: 'app-shared-documents-people',
  templateUrl: './documents-people.component.html',
  styleUrls: ['./documents-people.component.scss'],
})
export class DocumentsPeopleComponent implements OnInit, OnChanges {
  peopleDocument: FormList[] = [];
  showDocumentsList = false;
  firstLetterList = [];
  peopleAlphaBetaList = [];
  @Input() formTypeId: string;
  @Input() showHistory: boolean;
  @Input() documentsPeople: DocumentsPeople;
  @Output() navigateToPeopleForm = new EventEmitter<FormList>();
  constructor() {
   }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.documentsPeople && this.documentsPeople.formList) {
      this.peopleDocument = JSON.parse(JSON.stringify(this.documentsPeople.formList));
      this.getPeopleInAlphabaticalOrder();
    }
  }


  getPeopleInAlphabaticalOrder() {
    let firstLetter = '';
    let personnelList: any[] = [];
    this.firstLetterList = [];
    this.peopleAlphaBetaList = [];
    const listLength = this.peopleDocument.length;
    this.peopleDocument.sort((personnel1, personnel2) => personnel1.personName.toLowerCase().localeCompare(personnel2.personName.toLowerCase())); // l,l,r,r, s, s, t
    this.peopleDocument.map((personnel, index) => {
      const nameFirstLetter = personnel.personName.slice(0, 1).toUpperCase(); // l
      const isLastPersonnel = index === (listLength - 1);
      // if the first letter matches, add to the same letter group
      if (nameFirstLetter === firstLetter) {
        personnelList.push(personnel);
      } else {
        firstLetter = nameFirstLetter;
        this.firstLetterList.push(nameFirstLetter);
        // push the letter group to people alpha beta list
        if (personnelList.length > 0) {
          this.peopleAlphaBetaList.push(personnelList);
        }
        personnelList = [];
        personnelList.push(personnel);
      }
      // if it is the last personnel, push the whole personnnel list
      if (isLastPersonnel) {
        this.peopleAlphaBetaList.push(personnelList);
        personnelList = [];
      }
    });
  }


  navigateToForm(people: FormList) {
    this.navigateToPeopleForm.emit(people);
  }

  enableDocumentsList() {
    this.showDocumentsList = true;
  }

}
