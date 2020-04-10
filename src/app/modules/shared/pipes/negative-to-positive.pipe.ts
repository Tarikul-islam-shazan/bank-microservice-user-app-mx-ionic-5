/**
 * pipe: ngToPos
 * Details: according to the language it change its currency
 * Date: March 5th, 2020
 * Developer: Sudipta <sudipta.ghosh@bs-23.net>
 */
import { Pipe, PipeTransform } from '@angular/core';
import { ICurrencyFormat } from '../models';
import { SettingsService } from '@app/core/services/settings.service';
import { Locale } from '@app/core/models/app-settings';

@Pipe({
  name: 'negToPos',
  pure: false
})
export class NegativeToPositivePipe implements PipeTransform {
  constructor(private settingService: SettingsService) {}
  /**
   *
   * @description this function add currency symbol and formate according to the language
   * @param {number} val
   * @returns {string}
   * @memberof NegativeToPositivePipe
   */
  transform(val: number): string {
    const formatConfig: ICurrencyFormat = {
      style: 'currency',
      currency: this.settingService.getCurrentLocale().currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      currencyDisplay: 'symbol'
    };

    // setup formatters
    const updatedNumber = new Intl.NumberFormat(
      `${this.currentLocale.language}-${this.currentLocale.country.toUpperCase()}`,
      formatConfig
    ).format(val);
    return updatedNumber;
  }

  /**
   *
   *
   * @readonly
   * @type {Locale}
   * @memberof NegativeToPositivePipe
   */
  get currentLocale(): Locale {
    return this.settingService.getCurrentLocale();
  }
}
