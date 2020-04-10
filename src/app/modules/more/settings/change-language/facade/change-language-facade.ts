import { Injectable } from '@angular/core';
import { SettingsService, IMember } from '@app/core';
import { Locale } from '@app/core/models/app-settings';
import { PreferenceSettingsService } from '@app/core/services/preference-settings.service';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';

@Injectable()
export class ChangeLanguageFacade {
  constructor(
    private settingsService: SettingsService,
    private preferenceSettingsService: PreferenceSettingsService,
    private analytics: AnalyticsService
  ) {}

  get availableLanguage(): Locale[] {
    return this.settingsService.getAvailableLocales();
  }

  get selectedLanguage(): Locale {
    return this.settingsService.getCurrentLocale();
  }

  updateLanguage(language: Locale): void {
    this.preferenceSettingsService.updateLanguage(language.locale).subscribe(() => {
      this.settingsService.setLocale(language);
      this.analytics.logEvent(AnalyticsEventTypes.LanguageChanged, { language });
    });
  }
}
