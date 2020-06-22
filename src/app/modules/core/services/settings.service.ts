/**
 * * Issue: GMA-4629
 * * Issue Details: Date Time Localization
 * * Developer Feedback: Feature Implemented
 * Date: MArch 16, 2020
 * Developer: Zahidul Islam <zahidul@bs-23.net>
 */

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppSettings, SystemSettings, UserSettings, Locale } from '@app/core/models/app-settings';
import { StorageService } from './storage.service';
import { StorageKey } from '@app/core/models/storage';
import { Logger } from './logger.service';
import { AnalyticsService, AnalyticsUserProperties } from '@app/analytics';
import { getLocaleCurrencySymbol } from '@angular/common';
const logger = new Logger('SettingsService');
import * as moment from 'moment';

/**
 * Class to hold app wide User settings.
 *
 * @export
 * @class SettingsService
 */
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settings: AppSettings = {};

  constructor(
    private translate: TranslateService,
    private storageService: StorageService,
    private analyticsService: AnalyticsService
  ) {}

  /**
   * Gets the current locale being used for language in the app
   *
   * @returns
   * @memberof SettingsService
   */
  getCurrentLocale(): Locale {
    return this.settings.systemSettings.selectedLocale;
  }

  /**
   * Returns the list of locales available as a language setting.
   *
   * @returns {Locale[]}
   * @memberof SettingsService
   */
  getAvailableLocales(): Locale[] {
    return this.settings.systemSettings.availableLocales;
  }

  /**
   * Sets the locale to be used for language in the app. This is mostly for the onload
   * of the application where no locale data is provided.
   *
   * @param {string} locale
   * @memberof SettingsService
   */
  async setLocale(locale: Locale): Promise<void> {
    const localize = { selectedLocale: locale };
    this.settings = { ...this.settings, systemSettings: { ...this.settings.systemSettings, ...localize } };
    await this.storageService.setItem(StorageKey.APPSETTINGS, this.settings);
    // localization set
    this.setLanguage();
  }

  /**
   *  Used to set partial values of the system settings
   *
   * @param {SystemSettings} settings
   * @memberof SettingsService
   */
  async setSystemSettings(settings: SystemSettings): Promise<void> {
    // TODO need to validate that this will work for nested objects. For example if we only want to updated 'selectedLocale'
    this.settings = { ...this.settings, systemSettings: { ...this.settings.systemSettings, ...settings } };
    await this.storageService.setItem(StorageKey.APPSETTINGS, this.settings);
  }

  /**
   *  TODO: Load data from backend on app inizialization and use APP_INITIALIZER
   *  Loads all the static data from the server which is required at startup of the app.
   *
   * @memberof SettingsService
   */
  loadSystemSettings(): void {
    // the only default app setting we can load is the locales/languages
    // add currency filed for change currency according to the language
    const locales: Locale[] = [
      {
        country: 'us',
        language: 'en',
        name: 'more-module.change-language.english-text',
        locale: 'en-us',
        dialCode: 1,
        currency: 'USD'
      },
      {
        country: 'mx',
        language: 'es',
        name: 'more-module.change-language.spanish-text',
        locale: 'es-mx',
        dialCode: 34,
        currency: 'MXN'
      }
    ];

    this.settings.systemSettings = {};

    this.settings.systemSettings.availableLocales = locales;

    const systemLang = this.translate.getBrowserCultureLang();
    logger.debug(`system language is ${systemLang}`);
    // lets look if we have the sytem language in our current set of supported languages
    const foundLocales = locales.filter((foundLocale: Locale) => {
      if (foundLocale.locale === systemLang.toString().toLowerCase()) {
        return foundLocale;
      }
    });

    if (foundLocales && foundLocales.length > 0) {
      // we should technically only find one locale
      this.settings.systemSettings.selectedLocale = foundLocales[0];
    } else {
      // otherwise set it to the default which is always english
      // add currency filed for change currency according to the language
      this.settings.systemSettings.selectedLocale = {
        country: 'us',
        language: 'en',
        name: 'more-module.change-language.english-text',
        locale: 'en-us',
        dialCode: 1,
        currency: 'USD'
      };
    }

    // set default language on app startup
    this.setLanguage();
    this.analyticsService.setUserProperty(
      AnalyticsUserProperties.PreferredLanguage,
      this.settings.systemSettings.selectedLocale.locale
    );
    logger.debug(`setting app language to is ${this.settings.systemSettings.selectedLocale.locale}`);
  }

  /**
   * Loads the user settings from local storage if available, otherwise from backend service on signin
   *
   * @memberof SettingsService
   */
  loadUserSettings() {
    // there are no default user settings to load
    this.settings.userSettings = {};
  }

  /**
   * Returns current settings.
   *
   * @returns {Settings}
   * @memberof SettingsService
   */
  getSettings(): AppSettings {
    return this.settings;
  }

  /**
   * Details: This function return currency symbol of a selected language
   * return like $ for US
   * Developer: Utpal<Utpal.Sarker@brainstation23.com>
   * Issue-Ticket: GMA-4839
   * @readonly
   * @type {string}
   * @memberof SettingsService
   */
  get getCurrencySymbol(): string {
    return getLocaleCurrencySymbol(this.settings.systemSettings.selectedLocale.locale);
  }

  /**
   *  Set the user settings
   *
   * @param {UserSettings} userSettings
   * @memberof SettingsService
   */
  async setUserSettings(userSettings: UserSettings): Promise<void> {
    this.settings = { ...this.settings, ...{ userSettings } };
    this.analyticsService.setUserProperty(AnalyticsUserProperties.UserName, this.settings.userSettings.username);
    this.analyticsService.setUserProperty(AnalyticsUserProperties.BankName, this.settings.userSettings.bankIdentifier);
    await this.storageService.setItem(StorageKey.APPSETTINGS, this.settings);
    this.setLanguage();
  }
  /**
   * Set app language based on APP_INITIALIZER localization or On demands need
   * language prefix will first check if bank identifier is available or else
   * common translation will be selected.
   * @example
   * this.translate.use('common/en-us')
   * this.translate.use('axiomme/en-us') [bank selected]
   * @memberof SettingsService
   */
  setLanguage(): void {
    const userSettings = this.getSettings().userSettings;
    let loaderUrlPrefix = 'common';
    if (userSettings && userSettings.bankIdentifier) {
      loaderUrlPrefix = `${userSettings.bankIdentifier}`;
    }
    this.translate.use(`${loaderUrlPrefix}/${this.settings.systemSettings.selectedLocale.locale}`);
  }

  async load(): Promise<any> {
    // first we check if the settings already exist.
    const tempSettings = (await this.storageService.getItem(StorageKey.APPSETTINGS)) as AppSettings;

    if (tempSettings) {
      logger.debug('loading appsettings from localstorage');
      this.settings = tempSettings;
      // localization set
      this.setLanguage();
      return Promise.resolve();
    }

    // means we have not yet initialized the app so we need to do the following:
    // 1. figure out the device language and set it on translation service,
    // 2. What information do we need to be set other than the device language ?
    // we only need menu information to be set after login, since it can change dynamically.
    // so we really do not need anything else.
    logger.debug('creating new appsettings');
    this.loadSystemSettings();
    this.loadUserSettings();
    await this.storageService.setItem(StorageKey.APPSETTINGS, this.settings);
    return Promise.resolve();
  }
}
