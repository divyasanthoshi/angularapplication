import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { QuestionnaireConstants } from './questionnaire.constant';
import { Observable, throwError } from 'rxjs';
import { LookupQuestionnaire, RecommendationInfo, Questionnaire } from './questionnaire-interface';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  private apiBaseUrl = environment.apiUrl;

  // private baseUrl = environment.apiUrl + QuestionnaireConstants.url.baseUrl;
  // private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getQuestionnaireLookups(): Observable<LookupQuestionnaire> {
    const url = this.apiBaseUrl + QuestionnaireConstants.url.lookup;
    return this.http.get<LookupQuestionnaire>(url)
    .pipe(
      tap(data => data),
      catchError(this.handleError)
    );
  }

  getQuestionnaire(questionnaire: Questionnaire): Observable<RecommendationInfo[]> {
    let url = this.apiBaseUrl + `${QuestionnaireConstants.url.getQuestionnaire}?propertyTypeId=` + questionnaire.propertyTypeId +
    '&zipcode=' + questionnaire.zipcode + '&childrenRangeId=' + questionnaire.childrenRangeId;

    if (questionnaire.isDisabledCare != null) {
url = `${url}&isDisabledCare=` + questionnaire.isDisabledCare;
}

    return this.http.get<RecommendationInfo[]>(url)
.pipe(
catchError(this.handleError)
);
  }

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
