import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromApplication from '../../state';
import { Personnel, ApplicationLookups, LookupPersonTitlePlus } from '../../application-interface';
import * as applicationActions from '../../state/application.actions';
import { ApplicationConstants } from '../../application.constants';
import { Go } from 'src/app/reducers/routerstate/router.actions';

@Component({
  selector: 'app-people-view-container',
  templateUrl: './people-view-container.component.html',
  styleUrls: ['./people-view-container.component.scss'],
})
export class PeopleViewContainerComponent implements OnInit {

  currentPersonnel$: Observable<Personnel>;
  applicationLookup$: Observable<ApplicationLookups>;
  personTitlePlusLookups$: Observable<LookupPersonTitlePlus[]>;

  personId: number;

  constructor(
    private store: Store<fromApplication.State> ) { }

  ngOnInit() {
    this.currentPersonnel$ = this.store.pipe(select(fromApplication.getCurrentPerson));
    this.currentPersonnel$.subscribe((personnel) => {
      if (personnel) {
        this.personId = personnel.personId;
      }
    });
    this.applicationLookup$ = this.store.pipe(select(fromApplication.getApplicationLookups));
  }
  editPersonnel() {
    this.store.dispatch(new applicationActions.SetCurrentPersonnelId(this.personId));
    const url = ApplicationConstants.url.page.personnelProfile;
    this.navigate(url);
  }
  navigate(url) {
    this.store.dispatch(new Go({
        path: [url],
        extras: { replaceUrl: false, queryParamsHandling: 'preserve' }
      }));
  }
}
