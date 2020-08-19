import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormStatus, FormType } from '../../_shared/enum';
import { FormLookups, IForm } from '../forms-interface';
import { orderBy } from 'lodash';


@Component({
  selector: 'app-forms-archive',
  templateUrl: './forms-archive.component.html',
  styleUrls: ['./forms-archive.component.scss'],
})
export class FormsArchiveComponent implements OnInit, OnChanges {

  @Input() formLookups: FormLookups;
  @Input() archivedForms: any;

  constructor() { }
  ngOnInit() {
  }

  ngOnChanges() {
    this.archivedForms = orderBy(this.archivedForms, (form) =>  form.statusUpdatedDateTime , ['desc']);
  }

}
