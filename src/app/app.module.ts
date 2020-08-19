import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { metaReducers, reducers } from './reducers';
import { CoreModule } from './_core/core.module';
import { AddressValidationModalComponent } from './_shared/modals/address-validation-modal/addressvalidationmodal.component';
import {ModalModule } from './_shared/modals/modal.module';
import {StoreRouterConnectingModule, RouterStateSerializer} from '@ngrx/router-store';
import { CustomSerializer } from '../app/reducers/routerstate/router';
import { ModalComponent } from './_core/modal/modal.component';
import {CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [AddressValidationModalComponent, ModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    CoreModule,
    ModalModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js',
      { enabled: environment.production }),
    StoreModule.forRoot(reducers as ActionReducerMap<{}>, { metaReducers }),
    StoreRouterConnectingModule.forRoot({
       stateKey: 'router',
       serializer: CustomSerializer
    }),
    StoreDevtoolsModule.instrument({
      name: 'Cares PWA App DevTools',
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, 
    { provide: RouterStateSerializer, useClass: CustomSerializer},
    IonicStorageModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
