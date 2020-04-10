import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SERVICE_PROVIDERS } from './services/index';
import { HTTP_PROVIDERS } from './http/index';
import { APP_PLATFORM } from './util/index';
import { NATIVE_PLUGINS } from './native-plugins';
import { STORE_PROVIDERS } from './store/index';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { IonicStorageModule } from '@ionic/storage';
import { IonicModule } from '@ionic/angular';
import { CORE_COMPONENTS } from './components/';
import { environment } from '@env/environment';
import { TranslateModule } from '@ngx-translate/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ROUTE_GUARD_PROVIDERS } from './routeGuards';

export const CORE_PROVIDERS: any[] = [
  ...SERVICE_PROVIDERS,
  ...HTTP_PROVIDERS,
  ...STORE_PROVIDERS,
  ...APP_PLATFORM,
  ...NATIVE_PLUGINS,
  ...ROUTE_GUARD_PROVIDERS
];

@NgModule({
  declarations: [...CORE_COMPONENTS],
  entryComponents: [...CORE_COMPONENTS],
  imports: [
    CommonModule,
    HttpClientModule,
    NgIdleKeepaliveModule.forRoot(),
    IonicModule,
    PdfViewerModule,
    IonicStorageModule.forRoot(environment.appDataStorage),
    TranslateModule.forRoot()
  ],
  providers: [...CORE_PROVIDERS],
  exports: [...CORE_COMPONENTS]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule
    };
  }
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule already loaded; Import in root module only.');
    }
  }
}
