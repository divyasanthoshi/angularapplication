import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserManagerService } from '../_core/services/user-manager.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {

    result$: Observable<any>;
    display: string;
    deleteValue = 4;
    baseUrl = environment.apiUrl;


    constructor(
        private http: HttpClient,
        private manageUser: UserManagerService
    ) { }

    ngOnInit() {
    }

    getWeather() {
        const data = 20;
        const getUrl = `${this.baseUrl}/api/test/get?temperatureC=${data}`;
        this.result$ = this.http.get(getUrl).pipe(
            tap(result => console.log(JSON.stringify(result)))
        );
    }

    getAllWeather() {
        const getUrl = `${this.baseUrl}/api/test/getall`;
        this.result$ = this.http.get(getUrl).pipe(
            tap(result => console.log(JSON.stringify(result)))
        );
    }

    postWeather() {
        const postWeatherUrl = `${this.baseUrl}/api/test/post`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const data = {
            temperatureC: 20,
            temperatureF: 20,
            summary: `Test`
        };
        this.result$ = this.http.post<any>(postWeatherUrl, data, { headers }).pipe(
            tap(result => console.log(JSON.stringify(result)))
        );
    }

    putWeather() {
        const putWeatherUrl = `${this.baseUrl}/api/test/put`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const data = {
            temperatureC: 20,
            temperatureF: 20,
            summary: `Test`
        };
        this.result$ = this.http.put<any>(putWeatherUrl, data, { headers }).pipe(
            tap(result => console.log(JSON.stringify(result)))
        );
    }

    deleteWeather() {
        const data = 20;
        const deleteWeatherUrl = `${this.baseUrl}/api/test/delete?temperatureC=${data}`;
        this.result$ = this.http.delete(deleteWeatherUrl).pipe(
            tap(result => console.log(JSON.stringify(result)))
        );
    }

    createUserToken() {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const createUserTokenUrl = `${this.baseUrl}/api/User/Token`;
        const data = {
            UserName: `rliu.dcf@outlook.com`,
            Password: `Pa$$w0rd`
        };
        this.result$ = this.http.post<any>(createUserTokenUrl, data, { headers }).pipe(
            tap(result => console.log(JSON.stringify(result)))
        );
    }

    reNewUserToken() {
        const updateFormArchiveUrl = `${this.baseUrl}/api/User/Token`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const data = {
            token: ``
        };
        this.result$ = this.http.put<any>(updateFormArchiveUrl, data, { headers }).pipe(
            tap(result => console.log(JSON.stringify(result)))
        );
    }

    getUserClaim() {
        const getUserClaimUrl = `${this.baseUrl}/api/User/Claim`;
        this.result$ = this.http.get(getUserClaimUrl).pipe(
            tap(result => console.log(JSON.stringify(result)))
        );
    }

    revokeUserToken() {
        const revokeUserTokenUrl = `${this.baseUrl}/api/User/Token`;
        this.result$ = this.http.delete(revokeUserTokenUrl).pipe(
            tap(result => console.log(JSON.stringify(result)))
        );
    }



    getFormLookup() {
        // TODO: test
        const getUrl = `${this.baseUrl}/api/form/lookup`;
        this.result$ = this.http.get(getUrl).pipe(
            tap(result => console.log(JSON.stringify(result)))
        );
    }

    getFormDetailUserId() {
        const data = 1;
        const getFormDetailUserIdUrl = `${this.baseUrl}/api/form/detail/userid?userid=${data}`;
        this.result$ = this.http.get(getFormDetailUserIdUrl).pipe(
            tap(result => console.log(JSON.stringify(result)))
        );
    }

    updateFormArchive() {
        const updateFormArchiveUrl = `${this.baseUrl}/api/form/archive`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const data = {
            formid: 8616
        };
        this.result$ = this.http.put<any>(updateFormArchiveUrl, data, { headers }).pipe(
            tap(result => console.log(JSON.stringify(result)))
        );
    }

    getFormDetailFormId() {
        const data = 8618;
        const getFormDetailFormIdUrl = `${this.baseUrl}/api/form/detail/formid?formid=${data}`;
        this.result$ = this.http.get(getFormDetailFormIdUrl).pipe(
            tap(result => console.log(JSON.stringify(result)))
        );
    }

    getIntentLookup() {
        const getIntentLookupUrl = `${this.baseUrl}/api/intent/lookup`;
        this.result$ = this.http.get(getIntentLookupUrl).pipe(
            tap(result => console.log(JSON.stringify(result)))
        );
    }

    updateIntentStatus() {

        const updateIntentStatusUrl = `${this.baseUrl}api/intent/status`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const data = {
            formid: 8616,
            formstatusid: 1
        };
        this.result$ = this.http.put<any>(updateIntentStatusUrl, data, { headers }).pipe(
            tap(result => console.log(JSON.stringify(result)))
        );
    }

    getOwnershipDocumentNumber() {
        const data = `P99000026869`;
        const getOwnershipDocumentNumberUrl = `${this.baseUrl}/api/ownership/document?documentnumber=${data}`;
        this.result$ = this.http.get(getOwnershipDocumentNumberUrl).pipe(
            tap(result => console.log(JSON.stringify(result)))
        );
    }

    getOwnershipDetail() {
        const data = `-385600`;
        const getOwnershipDetailUrl = `${this.baseUrl}/api/ownership/detail?providerid=${data}`;
        this.result$ = this.http.get(getOwnershipDetailUrl).pipe(
            tap(result => console.log(JSON.stringify(result)))
        );
    }

    insertUpdateOwnershipDetail() {

        // TODO: Pending Implementation

    }

    insertUpdateOnHoldPerson() {

        // TODO: Pending Implementation
    }

    getOnHoldPerson() {
        const data = {
            personid: -423392,
            providerid: 294445
        };
        const getOnHoldPersonUrl = `${this.baseUrl}/api/personnel/onholdperson?personid=${data.personid}&providerid=${data.providerid}`;
        this.result$ = this.http.get(getOnHoldPersonUrl).pipe(
            tap(result => console.log(JSON.stringify(result)))
        );
    }

    deleteOnHoldPerson() {
        const data = -423391;
        const deleteOnHoldPersonUrl = `${this.baseUrl}/api/Personnel/OnHoldPerson?personid=${data}`;
        this.result$ = this.http.delete(deleteOnHoldPersonUrl).pipe(
            tap(result => console.log(JSON.stringify(result)))
        );
    }

    insertUpdateOnHoldProvider() {

        // TODO: Pending Implementation

    }

    getProviderOnHoldProvider() {
        const data = `-499942`;
        const getProviderOnHoldProviderUrl = `${this.baseUrl}/api/provider/onholdprovider?providerid=${data}`;
        this.result$ = this.http.get(getProviderOnHoldProviderUrl).pipe(
            tap(result => console.log(JSON.stringify(result)))
        );
    }

    getQuestionnaireLookup() {
        const getQuestionnaireLookupUrl = `${this.baseUrl}/api/questionnaire/lookup`;
        this.result$ = this.http.get(getQuestionnaireLookupUrl).pipe(
            tap(result => console.log(JSON.stringify(result)))
        );
    }

    getQuestionnaireRecommendation() {
        const data = {
            propertytypeid: 2,
            zipcode: `32411`,
            childrenrangeid: 3,
            isdisabledcare: true
        };
        const getQuestionnaireRecommendationUrl = `${this.baseUrl}/api/questionnaire/Recommendation?propertytypeid=${data.propertytypeid}&zipcode=${data.zipcode}&childrenrangeid=${data.childrenrangeid}&isdisabledcare=${data.isdisabledcare}`;
        this.result$ = this.http.get(getQuestionnaireRecommendationUrl).pipe(
            tap(result => console.log(JSON.stringify(result)))
        );
    }

    getAddress() {

        const data = {
            streetaddress: `2505 W 15th St`,
            city: `Panama City`,
            state: `FL`,
            zipcode: `32401`
        };
        const getAddressUrl = `${this.baseUrl}/api/shared/address?streetaddress=${data.streetaddress}&city=${data.city}&state=${data.state}&zipcode=${data.zipcode}`;
        this.result$ = this.http.get(getAddressUrl).pipe(
            tap(result => console.log(JSON.stringify(result)))
        );
    }

    isSignedIn() {
        this.manageUser.isSignnedIn().then(isSigned => {
            console.log(isSigned);
        });
    }

    signOut() {
        const result$ = this.manageUser.signOut().subscribe( signedOut => {
            console.log(signedOut);
        });
    }
    signIn() {
        this.manageUser.signin({
            username: `rliu.dcf@outlook.com`,
            password: `Pa$$w0rd`
        }).subscribe(signedIn => {
            console.log(signedIn);
        });

    }
}
