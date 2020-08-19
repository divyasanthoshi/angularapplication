import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromApplication from '../../state';
import * as applicationActions from '../../state/application.actions';
import { getRouterInfo } from '../../state';
import { Observable } from 'rxjs';
import { ListOfDocuments, DocumentsList } from '../../application-interface';
import { Go } from 'src/app/reducers/routerstate/router.actions';
import { ApplicationConstants } from '../../application.constants';
import { FormTypes } from '../../../_shared/enum';
@Component({
  selector: 'app-documentslist-container',
  templateUrl: './documentslist-container.component.html',
  styleUrls: ['./documentslist-container.component.scss'],
})
export class DocumentsListContainerComponent implements OnInit {
  @Input() showDocument;
  formId: number;
  currentProviderId$: Observable<number>;
  documentsList$: Observable<ListOfDocuments>;
  path = [
    { fornTypeId: 3, url: ApplicationConstants.url.page.peopleDocuments },
    { fornTypeId: 5, url: ApplicationConstants.url.page.peopleDocuments },
    { fornTypeId: 6, url: ApplicationConstants.url.page.peopleDocuments },
    { fornTypeId: 7, url: ApplicationConstants.url.page.zoningAttestation }

  ];

  constructor(
    private store: Store<fromApplication.State>,
  ) { }

  ngOnInit() {
    if (!this.showDocument) {
      this.showDocument = false;
    }

    this.store.select(getRouterInfo).subscribe(data => this.formId = data.queryParams.formId);
    if (this.formId !== undefined) {
      this.store.dispatch(new applicationActions.LoadProviderId(this.formId));
    }
    this.currentProviderId$ = this.store.pipe(select(fromApplication.getCurrentProviderId));
    this.documentsList$ = this.store.pipe(select(fromApplication.getDocumentsList));
    this.store.pipe(select(fromApplication.getCurrentProviderId)).subscribe(res => {
      if (res) {
        this.store.dispatch(new applicationActions.LoadListOfDocuments(res));
      }
    });
  }

  getFormTypeURL(id) {
    const data = this.path.filter(url => url.fornTypeId === id);
    if (data && data.length) {
      return data[0].url;
    } else {
      return ApplicationConstants.url.page.people;
    }
  }

  nextPage() {
    const url = ApplicationConstants.url.page.summary;
    this.navigate(url);
  }

  previousPage() {
    const url = ApplicationConstants.url.page.people;
    this.navigate(url);

  }

  navigateToPeople(document: DocumentsList) {
    if (document.formTypeId === 3 || document.formTypeId === 5 || document.formTypeId === 6) {
      const formText = FormTypes[(document.formTypeId)];
      const id = '' + document.formTypeId;
      const docurl = ApplicationConstants.url.page.documents + '/' + formText;
      this.store.dispatch(new Go({
        path: [docurl, 'formfilers'],
        query: {formId: this.formId}
      }));
    } else {
      this.navigate(this.getFormTypeURL(document.formTypeId));
    }
  }
  navigate(url) {
    this.store.dispatch(new Go({
      path: [url],
      query: {formId: this.formId}
    }));
  }

}
