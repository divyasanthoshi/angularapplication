import { Component, OnInit, Input } from '@angular/core';
import { ApplicationConstants } from '../application.constants';
import { Router } from '@angular/router';
import { Personnel, ApplicationLookups } from '../application-interface';

import * as fromRouter from '../../reducers';
import { Go } from 'src/app/reducers/routerstate/router.actions';
import { Store } from '@ngrx/store';



@Component({
  selector: 'app-application-viewpersonnel',
  templateUrl: './application-viewpersonnel.component.html',
  styleUrls: ['../../../stylesheet/modules/view-forms.scss' , './application-viewpersonnel.component.scss'],
})

export class ApplicationViewpersonnelComponent implements OnInit {
  _peopleList: Personnel[];
  @Input() currentViewPersonnel: Personnel;
  @Input() set peopleList(value: Personnel[]) {
    this._peopleList = value;
  }

  get peopleList(): Personnel[] {
    return this._peopleList;
  }

  @Input() people: Personnel;
  @Input() applicationLookup: ApplicationLookups;
  constructor(private router: Router,
              private routerStore: Store<fromRouter.RouterState>
    ) { }

  ngOnInit() {}

  clickCreate() {
    const url = ApplicationConstants.url.page.personnelProfile;
    this.navigate(url);
  }

  nextPage() {
      const url = ApplicationConstants.url.page.summary;
      this.navigate(url);
  }
  previousPage() {
    const url = ApplicationConstants.url.page.ownership;
    this.navigate(url);

  }

  navigate(url) {
    // this.store.select(getRouterInfo).subscribe(data => this.formId = data.queryParams.formId);
    this.routerStore.dispatch(new Go({
        path: [url],
        // query: { formId: this.formId },
        extras: { replaceUrl: false, queryParamsHandling: 'preserve' }
      }));
  }

}
