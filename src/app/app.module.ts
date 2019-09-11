import { NgModule, APP_INITIALIZER, InjectionToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { KeycloakAngularModule } from 'keycloak-angular';
import { AG_CONFIG } from './app.config';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { init, AppInitService }  from "./app-init.service";
import mobileServicesJson from '../mobile-services.json';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, KeycloakAngularModule],
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
