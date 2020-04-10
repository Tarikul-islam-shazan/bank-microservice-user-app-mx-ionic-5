import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService, ANALYTICS_PROVIDER } from './services/analytics.service';

export interface AnalyticsConfig {
  providerName?: string;
}

@NgModule({
  declarations: [],
  imports: [CommonModule]
})
export class AnalyticsModule {
  static forRoot(analyticsConfig: AnalyticsConfig): ModuleWithProviders {
    return {
      ngModule: AnalyticsModule,
      providers: [AnalyticsService, { provide: ANALYTICS_PROVIDER, useValue: analyticsConfig }]
      // providers: [AnalyticsService, {provide: ANALYTICS_PROVIDER, useValue: analytics}]
    };
  }
  constructor(@Optional() @SkipSelf() parentModule: AnalyticsModule) {
    if (parentModule) {
      throw new Error('CoreModule already loaded; Import in root module only.');
    }
  }
}
