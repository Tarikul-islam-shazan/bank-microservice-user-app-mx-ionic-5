/**
 * Pipe: Email Name
 * Module: Shared
 * Details: This Pipe will convert email to 2 latter Name
 * Example:
 * 1. hellomeed@meed.net => he
 * 2. hello.meed@meed.net => hm
 * 3. hello.meed.email@meed.net => hm
 * 4. hello.meed_email@meed.net => hm
 * 5. hello_meed_email@meed.net => hm
 *
 * Created: 28-February-2020
 * Developer: Rahadur Rahman <rahadur.rahman@brainstation23.com>
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailName'
})
export class EmailNamePipe implements PipeTransform {
  transform(email: string): string {
    const splitEmail = email.split('@')[0].split(/[._-]/);
    if (splitEmail.length > 1) {
      return `${splitEmail[0].charAt(0)}${splitEmail[1].charAt(0)}`;
    } else {
      return `${email.charAt(0)}${email.charAt(1)}`;
    }
  }
}
