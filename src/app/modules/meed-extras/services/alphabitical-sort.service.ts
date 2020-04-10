/**
 * Service: alphabitical sort service
 * Details: sort offer list
 * Date: February 25th, 2020
 * Developer: Sudipta <sudipta.ghosh@bs-23.net>
 */
import { Injectable } from '@angular/core';
import { Iindex } from '@app/meed-extras/models/meed-extra';
import { Offer } from '@app/core';

/**
 *
 *
 * @export
 * @class AlphabiticalSortService
 */
@Injectable({
  providedIn: 'root'
})
export class AlphabiticalSortService {
  constructor() {}

  /**
   *
   * summary: sortOfferList sort the offers and makes offers group according to the first letter of the offer
   * @param {Offer[]} offerList
   * @returns {([[Iindex | Offer]])}
   * @memberof AlphabiticalSortService
   */
  sortOfferList(offerList: Offer[]): [[Iindex | Offer]] {
    offerList.sort(this.compareValues('merchant', 'asc'));
    const alphabeticOfferList = [];
    let currentLetter = '';
    let firstLetter = '';
    let subOfList = [];
    offerList.forEach(offer => {
      currentLetter = offer.merchant[0].toUpperCase();
      if (currentLetter !== firstLetter) {
        firstLetter = currentLetter;
        if (/^[a-zA-Z()]$/.test(currentLetter)) {
          subOfList = [{ index: currentLetter }, offer];
        } else {
          subOfList = [{ index: '#' }, offer];
        }
        if (subOfList.length > 0) {
          alphabeticOfferList.push(subOfList);
        }
      } else {
        subOfList.push(offer);
      }
    });

    return alphabeticOfferList as [[Iindex | Offer]];
  }

  /**
   *
   * summary: compareValues is sort according to the key and order
   * @param {*} key
   * @param {string} [order='asc']
   * @returns
   * @memberof AlphabiticalSortService
   */
  compareValues(key, order = 'asc') {
    return (a, b) => {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === 'desc' ? comparison * -1 : comparison;
    };
  }
}
