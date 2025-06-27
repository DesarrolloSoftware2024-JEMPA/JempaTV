import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200/'; 

const oAuthConfig = {
  issuer: 'https://localhost:44332/',
  redirectUri: baseUrl,
  clientId: 'JempaTV_App',
  responseType: 'code',
  scope: 'JempaTV',
  requireHttps: false,
};

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'JempaTV',
  },
  oAuthConfig,
  apis: {
    default: {
      url: 'https://localhost:44332/',
      rootNamespace: 'JempaTV',
    },
    AbpAccountPublic: {
      url: oAuthConfig.issuer,
      rootNamespace: 'AbpAccountPublic',
    },
  },
  remoteEnv: {
    url: '/getEnvConfig',
    mergeStrategy: 'deepmerge'
  }, 
  localization: {
    defaultResourceName: 'JempaTV', // Nombre de tu recurso
    languages: [
      { name: 'Español', cultureName: 'es' },
      { name: 'English', cultureName: 'en' }
    ]
  }
} as Environment;
