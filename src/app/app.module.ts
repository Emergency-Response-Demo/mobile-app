import { NgModule, APP_INITIALIZER, InjectionToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { KeycloakAngularModule } from 'keycloak-angular';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AG_CONFIG } from './app.config';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { init, AppInitService }  from "./app-init.service";
import mobileServicesJson from '../mobile-services.json';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const config: SocketIoConfig = { url: window['__env'].serverUrl, options: {} };

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule, SocketIoModule.forRoot(config), KeycloakAngularModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: APP_INITIALIZER, useFactory: init, multi: true, deps: [AppInitService] },
    { provide: AG_CONFIG, useValue: mobileServicesJson}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
