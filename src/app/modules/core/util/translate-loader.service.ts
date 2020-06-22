/**
 * Core Utility: Translator Loader service
 * Setting the app local translation json file from remote host.
 * Based on bank selection and user language predefine
 * If no bank selected load common translation file based on user predefine
 * @author Sanitul <sanitul@bs-23.com>
 * Date: March 18, 2020
 */

import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { StorageKey } from '@app/core/models/storage';
import { StorageService } from '@app/core/services/storage.service';
import * as moment from 'moment';

@Injectable()
export class TranslateLoaderService implements TranslateLoader {
  constructor(private httpClient: HttpClient, private handler: HttpBackend, private storageService: StorageService) {
    this.httpClient = new HttpClient(this.handler);
  }
  /**
   * When we call translate.use('common/en-us') or translate.use('axiomme/en-us').
   * getTranslation function hook by TranslateLoader and we receive language as [common/en-us or bank/en-us]
   * We process selelcted language upgradation check from remote head
   * @param {string} lang
   * @returns {Observable<any>}
   * @memberof TranslateLoaderService
   */
  getTranslation(lang: string): Observable<object> {
    const [first, last] = lang.split('/');
    if (!environment.translateLoader.usedRemote) {
      return this.httpClient.get(`/assets/i18n/${last}.json`);
    }
    return new Observable(observer => {
      this.checkUpgrade(first, last).subscribe(async checkUpgradation => {
        await checkUpgradation;
        const translations: any = await this.getTranslations(first, last);
        observer.next(translations.jsonData);
      });
    });
  }
  /**
   * check upgradation before using selected language.
   * This function will compare selected local with remote language http header modify date.
   * Remote header modified date: will only changes if file content updated
   * So based on Remote Last-Modified on compare our local last Modified date
   * And update local if two dates are not the same
   * @param {string} bankIdentifier
   * @param {string} locale
   * @returns
   * @memberof TranslateLoaderService
   */
  checkUpgrade(bankIdentifier: string, locale: string): Observable<Promise<boolean>> {
    return this.httpClient
      .head<any>(`${this.loaderUrl}/${bankIdentifier}/${environment.deployment}/i18n/${locale}.json`, {
        observe: 'response'
      })
      .pipe(
        map(async documentInfo => {
          const remoteFileLastModified = documentInfo.headers.get('Last-Modified');
          return await this.isLocalTranslationsUpdated(bankIdentifier, locale, remoteFileLastModified);
        }),
        map(async localUpdate => {
          const islocalUpdate = await localUpdate;
          if (!islocalUpdate) {
            const fetchRemoteTranslationData = await this.httpClient
              .get(`${this.loaderUrl}/${bankIdentifier}/${environment.deployment}/i18n/${locale}.json`, {
                observe: 'response'
              })
              .toPromise();
            const { headers, body: jsonData } = fetchRemoteTranslationData;
            const modifiedDate = headers.get('Last-Modified');
            await this.updateTranslationData(bankIdentifier, locale, modifiedDate, jsonData);
            return true;
          }
          return false;
        })
      );
  }
  /**
   * async function, will return true or false based on
   * Remote header modified date and local modified date
   *
   * @param {*} bankIdentifier
   * @param {*} locale
   * @param {*} lastModified
   * @returns
   * @memberof TranslateLoaderService
   */
  async isLocalTranslationsUpdated(bankIdentifier: string, locale: string, lastModified: string): Promise<boolean> {
    const localTranslations = await this.getAppLocalTranslations();
    if (localTranslations && localTranslations[bankIdentifier]) {
      if (localTranslations[bankIdentifier][locale]) {
        const localLastModified = localTranslations[bankIdentifier][locale].lastModified;
        if (moment(localLastModified).diff(lastModified) === 0) {
          return true;
        }
        return false;
      }
      return false;
    }
    return false;
  }
  /**
   * Get Translations from local storage [indexedDB] based on bank identifier and local
   * @param {*} bankIdentifier
   * @param {*} locale
   * @returns
   * @memberof TranslateLoaderService
   */
  async getTranslations(bankIdentifier: string, locale: string): Promise<object | {}> {
    const localTranslations = await this.getAppLocalTranslations();
    return localTranslations[bankIdentifier][locale];
  }

  /**
   * So if local and remote modified date are not same, we need to update local with remote
   * And save inside app localstorage [indexedDB]
   *
   * @param {*} bankIdentifier
   * @param {*} locale
   * @param {*} lastModified
   * @param {*} jsonData
   * @memberof TranslateLoaderService
   */
  // save data structure:
  // translations: {
  //   common: {
  //     en-use: {
  //       lastModified: header date
  //       jsonData: translation json
  //     }
  //   },
  //   axiomme: {
  //    en-use: {
  //       lastModified: header date
  //       jsonData: translation json
  //     }
  //   }
  // }
  async updateTranslationData(
    bankIdentifier: string,
    locale: string,
    lastModified: string,
    jsonData: object
  ): Promise<void> {
    const localTranslations = await this.getAppLocalTranslations();
    localTranslations[bankIdentifier] = {
      ...localTranslations[bankIdentifier],
      [locale]: {
        jsonData,
        lastModified
      }
    };
    localTranslations[bankIdentifier][locale] = { jsonData, lastModified };
    await this.storageService.setItem(StorageKey.TRANSLATIONS, localTranslations);
  }
  /**
   * Get translation from local storage [indexedDB]
   * @returns
   * @memberof TranslateLoaderService
   */
  async getAppLocalTranslations(): Promise<object | {}> {
    return (await this.storageService.getItem(StorageKey.TRANSLATIONS)) || {};
  }
  /**
   * Get S3 translate loader url from environment settings
   *
   * @readonly
   * @type {string}
   * @memberof TranslateLoaderService
   */
  get loaderUrl(): string {
    return environment.translateLoader.remoteUrl;
  }
}
