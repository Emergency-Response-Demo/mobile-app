import { Injectable } from '@angular/core';
import { KeycloakService, KeycloakOptions } from 'keycloak-angular';
import { MobileServiceConfigurations } from './services/config.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(private keycloak: KeycloakService, private mobileServicesConfigs: MobileServiceConfigurations) {}

  init(): Promise<any> {
    const mobileServiceKeycloakConfig = this.mobileServicesConfigs.getKeycloakConfig();
    if (mobileServiceKeycloakConfig) {
      const options: KeycloakOptions = {
        config: {
          realm: mobileServiceKeycloakConfig.realm,
          url: mobileServiceKeycloakConfig['auth-server-url'],
          clientId: mobileServiceKeycloakConfig.resource
        },
        initOptions: {
          onLoad: 'login-required'
        }
      }
      return this.keycloak.init(options);
    }
    return Promise.resolve(true);
  }
}

export function init(appInitService: AppInitService) {
  return () => appInitService.init();
}