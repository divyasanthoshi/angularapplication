import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import {
  catchError,
  map,
  mergeMap,
  tap,
  withLatestFrom,
  exhaustMap,
  filter,
  take,
  switchMap,
} from "rxjs/operators";
import * as fromApplication from ".";
import { State } from "../../state/app.state";
import {
  Personnel,
  BusinessHours,
  EmploymentDetails,
  EmploymentHistory,
  DocumentsList,
  ListOfDocuments,
  DocumentsPeople,
  ChildAbuseReportingDetails,
  ZoningAttestationSourceList,
  SelfAttestationDetails,
} from "../application-interface";
import { ApplicationConstants } from "../application.constants";
import { ApplicationService } from "../application.service";
import * as applicationActions from "./application.actions";
import * as formsAction from "../../forms/state/forms.actions";
import * as routerAction from "../../reducers/routerstate/router.actions";
import { ROUTER_NAVIGATION, ROUTER_REQUEST } from "@ngrx/router-store";
import { state } from "@angular/animations";
import { FormsService } from "src/app/forms/forms.service";
import { cloneDeep } from "lodash";

@Injectable()
export class ApplicationEffects {
  constructor(
    private applicationService: ApplicationService,
    private formsService: FormsService,
    private actions$: Actions,
    private store$: Store<State>,
    private router: Router
  ) {}
  //#region Personnel & People
  // create personnel
  @Effect()
  insertPersonnel$: Observable<Action> = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.CreatePersonnel),
    map((action) => action as applicationActions.CreatePersonnel),
    mergeMap((action) => {
      // put the value that user enter to the personnel
      // this.store$.dispatch(new applicationActions.SetPersonnel(action.payload));
      return this.applicationService.insertPersonnel(action.payload).pipe(
        map(
          (newPersonnel: Personnel) =>
            new applicationActions.CreatePersonnelSuccess(newPersonnel)
        ),
        catchError((err) => of(new applicationActions.CreatePersonnelFail(err)))
      );
    })
  );

  // update personnel
  @Effect()
  updatePersonnel$: Observable<Action> = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.UpdatePersonnel),
    map((action) => action as applicationActions.UpdatePersonnel),
    mergeMap((action) => {
      this.store$.dispatch(new applicationActions.SetPersonnel(action.payload));
      return this.applicationService.updatePersonnel(action.payload).pipe(
        map(
          (newpersonnel: Personnel) =>
            new applicationActions.UpdatePersonnelSuccess(newpersonnel)
        ),
        catchError((err) => of(new applicationActions.UpdatePersonnelFail(err)))
      );
    })
  );
  // load personnel
  @Effect()
  getPersonnel$: Observable<Action> = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.LoadPersonnel),
    map((action) => action as applicationActions.LoadPersonnel),
    withLatestFrom(
      this.store$.pipe(select(fromApplication.getCurrentProviderId))
    ),
    switchMap(([action, providerId]) =>
      this.applicationService.getPersonnel(action.payload, providerId).pipe(
        filter((value) => typeof value !== "string"),
        map(
          (newPersonnel: Personnel[]) =>
            new applicationActions.LoadPersonnelSuccess(newPersonnel)
        ),
        catchError((err) => of(new applicationActions.LoadPersonnelFail(err)))
      )
    )
  );

  // load people
  @Effect()
  getPeople$: Observable<Action> = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.LoadPeople),
    map((action) => action as applicationActions.LoadPeople),
    mergeMap((action) =>
      this.applicationService.getPeople(action.payload).pipe(
        filter((value) => typeof value !== "string"),
        map((newPersonnel: Personnel[]) => {
          if (newPersonnel) {
            return new applicationActions.LoadPeopleSuccess(newPersonnel);
          } else {
            return new applicationActions.LoadPeopleSuccess([]);
          }
        }),

        catchError((err) => of(new applicationActions.LoadPeopleFail(err)))
      )
    )
  );

  // delete people
  @Effect()
  deletePeople$: Observable<Action> = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.DeletePerson),
    map((action) => action as applicationActions.DeletePerson),
    mergeMap((action) =>
      this.applicationService.deletePeople(action.payload).pipe(
        map(() => new applicationActions.DeletePersonSuccess(action.payload)),
        catchError((err) => of(new applicationActions.DeletePersonFail(err)))
      )
    )
  );
  //#endregion Personnel & People

  //#region Provider Profile
  // create provider
  @Effect()
  createProvider$: Observable<Action> = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.CreateProvider),
    map((action) => action as applicationActions.CreateProvider),
    mergeMap((action) => {
      this.store$.dispatch(new applicationActions.SetProvider(action.payload));
      return this.applicationService.insertProvider(action.payload).pipe(
        map((result) => new applicationActions.CreateProviderSuccess(result)),
        catchError((err) => of(new applicationActions.CreateProviderFail(err)))
      );
    })
  );
  // update provider ---where is left
  @Effect()
  updateProvider$: Observable<Action> = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.UpdateProvider),
    map((action) => action as applicationActions.UpdateProvider),
    mergeMap((action) => {
      this.store$.dispatch(new applicationActions.SetProvider(action.payload));
      return this.applicationService.updateProvider(action.payload).pipe(
        map(
          (res) => new applicationActions.UpdateProviderSuccess(res),
          catchError((err) =>
            of(new applicationActions.UpdateProviderFail(err))
          )
        )
      );
    })
  );
  // load provider
  @Effect()
  getProvider$: Observable<Action> = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.LoadProvider),
    withLatestFrom(this.store$.select(fromApplication.getCurrentProviderId)),
    mergeMap(([_, providerId]) =>
      this.applicationService.getProvider(providerId).pipe(
        filter((value) => typeof value !== "string"),
        map((provider) => new applicationActions.LoadProviderSuccess(provider)),
        catchError((err) => of(new applicationActions.LoadProviderFail(err)))
      )
    )
  );
  // load provider Id
  @Effect()
  getProviderId$: Observable<Action> = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.LoadProviderId),
    map((action) => action as applicationActions.LoadProviderId),
    exhaustMap((action) => {
      return this.applicationService.getProviderId(action.payload).pipe(
        map(
          (res) =>
            new applicationActions.SetCurrentProviderId(res[0].providerId)
        ),
        catchError((err) => of(new applicationActions.LoadProviderFail(err)))
      );
    })
  );
  //#endregion Provider Profile

  //#region ownership
  // create ownership
  @Effect()
  createOwnership$: Observable<Action> = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.CreateOwnership),
    map((action) => action as applicationActions.CreateOwnership),
    mergeMap((action) => {
      return this.applicationService.createOwnership(action.payload).pipe(
        map(
          (ownership) =>
            new applicationActions.CreateOwnershipSuccess(ownership)
        ),
        catchError((err) =>
          of(new applicationActions.LoadApplicationLookupsFail(err))
        )
      );
    })
  );

  // update ownership
  @Effect()
  updateOwnership$: Observable<Action> = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.UpdateOwnership),
    map((action) => action as applicationActions.UpdateOwnership),
    mergeMap((action) => {
      this.store$.dispatch(new applicationActions.SetOwnership(action.payload));
      return this.applicationService.updateOwnership(action.payload).pipe(
        map(
          (ownership) =>
            new applicationActions.UpdateOwnershipSuccess(ownership)
        ),
        catchError((err) => of(new applicationActions.UpdateOwnershipFail(err)))
      );
    })
  );

  // update ownership
  @Effect()
  loadOwnership$: Observable<Action> = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.LoadOwnership),
    withLatestFrom(this.store$.select(fromApplication.getCurrentProviderId)),
    mergeMap(([_, providerId]) => {
      return this.applicationService.loadOwnership(providerId).pipe(
        filter((value) => typeof value !== "string"),
        map((ownership) => {
          if (ownership) {
            return new applicationActions.LoadOwnershipSuccess(ownership);
          } else {
            return new applicationActions.LoadOwnershipSuccess({
              ownershipTypeId: null,
              organization: null,
              isIncorporated: true,
            });
          }
        }),
        catchError((err) => of(new applicationActions.LoadOwnershipFail(err)))
      );
    })
  );
  //#endregion ownership

  // load application lookup values
  @Effect()
  loadApplicationLookups$: Observable<Action> = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.LoadApplicationLookups),
    map((action) => action as applicationActions.LoadApplicationLookups),
    mergeMap((action) => {
      return this.applicationService.getApplicationLookups().pipe(
        filter((value) => typeof value !== "string"),
        map(
          (lookups) =>
            new applicationActions.LoadApplicationLookupsSuccess(lookups)
        ),
        catchError((err) =>
          of(new applicationActions.LoadApplicationLookupsFail(err))
        )
      );
    })
  );
  // loadPersonTitlePlus lookups
  @Effect()
  loadPersonTitlePlusLookups$: Observable<Action> = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.LoadPersonTitlePlusLookups),
    map((action) => action as applicationActions.LoadPersonTitlePlusLookups),
    mergeMap((action) => {
      return this.applicationService
        .getPersonTitlePlusLookups(action.payload)
        .pipe(
          filter((value) => typeof value !== "string" && value !== null),
          map(
            (personTitlePluslookups) =>
              new applicationActions.LoadPersonTitlePlusLookupsSuccess(
                personTitlePluslookups
              )
          ),
          catchError((err) =>
            of(new applicationActions.LoadPersonTitlePlusLookups(err))
          )
        );
    })
  );

  // submit form information
  @Effect()
  submitForm$ = this.actions$.pipe(
    ofType(formsAction.ActionTypes.SubmitForm),
    map((action) => action as formsAction.SubmitForm),
    exhaustMap((action) => {
      return this.applicationService.submitForm(action.payload).pipe(
        map((form) => new formsAction.SubmitFormSuccess(form)),
        catchError((err) => of(new formsAction.SubmitFormFail(err)))
      );
    })
  );

  // if success, navigate the page to submitted
  @Effect()
  submitFormSuccess$ = this.actions$.pipe(
    ofType(formsAction.ActionTypes.SubmitFormSuccess),
    map((action) => action as formsAction.SubmitFormSuccess),
    map(
      (action) =>
        new routerAction.Go({
          path: [ApplicationConstants.url.page.applicationSubmitted],
          extras: { replaceUrl: false, queryParamsHandling: "preserve" },
        })
    )
  );
  // if success, navigate the page to submitted with the queryParams
  @Effect()
  createProviderSuccess$ = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.CreateProviderSuccess),
    map((action) => action as applicationActions.CreateProviderSuccess),
    map(
      (action) =>
        new routerAction.Go({
          path: [ApplicationConstants.url.page.businessHours],
          query: { formId: action.payload.formId },
          extras: { replaceUrl: false },
        })
    )
  );
  @Effect()
  updateProviderSuccess$ = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.UpdateProviderSuccess),
    map((action) => action as applicationActions.UpdateProviderSuccess),
    map(
      (action) =>
        new routerAction.Go({
          path: [ApplicationConstants.url.page.businessHours],
          query: { formId: action.payload.formId },
          extras: { replaceUrl: false, queryParamsHandling: "preserve" },
        })
    )
  );
  // #startregion services

  // load Services
  @Effect()
  loadServices$: Observable<Action> = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.LoadServices),
    map((action) => action as applicationActions.LoadServices),
    exhaustMap((action) => {
      return this.applicationService.getServices(action.payload).pipe(
        filter((value) => typeof value !== "string"),
        map((services) => {
          if (services) {
            return new applicationActions.LoadServicesSuccess(services);
          } else {
            return new applicationActions.LoadServicesSuccess({
              providerId: 0,
              serviceList: [],
            });
          }
        }),
        catchError((err) => of(new applicationActions.LoadServicesFail(err)))
      );
    })
  );

  // create services
  @Effect()
  createServices$: Observable<Action> = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.CreateServices),
    map((action) => action as applicationActions.CreateServices),
    mergeMap((action) => {
      console.log("action.payload", action.payload);
      return this.applicationService.createServices(action.payload).pipe(
        map(
          (services) => new applicationActions.CreateServicesSuccess(services)
        ),
        catchError((err) => of(new applicationActions.CreateServicesFail(err)))
      );
    })
  );
  // if success, navigate the page to people with the queryParams
  @Effect()
  createServicesSuccess$ = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.CreateServicesSuccess),
    map((action) => action as applicationActions.CreateServicesSuccess),
    map(
      (action) =>
        new routerAction.Go({
          path: [ApplicationConstants.url.page.ownership],
          extras: { replaceUrl: false, queryParamsHandling: "preserve" },
        })
    )
  );

  // update services
  @Effect()
  updateServices$: Observable<Action> = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.UpdateServices),
    map((action) => action as applicationActions.UpdateServices),
    mergeMap((action) => {
      console.log("action.payload", action.payload);
      return this.applicationService.updateServices(action.payload).pipe(
        map(
          (services) => new applicationActions.UpdateServicesSuccess(services)
        ),
        catchError((err) => of(new applicationActions.UpdateServicesFail(err)))
      );
    })
  );
  // if success, navigate the page to people with the queryParams
  @Effect()
  updateServicesSuccess$ = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.UpdateServicesSuccess),
    map((action) => action as applicationActions.UpdateServicesSuccess),
    map(
      (action) =>
        new routerAction.Go({
          path: [ApplicationConstants.url.page.ownership],
          extras: { replaceUrl: false, queryParamsHandling: "preserve" },
        })
    )
  );
  // #endregion services

  @Effect({ dispatch: false })
  navigate$ = this.actions$.pipe(
    ofType(routerAction.ActionTypes.GO),
    map((action: routerAction.Go) => action.payload),
    tap(({ path, query: queryParams, extras }) =>
      this.router.navigate(path, { queryParams, ...extras })
    )
  );

  // create business hours
  @Effect()
  createBusinessHours$ = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.CreateBusinessHours),
    map((action) => action as applicationActions.CreateBusinessHours),
    exhaustMap((action) => {
      return this.applicationService.createBusinessHours(action.payload).pipe(
        take(1),
        map(
          (res: BusinessHours) =>
            new applicationActions.CreateBusinessHoursSuccess(res)
        ),
        catchError((err) =>
          of(new applicationActions.CreateBusinessHoursFail(err))
        )
      );
    })
  );

  // update business hours
  @Effect()
  updateBusinessHours$ = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.UpdateBusinessHours),
    map((action) => action as applicationActions.UpdateBusinessHours),
    exhaustMap((action) => {
      return this.applicationService.updateBusinessHours(action.payload).pipe(
        map(
          (res: BusinessHours) =>
            new applicationActions.UpdateBusinessHoursSuccess(res)
        ),
        catchError((err) =>
          of(new applicationActions.UpdateBusinessHoursFail(err))
        )
      );
    })
  );

  // load business hours
  @Effect()
  loadBusinessHours$ = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.LoadBusinessHours),
    map((action) => action as applicationActions.LoadBusinessHours),
    exhaustMap((action) => {
      return this.applicationService.loadBusinessHours(action.payload).pipe(
        map(
          (res: BusinessHours) =>
            new applicationActions.LoadBusinessHoursSuccess(res)
        ),
        catchError((err) =>
          of(new applicationActions.LoadBusinessHoursFail(err))
        )
      );
    })
  );

  // load documents list
  @Effect()
  loadDocuments$ = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.LoadListOfDocuments),
    map((action) => action as applicationActions.LoadListOfDocuments),
    exhaustMap((action) => {
      return this.applicationService.loadDocuments(action.payload).pipe(
        map(
          (res: ListOfDocuments) =>
            new applicationActions.LoadListOfDocumentsSuccess(res)
        ),
        catchError((err) =>
          of(new applicationActions.LoadListOfDocumentsFail(err))
        )
      );
    })
  );

  // load documents-people list
  @Effect()
  loadDocumentsPeopleList$ = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.LoadPeopleDocuments),
    map((action) => action as applicationActions.LoadPeopleDocuments),
    withLatestFrom(
      this.store$.pipe(select(fromApplication.getCurrentProviderId))
    ),
    mergeMap(([action, providerId]) => {
      return this.applicationService
        .loadDocumentsPeopleList(action.payload, providerId)
        .pipe(
          map(
            (res: DocumentsPeople) =>
              new applicationActions.LoadPeopleDocumentsSuccess(res)
          ),
          catchError((err) =>
            of(new applicationActions.LoadPeopleDocumentsFail(err))
          )
        );
    })
  );

  // create services
  @Effect()
  createEmploymentDetails$: Observable<Action> = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.CreateEmploymentDetails),
    map((action) => action as applicationActions.CreateEmploymentDetails),
    mergeMap((action) => {
      console.log("action.payload", action.payload);
      return this.applicationService
        .createEmploymentDetails(action.payload)
        .pipe(
          map(
            (employmentDetails) =>
              new applicationActions.CreateEmploymentDetailsSuccess(
                employmentDetails
              )
          ),
          catchError((err) =>
            of(new applicationActions.CreateEmploymentDetailsFail(err))
          )
        );
    })
  );

  // update services
  @Effect()
  updateEmploymentDetails$: Observable<Action> = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.UpdateEmploymentDetails),
    map((action) => action as applicationActions.UpdateEmploymentDetails),
    mergeMap((action) => {
      console.log("action.payload", action.payload);
      return this.applicationService
        .updateEmploymentDetails(action.payload)
        .pipe(
          map(
            (employmentDetails) =>
              new applicationActions.UpdateEmploymentDetailsSuccess(
                employmentDetails
              )
          ),
          catchError((err) =>
            of(new applicationActions.UpdateEmploymentDetailsFail(err))
          )
        );
    })
  );

  // #get EmploymentHistory

  @Effect()
  getEmploymentHistory$: Observable<Action> = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.LoadEmploymentHistory),
    map((action) => action as applicationActions.LoadEmploymentHistory),
    withLatestFrom(
      this.store$.pipe(select(fromApplication.getCurrentProviderId))
    ),
    mergeMap(([action, providerId]) =>
      this.applicationService
        .getEmploymentHistory(action.payload, providerId)
        .pipe(
          filter((value) => typeof value !== "string"),
          map((employmentHistory) => {
            if (employmentHistory) {
              // tslint:disable-next-line:max-line-length
              return new applicationActions.LoadEmploymentHistorySuccess({
                personId: employmentHistory.personId,
                personName: employmentHistory.personName,
                employmentHistoryDetails: cloneDeep(
                  employmentHistory.employmentHistoryDetails
                ),
              });
            } else {
              return new applicationActions.LoadEmploymentHistorySuccess(null);
            }
          }),
          catchError((err) =>
            of(new applicationActions.LoadEmploymentHistoryFail(err))
          )
        )
    )
  );

  @Effect()
  getEmploymentDetail$: Observable<Action> = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.LoadEmploymentDetail),
    map((action) => action as applicationActions.LoadEmploymentDetail),
    withLatestFrom(
      this.store$.pipe(select(fromApplication.getCurrentProviderId))
    ),
    mergeMap(([action, providerId]) =>
      this.applicationService
        .getEmploymentDetail(action.payload, providerId)
        .pipe(
          filter((value) => typeof value !== "string"),
          map((employmentDetails) => {
            if (employmentDetails) {
              return new applicationActions.LoadEmploymentDetailSuccess(
                employmentDetails
              );
            } else {
              return new applicationActions.LoadEmploymentDetailSuccess([]);
            }
          }),
          catchError((err) =>
            of(new applicationActions.LoadEmploymentDetailFail(err))
          )
        )
    )
  );

  @Effect()
  deleteEmploymentDetail$: Observable<Action> = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.DeleteEmploymentDetail),
    map((action) => action as applicationActions.DeleteEmploymentDetail),
    mergeMap((action) =>
      this.applicationService.deleteEmploymentDetail(action.payload).pipe(
        map(
          () =>
            new applicationActions.DeleteEmploymentDetailSuccess(action.payload)
        ),
        catchError((err) =>
          of(new applicationActions.DeleteEmploymentDetailFail(err))
        )
      )
    )
  );

  // create Unemployment details
  @Effect()
  createUnEmploymentDetails$: Observable<Action> = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.CreateUnEmploymentDetails),
    map((action) => action as applicationActions.CreateUnEmploymentDetails),
    mergeMap((action) => {
      console.log("action.payload", action.payload);
      return this.applicationService
        .createUnEmploymentDetails(action.payload)
        .pipe(
          map(
            (employmentDetails) =>
              new applicationActions.CreateUnEmploymentDetailsSuccess(
                employmentDetails
              )
          ),
          catchError((err) =>
            of(new applicationActions.CreateUnEmploymentDetailsFail(err))
          )
        );
    })
  );

  // update unemployment details
  @Effect()
  updateUnEmploymentDetails$: Observable<Action> = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.UpdateUnEmploymentDetails),
    map((action) => action as applicationActions.UpdateUnEmploymentDetails),
    mergeMap((action) => {
      console.log("action.payload", action.payload);
      return this.applicationService
        .updateUnEmploymentDetails(action.payload)
        .pipe(
          map(
            (employmentDetails) =>
              new applicationActions.UpdateUnEmploymentDetailsSuccess(
                employmentDetails
              )
          ),
          catchError((err) =>
            of(new applicationActions.UpdateUnEmploymentDetailsFail(err))
          )
        );
    })
  );
  // get Unemployment details
  @Effect()
  getUnEmploymentDetail$: Observable<Action> = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.LoadUnEmploymentDetail),
    map((action) => action as applicationActions.LoadUnEmploymentDetail),
    withLatestFrom(
      this.store$.pipe(select(fromApplication.getCurrentProviderId))
    ),
    mergeMap(([action, providerId]) =>
      this.applicationService
        .getUnEmploymentDetail(action.payload, providerId)
        .pipe(
          filter((value) => typeof value !== "string"),
          map((unemploymentDetails) => {
            if (unemploymentDetails) {
              return new applicationActions.LoadUnEmploymentDetailSuccess(
                unemploymentDetails
              );
            }
          }),
          catchError((err) =>
            of(new applicationActions.LoadUnEmploymentDetailFail(err))
          )
        )
    )
  );
  @Effect()
  deleteUnEmploymentDetail$: Observable<Action> = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.DeleteUnEmploymentDetail),
    map((action) => action as applicationActions.DeleteUnEmploymentDetail),
    mergeMap((action) =>
      this.applicationService.deleteUnEmploymentDetail(action.payload).pipe(
        map(
          () =>
            new applicationActions.DeleteUnEmploymentDetailSuccess(
              action.payload
            )
        ),
        catchError((err) =>
          of(new applicationActions.DeleteUnEmploymentDetailFail(err))
        )
      )
    )
  );

  // load form lookup values
  @Effect()
  loadFormLookups$: Observable<Action> = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.LoadFormLookups),
    map((action) => action as applicationActions.LoadFormLookups),
    mergeMap((action) => {
      return this.formsService.getFormLookups().pipe(
        map(
          (formLookups) =>
            new applicationActions.LoadFormLookupsSuccess(formLookups)
        ),
        catchError((err) => of(new applicationActions.LoadFormLookupsFail(err)))
      );
    })
  );
  //#region AGMC Details
  // create AGMC
  @Effect()
  createAGMCDetails$: Observable<Action> = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.CreateAGMCDetails),
    map((action) => action as applicationActions.CreateAGMCDetails),
    mergeMap((action) => {
      return this.applicationService.createAGMCDetails(action.payload).pipe(
        map(
          (result) => new applicationActions.CreateAGMCDetailsSuccess(result)
        ),
        catchError((err) =>
          of(new applicationActions.CreateAGMCDetailsFail(err))
        )
      );
    })
  );
  // @Effect()
  // createAGMCDetailsSuccess$ = this.actions$.pipe(
  //     ofType(applicationActions.ActionTypes.CreateAGMCDetailsSuccess),
  //     map(action => action as applicationActions.CreateAGMCDetailsSuccess),
  //     map(action => new routerAction.Go(
  //         {
  //             path: [ApplicationConstants.url.page.viewAttestation],
  //             extras: { replaceUrl: false, queryParamsHandling: 'preserve' }
  //         })));
  // update AGMC details
  @Effect()
  updateAGMCDetails$: Observable<Action> = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.UpdateAGMCDetails),
    map((action) => action as applicationActions.UpdateAGMCDetails),
    mergeMap((action) => {
      return this.applicationService.updateAGMCDetails(action.payload).pipe(
        map(
          (res) => new applicationActions.UpdateAGMCDetailsSuccess(res),
          catchError((err) =>
            of(new applicationActions.UpdateAGMCDetailsFail(err))
          )
        )
      );
    })
  );
  // @Effect()
  // updateAGMCDetailsSuccess$ = this.actions$.pipe(
  //     ofType(applicationActions.ActionTypes.UpdateAGMCDetailsSuccess),
  //     map(action => action as applicationActions.UpdateAGMCDetailsSuccess),
  //     map(action => new routerAction.Go(
  //         {
  //             path: [ApplicationConstants.url.page.viewAttestation],
  //             extras: { replaceUrl: false, queryParamsHandling: 'preserve' }
  //         })));
  // load AGMC details
  @Effect()
  getAGMCDetails$: Observable<Action> = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.LoadAGMCDetails),
    map((action) => action as applicationActions.LoadAGMCDetails),
    // withLatestFrom(this.store$.select(fromApplication.getCurrentProviderId)),
    mergeMap((action) =>
      this.applicationService.getAGMCDetails(action.payload).pipe(
        filter((value) => typeof value !== "string"),
        map((res) => new applicationActions.LoadAGMCDetailsSuccess(res)),
        catchError((err) => of(new applicationActions.LoadAGMCDetailsFail(err)))
      )
    )
  );

  @Effect()
  createChildAbuseReportingDetails$ = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.CreateChildAbuseReportingDetail),
    map(
      (action) => action as applicationActions.CreateChildAbuseReportingDetail
    ),
    exhaustMap((action) => {
      return this.applicationService
        .createChildAbuseReport(action.payload)
        .pipe(
          map(
            (res: ChildAbuseReportingDetails) =>
              new applicationActions.CreateChildAbuseReportingDetailSuccess(res)
          ),
          catchError((err) =>
            of(new applicationActions.CreateChildAbuseReportingDetailFail(err))
          )
        );
    })
  );

  @Effect()
  updateChildAbuseReportingDetails$ = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.UpdateChildAbuseReportingDetail),
    map(
      (action) => action as applicationActions.UpdateChildAbuseReportingDetail
    ),
    exhaustMap((action) => {
      return this.applicationService
        .updateChildAbuseReport(action.payload)
        .pipe(
          map(
            (res: ChildAbuseReportingDetails) =>
              new applicationActions.UpdateChildAbuseReportingDetailSuccess(res)
          ),
          catchError((err) =>
            of(new applicationActions.UpdateChildAbuseReportingDetailFail(err))
          )
        );
    })
  );

  @Effect()
  loadChildAbuseReportingDetails$ = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.LoadChildAbuseReportingDetail),
    map((action) => action as applicationActions.LoadChildAbuseReportingDetail),
    exhaustMap((action) => {
      return this.applicationService.loadChildAbuseReport(action.payload).pipe(
        map(
          (res: ChildAbuseReportingDetails) =>
            new applicationActions.LoadChildAbuseReportingDetailSuccess(res)
        ),
        catchError((err) =>
          of(new applicationActions.LoadChildAbuseReportingDetailFail(err))
        )
      );
    })
  );

  @Effect()
  loadZoningAttestationSourceList$ = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.LoadZoningAttestationSourceList),
    map(
      (action) => action as applicationActions.LoadZoningAttestationSourceList
    ),
    exhaustMap((action) => {
      return this.applicationService.loadZoningAttestation(action.payload).pipe(
        map(
          (res: ZoningAttestationSourceList) =>
            new applicationActions.LoadZoningAttestationSourceListSuccess(res)
        ),
        catchError((err) =>
          of(new applicationActions.LoadZoningAttestationSourceListFail(err))
        )
      );
    })
  );

  //#region Self Attestation
  @Effect()
  createSelfAttestationDetails$ = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.CreateSelfAttestationDetail),
    map((action) => action as applicationActions.CreateSelfAttestationDetail),
    exhaustMap((action) => {
      return this.applicationService.createSelfAttestation(action.payload).pipe(
        map(
          (res: SelfAttestationDetails) =>
            new applicationActions.CreateSelfAttestationDetailSuccess(res)
        ),
        catchError((err) =>
          of(new applicationActions.CreateSelfAttestationDetailFail(err))
        )
      );
    })
  );

  @Effect()
  updateSelfAttestationDetails$ = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.UpdateSelfAttestationDetail),
    map((action) => action as applicationActions.UpdateSelfAttestationDetail),
    exhaustMap((action) => {
      return this.applicationService.updateSelfAttestation(action.payload).pipe(
        map(
          (res: SelfAttestationDetails) =>
            new applicationActions.UpdateSelfAttestationDetailSuccess(res)
        ),
        catchError((err) =>
          of(new applicationActions.UpdateSelfAttestationDetailFail(err))
        )
      );
    })
  );

  @Effect()
  loadSelfAttestationDetails$ = this.actions$.pipe(
    ofType(applicationActions.ActionTypes.LoadSelfAttestationDetail),
    map((action) => action as applicationActions.LoadSelfAttestationDetail),
    exhaustMap((action) => {
      return this.applicationService.loadSelfAttestation(action.payload).pipe(
        map(
          (res: SelfAttestationDetails) =>
            new applicationActions.LoadSelfAttestationDetailSuccess(res)
        ),
        catchError((err) =>
          of(new applicationActions.LoadSelfAttestationDetailFail(err))
        )
      );
    })
  );
  //#endregion Self Attestation
}
