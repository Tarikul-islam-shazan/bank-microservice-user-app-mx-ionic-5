import { NgModule, APP_INITIALIZER, ErrorHandler, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HTTP_INTERCEPTORS, HttpBackend } from '@angular/common/http';

// -------------------- Meed Imports -------------------------
import { CoreModule, GlobalErrorHandler } from './modules/core/index';

// Custom Transloader, that load translation from remote url and store in indexDB
import { TranslateLoaderService } from '@app/core/util/translate-loader.service';
import { StorageService } from '@app/core/services/storage.service';

// TODO: Move Analytics Module to Core
import { AnalyticsModule, AnalyticsConfig } from '@app/analytics/analytics.module';

// Meed http intercepter
import {
  LoggingInterceptor,
  LoaderInterceptor,
  AppVersionInterceptor,
  ErrorInterceptor,
  TokenInterceptor,
  CorrelationIdInterceptor
} from '@app/core/interceptors';
// import SettingsService, AppUpgradeService services to load from APP_INITIALIZER
import { SettingsService } from '@app/core/services/settings.service';
import { AppUpgradeService } from '@app/core/services/app-upgrade.service';

// Configs
const analyticsConfig: AnalyticsConfig = {
  providerName: 'firebase'
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CoreModule.forRoot(),
    // TODO - SHAHWAR - needs to be changed to retrieve value from config
    AnalyticsModule.forRoot(analyticsConfig),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateLoaderService,
        deps: [HttpClient, HttpBackend, StorageService]
      }
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: APP_INITIALIZER,
      useFactory: SettingsService.factory,
      deps: [SettingsService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: AppUpgradeService.factory,
      deps: [AppUpgradeService, Injector],
      multi: true
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AppVersionInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CorrelationIdInterceptor, multi: true },
    // we always want this to be last...
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // use this for anything not related to HTTP Errors
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
