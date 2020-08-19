import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ListOfDocuments, DocumentsList } from '../../application-interface';

@Component({
  selector: 'app-application-documentslist',
  templateUrl: './application-documentslist.component.html',
  styleUrls: ['./application-documentslist.component.scss'],
})

export class ApplicationDocumentsListComponent implements OnInit, OnChanges {

  @Input() documentList: ListOfDocuments;
  @Input() showDocument: boolean;
  @Output() navigateToPeopleList = new EventEmitter<DocumentsList>();

  constructor(private route: Router) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.documentList.currentValue && changes.documentList.currentValue.formList && changes.documentList.currentValue.formList.length) {
      this.documentList = changes.documentList.currentValue;
    }
  }

  navigateTo(item) {
    this.navigateToPeopleList.emit(item);
  }

}
