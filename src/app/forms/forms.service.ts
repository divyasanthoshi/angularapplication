import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IForm, FormLookups } from './forms-interface';
import { FormsConstants } from './forms.constants';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  private header = new HttpHeaders({ 'Content-Type': 'application/json' });
  private apiBaseUrl = environment.apiUrl;
  private forms: IForm[];

  constructor(private http: HttpClient) {
   }

  getForms(userId: number): Observable<IForm> {
    const url = this.apiBaseUrl + `${FormsConstants.url.api.getFormsUrl}?userId=` + userId;
    return this.http.get<IForm>(url).pipe(
      catchError(this.handleError)
    );
  }

  archiveForm(form: IForm): Observable<IForm> {
    const url = this.apiBaseUrl + FormsConstants.url.api.putArchiveFormsUrl;
    return this.http.put<IForm>(url, form).pipe(
      catchError(this.handleError)
    );
  }

  getFormLookups() {
    const url = this.apiBaseUrl + FormsConstants.url.api.getFormLookup;
    return this.http.get<FormLookups>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

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
