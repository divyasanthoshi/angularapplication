// tslint:disable-next-line:max-line-length
import { Provider, Organization, Ownership, ApplicationLookups, LookupPersonTitlePlus, Services, BusinessHours, EmploymentDetails, EmploymentHistory, DocumentsList, DocumentsPeople, ListOfDocuments, UnEmploymentDetails, AttestationOfGoodMoralCharacter, ChildAbuseReportingDetails, ZoningAttestationSourceList, ZoningAttestationDetail, SelfAttestationDetails } from './application-interface';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of, forkJoin } from 'rxjs';
import { catchError, tap, filter, map, pluck, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApplicationConstants } from './application.constants';
import { Address, AddressVerification } from '../_shared/Interfaces/businessentity';
import { Personnel } from './application-interface';
import { IForm } from '../forms/forms-interface';
import { Effect } from '@ngrx/effects';


@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private header = new HttpHeaders({ 'Content-Type': 'application/json' });
  // constant for  APIs
  private apiBaseUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }


  // addressValidation API
  checkAddressValidation(address: Address): Observable<AddressVerification[]> {
    const url = this.apiBaseUrl + `${ApplicationConstants.url.api.verifyAddress}?addressTypeId=` + address.addressTypeId + '&streetAddress=' + address.streetAddress + '&city=' + address.city
      + '&state=' + address.state + '&zipCode=' + address.zipCode;
    return this.http.get<AddressVerification[]>(url)
      .pipe(
        filter(data => Boolean(data)),
        catchError(this.handleError)
      );
  }

  // post personnel API call
  insertPersonnel(personnel: Personnel): Observable<Personnel> {
    const url = this.apiBaseUrl + ApplicationConstants.url.api.insertUpdateGetPersonnel;
    return this.http.post<Personnel>(url, personnel).pipe(
      catchError(this.handleError)
    );
  }
  // put personnel API call
  updatePersonnel(personnel: Personnel): Observable<Personnel> {
    const url = this.apiBaseUrl + ApplicationConstants.url.api.insertUpdateGetPersonnel;
    return this.http.post<Personnel>(url, personnel).pipe(
      catchError(this.handleError)
    );
  }
  // get personnel API call
  getPersonnel(personId: number, providerId: number): Observable<Personnel[]> {
    const url = this.apiBaseUrl + `${ApplicationConstants.url.api.insertUpdateGetPersonnel}?personId=` + personId + '&providerId=' + providerId;
    return this.http.get<Personnel[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  // get people API call
  getPeople(providerId: number): Observable<Personnel[]> {
    const url = this.apiBaseUrl + `${ApplicationConstants.url.api.insertUpdateGetPersonnel}?providerId=` + providerId;
    return this.http.get<Personnel[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  // Delete People API call
  deletePeople(personId: number): Observable<number> {
    const url = this.apiBaseUrl + `${ApplicationConstants.url.api.insertUpdateGetPersonnel}?personId=` + personId;
    return this.http.delete<number>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // post provider API call
  insertProvider(provider: Provider): Observable<Provider> {
    const url = this.apiBaseUrl + ApplicationConstants.url.api.insertUpdateGetProvider;
    return this.http.post<Provider>(url, provider).pipe(
      catchError(this.handleError)
    );
  }
  // put provider API call
  updateProvider(provider: Provider): Observable<Provider> {
    const url = this.apiBaseUrl + ApplicationConstants.url.api.insertUpdateGetProvider;
    return this.http.post<Provider>(url, provider).pipe(
      catchError(this.handleError)
    );
  }
  // get provider API call
  getProvider(providerId: number): Observable<Provider> {
    const url = this.apiBaseUrl + `${ApplicationConstants.url.api.insertUpdateGetProvider}?providerId=` + providerId;
    return this.http.get<Provider>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  // get providerId API call
  getProviderId(formId: number): Observable<IForm> {
    const url = this.apiBaseUrl + `${ApplicationConstants.url.api.getProviderId}?formid=` + formId;
    return this.http.get<IForm>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  searchOrganizationByDocumentNumber(documentNumber: string): Observable<HttpResponse<Organization>> {
    const url = this.apiBaseUrl + `${ApplicationConstants.url.api.searchDocumentNumber}?documentNumber=` + documentNumber;
    return this.http.get<Organization>(url, { observe: 'response' })
      .pipe(
        tap((result) => {
          console.log(JSON.stringify(result));
        }),
        catchError(() => of(null))
      );
  }

  // create ownership
  createOwnership(ownership: Ownership) {
    const url = `${this.apiBaseUrl}${ApplicationConstants.url.api.createUpdateGetOwnership}`;
    return this.http.post<Ownership>(url, ownership, { headers: this.header })
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  // update ownership
  updateOwnership(ownership: Ownership) {
    const url = `${this.apiBaseUrl}${ApplicationConstants.url.api.createUpdateGetOwnership}`;
    return this.http.put<Ownership>(url, ownership, { headers: this.header })
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  // submit form
  submitForm(payload: { formId: number, formStatusId: number }): Observable<IForm> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const data = {
      formid: payload.formId,
      formstatusid: payload.formStatusId
    };
    const url = this.apiBaseUrl + ApplicationConstants.url.api.submitForm;
    return this.http.put<any>(url, data, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // get lookup values for Application
  getApplicationLookups() {
    const url = `${this.apiBaseUrl}${ApplicationConstants.url.api.getApplicationLookup}`;
    return this.http.get<ApplicationLookups>(url)
      .pipe(
        // tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  // get PersonTitlePlusLookups
  getPersonTitlePlusLookups(programTypeId: number) {
    const url = `${this.apiBaseUrl}${ApplicationConstants.url.api.getPersonTitlePlus}?programTypeId=` + programTypeId;
    return this.http.get<LookupPersonTitlePlus[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // load ownership
  loadOwnership(providerId: number) {
    const url = this.apiBaseUrl + `${ApplicationConstants.url.api.createUpdateGetOwnership}?providerId=` + providerId;
    return this.http.get<Ownership>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  // create services API call
  createServices(services: Services): Observable<Services> {
    const url = this.apiBaseUrl + ApplicationConstants.url.api.getInsertUpdateServices;
    return this.http.post<Services>(url, services).pipe(
      catchError(this.handleError)
    );
  }

  // update services API call
  updateServices(services: Services): Observable<Services> {
    const url = this.apiBaseUrl + ApplicationConstants.url.api.getInsertUpdateServices;
    return this.http.put<Services>(url, services).pipe(
      catchError(this.handleError)
    );
  }

  // get services API call
  getServices(providerId: number): Observable<Services> {
    const url = this.apiBaseUrl + `${ApplicationConstants.url.api.getInsertUpdateServices}?providerId=` + providerId;
    return this.http.get<Services>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Observable<BusinessHours>
  createBusinessHours(businessHours: BusinessHours) {
    const url = this.apiBaseUrl + ApplicationConstants.url.api.insertUpdateGetBusinessHours;
    return this.http.post<BusinessHours>(url, businessHours).pipe(
      catchError(this.handleError)
    );
    return of();
  }

  updateBusinessHours(businessHours: BusinessHours): Observable<BusinessHours> {
    const url = this.apiBaseUrl + ApplicationConstants.url.api.insertUpdateGetBusinessHours;
    return this.http.put<BusinessHours>(url, businessHours).pipe(
      catchError(this.handleError)
    );
  }

  loadBusinessHours(providerId: number): Observable<BusinessHours> {
    const url = this.apiBaseUrl + `${ApplicationConstants.url.api.insertUpdateGetBusinessHours}?providerId=` + providerId;
    return this.http.get<BusinessHours>(url).pipe(
      catchError(this.handleError)
    );
  }
  // Get documents list
  loadDocuments(providerId: number) {
    const url = this.apiBaseUrl + `${ApplicationConstants.url.api.getDocumentsList}?providerId=` + providerId;
    return this.http.get<ListOfDocuments>(url)
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  // load documents-people list
  loadDocumentsPeopleList(formTypeId: string, providerId: number) {
    const url = this.apiBaseUrl + `${ApplicationConstants.url.api.getDocumentsPeopleList}?formTypeId=` + formTypeId + '&providerId=' + providerId;
    return this.http.get<DocumentsPeople>(url)
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }
  // create employmentDetails API call
  createEmploymentDetails(employmentDetails: EmploymentDetails): Observable<EmploymentDetails> {
    console.log(employmentDetails);
    const url = this.apiBaseUrl + ApplicationConstants.url.api.getInsertUpdateDeleteEmploymentDetails;
    return this.http.post<EmploymentDetails>(url, employmentDetails).pipe(
      catchError(this.handleError)
    );
  }

  // update employmentDetails API call
  updateEmploymentDetails(employmentDetails: EmploymentDetails): Observable<EmploymentDetails> {
    const url = this.apiBaseUrl + ApplicationConstants.url.api.getInsertUpdateDeleteEmploymentDetails;
    return this.http.put<EmploymentDetails>(url, employmentDetails).pipe(
      catchError(this.handleError)
    );
  }

  // get employmentDetails API call
  getEmploymentDetail(employmentHistoryByApplicantId: number, providerId: number): Observable<EmploymentDetails> {
    const url = this.apiBaseUrl + `${ApplicationConstants.url.api.getInsertUpdateDeleteEmploymentDetails}?employmentHistoryByApplicantId=` + employmentHistoryByApplicantId + '&providerId=' + providerId;
    return this.http.get<EmploymentDetails>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Delete People API call
  deleteEmploymentDetail(employmentHistoryByApplicantId: number): Observable<string> {
    const url = this.apiBaseUrl + `${ApplicationConstants.url.api.getInsertUpdateDeleteEmploymentDetails}?employmentHistoryByApplicantId=` + employmentHistoryByApplicantId;
    return this.http.delete<string>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // get employment history API call
  getEmploymentHistory(personId: number, providerId: number): Observable<EmploymentHistory> {
    const url = this.apiBaseUrl + `${ApplicationConstants.url.api.getEmploymentHistoryCheckSummary}?personId=` + personId + '&providerId=' + providerId;
    return this.http.get<EmploymentHistory>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  // create UnEmploymentDetails API call
  createUnEmploymentDetails(employmentDetails: EmploymentDetails): Observable<UnEmploymentDetails> {
    console.log(employmentDetails);
    const url = this.apiBaseUrl + ApplicationConstants.url.api.getInsertUpdateUnEmploymentDetails;
    return this.http.post<UnEmploymentDetails>(url, employmentDetails).pipe(
      catchError(this.handleError)
    );
  }

  // update UnEemploymentDetails API call
  updateUnEmploymentDetails(employmentDetails: EmploymentDetails): Observable<UnEmploymentDetails> {
    const url = this.apiBaseUrl + ApplicationConstants.url.api.getInsertUpdateUnEmploymentDetails;
    return this.http.put<UnEmploymentDetails>(url, employmentDetails).pipe(
      catchError(this.handleError)
    );
  }

  // get UnemploymentDetails API call
  getUnEmploymentDetail(employmentHistoryByApplicantId: number, providerId: number): Observable<UnEmploymentDetails> {
    const url = this.apiBaseUrl + `${ApplicationConstants.url.api.getInsertUpdateUnEmploymentDetails}?employmentHistoryByApplicantId=` + employmentHistoryByApplicantId + '&providerId=' + providerId;
    return this.http.get<UnEmploymentDetails>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Delete UnEmployment API call
  deleteUnEmploymentDetail(employmentHistoryByApplicantId: number): Observable<string> {
    const url = this.apiBaseUrl + `${ApplicationConstants.url.api.getInsertUpdateDeleteEmploymentDetails}?employmentHistoryByApplicantId=` + employmentHistoryByApplicantId;
    return this.http.delete<string>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  // create AGMCDetails API call
  createAGMCDetails(agmc): Observable<AttestationOfGoodMoralCharacter> {
    const url = this.apiBaseUrl + ApplicationConstants.url.api.getInsertUpdateAGMCDetails;
    return this.http.post<AttestationOfGoodMoralCharacter>(url, agmc).pipe(
      catchError(this.handleError)
    );
  }

  // update AGMCDetails API call
  updateAGMCDetails(agmc: AttestationOfGoodMoralCharacter): Observable<AttestationOfGoodMoralCharacter> {
    const url = this.apiBaseUrl + ApplicationConstants.url.api.getInsertUpdateAGMCDetails;
    return this.http.put<AttestationOfGoodMoralCharacter>(url, agmc).pipe(
      catchError(this.handleError)
    );
  }

  // get AGMCDetails API call
  getAGMCDetails(formId: number): Observable<AttestationOfGoodMoralCharacter> {
    const url = this.apiBaseUrl + `${ApplicationConstants.url.api.getInsertUpdateAGMCDetails}?formId=` + formId;
    return this.http.get<AttestationOfGoodMoralCharacter>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  createChildAbuseReport(childAbusingDetails: ChildAbuseReportingDetails): Observable<ChildAbuseReportingDetails> {
    const url = this.apiBaseUrl + `${ApplicationConstants.url.api.childAbuseReportingDetail}`;
    return this.http.post<ChildAbuseReportingDetails>(url, childAbusingDetails)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateChildAbuseReport(childAbusingDetails: ChildAbuseReportingDetails): Observable<ChildAbuseReportingDetails> {
    const url = this.apiBaseUrl + `${ApplicationConstants.url.api.childAbuseReportingDetail}`;
    return this.http.put<ChildAbuseReportingDetails>(url, childAbusingDetails)
      .pipe(
        catchError(this.handleError)
      );
  }

  loadChildAbuseReport(formId: number): Observable<ChildAbuseReportingDetails> {
    const url = this.apiBaseUrl + `${ApplicationConstants.url.api.childAbuseReportingDetail}?formId=` + formId;
    return this.http.get<ChildAbuseReportingDetails>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  loadZoningAttestation(providerId: number): Observable<ZoningAttestationSourceList> {
    const zoningAttestationSourceUrl = this.apiBaseUrl + `${ApplicationConstants.url.api.zoningAttestationSource}`;
    const zoningAttestationDetailUrl = this.apiBaseUrl + `${ApplicationConstants.url.api.zoningAttestationDetail}?providerId=` + providerId;
    return forkJoin([
      this.http.get<ZoningAttestationSourceList>(zoningAttestationSourceUrl),
      this.http.get<ZoningAttestationDetail>(zoningAttestationDetailUrl),
    ])
      .pipe(
        map(([zoningAttestationSourceListRes, zoningAttestationDetailRes]) => {
          const returnValue = {
            lookupZoningAttestationSource: zoningAttestationSourceListRes.lookupZoningAttestationSource,
            zoningAttestationDetail: zoningAttestationDetailRes
          };
          return returnValue;
        }),
        catchError(this.handleError)
      );
  }

  createSelfAttestation(selfAttestationDetails: SelfAttestationDetails): Observable<SelfAttestationDetails> {
    const url = this.apiBaseUrl + `${ApplicationConstants.url.api.selfAttestationDetail}`;
    return this.http.post<SelfAttestationDetails>(url, selfAttestationDetails)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateSelfAttestation(selfAttestationDetails: SelfAttestationDetails): Observable<SelfAttestationDetails> {
    const url = this.apiBaseUrl + `${ApplicationConstants.url.api.selfAttestationDetail}`;
    return this.http.put<SelfAttestationDetails>(url, selfAttestationDetails)
      .pipe(
        catchError(this.handleError)
      );
  }

  loadSelfAttestation(providerId: number): Observable<SelfAttestationDetails> {
    const url = this.apiBaseUrl + `${ApplicationConstants.url.api.selfAttestationDetail}?providerId=` + providerId;
    return this.http.get<SelfAttestationDetails>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // public downloadFile(file: string): Observable<HttpEvent<Blob>> {
  //   return this.http.request(new HttpRequest(
  //     'GET',
  //     `${this.apiDownloadUrl}?file=${file}`,
  //     null,
  //     {
  //       reportProgress: true,
  //       responseType: 'blob'
  //     }));
  // }


public uploadFile(file: Blob): Observable <HttpEvent<void>> {
  const formData = new FormData();
  const url = 'https://caresapi-dev.myflfamilies.com' + ApplicationConstants.url.api.upload ;
  formData.append('file', file);

  return this.http.request(new HttpRequest(
    'POST',
      url,
    formData,
    {
      reportProgress: true
    }));
}

// public getFiles(): Observable < string[] > {
//   return this.http.get<string[]>(this.apiFileUrl);
// }



  // error handler
  private handleError(err: { error: { message: any; }; status: any; }) {
  // in a real world app, we may send the server to some remote logging infrastructure
  // instead of just logging it to the console
  let errorMessage: string;
  if (err.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    errorMessage = `An error occurred: ${err.error.message}`;
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    const body = JSON.stringify(err.error);
    errorMessage = `Backend returned code ${err.status}: ${body}`;
  }
  console.error(err);
  return throwError(errorMessage);
}
}
