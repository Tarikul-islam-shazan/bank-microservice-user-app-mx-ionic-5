/**
 * Pipe: Send money contactsFilter
 * Details: Send money landing page contacts filter based on user input.
 * Filter contacts list based on user type in search input box
 * Date: February 14, 2020
 * Developer: Sanitul <sanitul@bs-23.com>
 */
import { IContact } from '@app/move-money/send-money/models';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsPipe implements PipeTransform {
  transform(contacts: IContact[], value: string, keyField: string): IContact[] {
    if (!contacts || !value) {
      return contacts;
    }
    return contacts.filter(item => item[keyField].indexOf(value) !== -1);
  }
}
