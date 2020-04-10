import { IContact } from '@app/move-money/send-money/models';
/**
 * Pipe: Request money contactsFilter
 * Details: Request money landing page contacts pipe.
 * Filter contacts list based on user type in search input box
 * Date: January 28, 2020
 * Developer: Sanitul <sanitul@bs-23.com>
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsPipe implements PipeTransform {
  transform(contacts: IContact[], email: string): IContact[] {
    if (!contacts || !email) {
      return contacts;
    }
    return contacts.filter(item => item.email.indexOf(email) !== -1);
  }
}
