import { Injectable } from '@angular/core';
import { KeycloakService, KeycloakOptions } from 'keycloak-angular';
import { MobileServiceConfigurations } from './services/config.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {
  private options: KeycloakOptions

  constructor(private keycloak: KeycloakService, mobileServicesConfigs: MobileServiceConfigurations) {
    const mobileServiceKeycloakConfig = mobileServicesConfigs.getKeycloakConfig();
    if (mobileServiceKeycloakConfig && mobileServiceKeycloakConfig.config) {
      this.options = {
        config: {
          realm: mobileServiceKeycloakConfig.config.realm,
          url: mobileServiceKeycloakConfig.config['auth-server-url'],
          clientId: mobileServiceKeycloakConfig.config.resource
        },
        initOptions: {
          onLoad: 'login-required'
        }
      }
    }
  }

  init(): Promise<any> {
    if (this.options) {
      return this.keycloak.init(this.options);
    }
    return Promise.resolve(true);
  }
}

export function init(appInitService: AppInitService) {
  return () => appInitService.init();
}