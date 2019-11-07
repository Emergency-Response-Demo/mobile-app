import { Injectable, Inject } from '@angular/core';
import { ConfigurationService, AeroGearConfiguration } from '@aerogear/core';
import { AG_CONFIG } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class MobileServiceConfigurations {
  agCoreConfig: ConfigurationService;
  envs: Object = {}

  constructor(@Inject(AG_CONFIG) config: AeroGearConfiguration){
    this.agCoreConfig = new ConfigurationService(config);
    const browserWindow = window['__env'] || {};
    for (const key in browserWindow) {
      if (browserWindow.hasOwnProperty(key)) {
        this.envs[key] = browserWindow[key];
      }
    }
  }

  getKeycloakConfig() {
    const keycloakConfigs = this.agCoreConfig.getConfigByType('keycloak');
    if (keycloakConfigs && keycloakConfigs.length > 0) {
      return keycloakConfigs[0];
    } 
    return null;
  }

  getAccessToken() {
    return this.envs['accessToken'];
  }

  getServerUrl() {
    return this.envs['serverUrl'];
  }
}
