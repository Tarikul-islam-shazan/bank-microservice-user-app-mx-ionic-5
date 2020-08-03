// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  label: 'development',
  deployment: 'dev',
  country: 'mx',
  serviceUrl: 'http://localhost:6064/api/v1.0.0',
  loadingControllerOptions: {
    message: 'Please wait...'
  },
  jumio: {
    apiToken: '10ccb140-096a-4cf2-b7a9-a8bb46ca0c44',
    apiSecret: 'iVcILnNS85u2d9l1naocBb7Td4SDqs8L',
    dataCenter: 'US', // Datacenter can either be US or EU
    callbackUrl: 'https://services-mxqa.meedbankingclub.com/api/v1.0.0/jumio-verification',
    customerIssuingCountry: 'MEX', // ISO 3166-1 alpha-3 country code
    documentTypes: ['DRIVER_LICENSE', 'PASSPORT', 'IDENTITY_CARD'], // ['DRIVER_LICENSE', 'PASSPORT', 'IDENTITY_CARD', 'VISA'],
    iframeOrigin: 'https://meed.netverify.com'
  },
  firebaseConfig: {
    apiKey: 'AIzaSyBFb01kPxsqlygl4RujWtTrwGfH5wjrqBc',
    authDomain: 'mx-meedbankingclub.firebaseapp.com',
    databaseURL: 'https://mx-meedbankingclub.firebaseio.com',
    projectId: 'mx-meedbankingclub',
    storageBucket: 'mx-meedbankingclub.appspot.com',
    messagingSenderId: '479603772557',
    appId: '1:479603772557:web:3a670bbd46053c3ac8e6c4',
    measurementId: 'G-3Z41MK45WG'
  },
  appIdleness: {
    idelnessTimeout: 2, // sets an idle timeout of 2 seconds
    timeoutPeriod: 540, // After 540 seconds (9 mins) of inactivity, the user will be considered timed out.
    keepAlivePingInterval: 15 // sets the ping interval to 15 seconds
  },
  urbanAirship: {
    appKey: '4Ww5Ycv-RBGVTSH2vrivWw',
    appSecret: '-AsJp_A-Rd6j0gZlZT6BoA',
    site: 'US' // Urban Airship SDK Site (US or EU) defaults to US
  },
  meedPolicy: {
    coverPolicy: {
      url: 'https://s3.amazonaws.com/prod-meed-www/',
      name: 'bank-policy.pdf'
    },
    travelPolicy: {
      url: 'https://s3.amazonaws.com/prod-meed-www/travel/',
      name: 'travel_tnc.pdf'
    }
  },
  meedTravel: {
    url: 'https://meeddevsite.uat.mybookingplatform.com/en/user/autoLoginUser',
    token: 'bQBlAGUAZABkAGUAdgBzAGkAdABlAC4AdQBhAHQALgBtAHkAYgBvAG8AawBpAG4AZwBwAGwAYQB0AGYAbwByAG0ALgBjAG8AbQA='
  },
  appDataStorage: {
    name: 'meed-database',
    storeName: 'meed-store'
  },
  translateLoader: {
    usedRemote: false,
    remoteUrl: 'https://s3.amazonaws.com/meedbankingclub-mobile'
  },
  appBundleIdentifier: 'com.mx.qa.meedbankingclub',
  availableLocales: {
    'en-us': {
      country: 'us',
      language: 'en',
      name: 'more-module.change-language.english-text',
      locale: 'en-us',
      dialCode: 1,
      currencyCode: 'USD'
    },
    'es-mx': {
      country: 'mx',
      language: 'es',
      name: 'more-module.change-language.spanish-text',
      locale: 'es-mx',
      dialCode: 34,
      currencyCode: 'MXN'
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
