/**
 * Share service: Shared Utility service,
 * Details:  which can be used for small miscellaneous tasks
 * Date: April 03, 2020
 * Developer: Raihan <raihanuzzaman@bs-23.net>
 */

import { Injectable } from '@angular/core';
import { REG_EX_PATTERNS } from '@app/core/models/patterns';
@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor() {}

  /**
   * Takes the formated phone number as a parameter and removes all the special character and dailcode
   * and returns the plain text phone number
   * @param {string} phoneNumber
   * @returns {string}
   * @memberof UtilService
   */
  removeSpecialCharactersAndSpaces(phoneNumber: string): string {
    const newPhone = phoneNumber
      .replace(REG_EX_PATTERNS.NO_SECIAL_CHARACTER, '')
      .replace(REG_EX_PATTERNS.WHITE_SPACE, '')
      .slice(1);
    return newPhone;
  }
}
