// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  label: 'QA',
  deployment: 'qa',
  serviceUrl: 'https://services-mxqa.meedbankingclub.com/api/v1.0.0',
  loadingControllerOptions: {
    message: 'Please wait...'
  },
  jumio: {
    apiToken: 'e3facdd9-292d-42da-80fd-6c356d9c8161',
    apiSecret: 'mhYjhzEd49svDm2Sh0T5nHWxM52tqigS',
    dataCenter: 'US', // Datacenter can either be US or EU
    callbackUrl: 'https://services-mxqa.meedbankingclub.com/api/v1.0.0/jumio-verification',
    customerIssuingCountry: 'USA', // ISO 3166-1 alpha-3 country code
    documentTypes: ['DRIVER_LICENSE', 'PASSPORT', 'IDENTITY_CARD'], // ['DRIVER_LICENSE', 'PASSPORT', 'IDENTITY_CARD', 'VISA'],
    iframeOrigin: 'https://meed.netverify.com'
  },
  paystand: {
    scriptSource: 'https://checkout.paystand.co/v4/js/paystand.checkout.js',
    publishableKey: 'ioond5qdfwarj1f24f8ss3x6',
    environment: 'sandbox'
  },
  firebaseConfig: {
    apiKey: 'AIzaSyBrogRURZ8KlCKF154gROjJexEqQ7RoMQE',
    authDomain: 'meedbankingclub-qa.firebaseapp.com',
    databaseURL: 'https://meedbankingclub-qa.firebaseio.com',
    projectId: 'meedbankingclub-qa',
    storageBucket: 'meedbankingclub-qa.appspot.com',
    messagingSenderId: '1010705522908',
    appId: '1:1010705522908:web:8253afc216f152c2771419',
    measurementId: 'G-CTR6V66YRB'
  },
  appIdleness: {
    idelnessTimeout: 2, // sets an idle timeout of 3 seconds
    timeoutPeriod: 540, // After 540 seconds (9 mins) of inactivity, the user will be considered timed out.
    keepAlivePingInterval: 15 // sets the ping interval to 15 seconds
  },
  virtualAssistance: {
    websocketUrl: 'wss://cvusalivechatdemo.creativevirtual15.com/ChatServer/userConnection'
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
  appDataStorage: {
    name: 'meed-database',
    storeName: 'meed-store'
  },
  translateLoader: {
    usedRemote: false,
    remoteUrl: 'https://s3.amazonaws.com/meedbankingclub-mobile/i18n'
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
