import { MobileServiceConfigurations } from './config.service';

const mockFullConfig = {
  "clientId": "app1",
  "namespace": "mobile-developer-console",
  "version": 1,
  "clusterName": "test",
  "services": [
    {
      "config": {
        "auth-server-url": "https://sso-user-sso.apps.demo-1762.open.redhat.com/auth",
        "confidential-port": 0,
        "public-client": true,
        "realm": "app1-realm",
        "resource": "app1-client",
        "ssl-required": "external"
      },
      "id": "fba3edde-d49a-11e9-be3a-025c402b324e",
      "name": "keycloak",
      "type": "keycloak",
      "url": "https://sso-user-sso.apps.demo-1762.open.redhat.com/auth"
    }
  ]
};

const mockEmptyConfig = {
  "clientId": "app1",
  "namespace": "mobile-developer-console",
  "version": 1,
  "clusterName": "test",
  "services": []
};

describe('ConfigService', () => {

  beforeEach(() => {
    window['__env'] = null;
  });

  it('#getKeycloakConfig should return data', () => {
    const service = new MobileServiceConfigurations(mockFullConfig) 
    expect(service.getKeycloakConfig()).toEqual(mockFullConfig.services[0].config);
  });

  it('#getKeycloakConfig should return null', () => {
    const service = new MobileServiceConfigurations(mockEmptyConfig) 
    expect(service.getKeycloakConfig()).toBeNull();
  });

  it('#getKeycloakConfig from env vars', () => {
    const keycloakEnvs = {
      KEYCLOAK: 'true',
      AUTH_URL: 'https://sso.test.example.com/auth',
      REALM: 'app1-realm-test',
      CLIENTID: 'app1-client-test'
    };

    window['__env'] = keycloakEnvs;

    const service = new MobileServiceConfigurations(mockFullConfig);
    const loadedConfig = service.getKeycloakConfig();
    //the values in the env vars should take precedence over the configuration file
    expect(loadedConfig['auth-server-url']).toEqual(keycloakEnvs.AUTH_URL);
    expect(loadedConfig['resource']).toEqual(keycloakEnvs.CLIENTID);
    expect(loadedConfig['realm']).toEqual(keycloakEnvs.REALM);
  });
});