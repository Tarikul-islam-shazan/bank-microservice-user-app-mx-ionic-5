/**
 * Feature: Service
 * Details: This is the service of choose contacts. Which wll handle Contact plugin
 * Date: March 30, 2020
 * Developer: Rahadur Rahman <rahadur.rahman@brainstation23.com>
 */
import { Injectable } from '@angular/core';
import { Contacts, Options, Contact } from '@meed-native/contacts/ngx';

@Injectable()
export class ChooseContactService {
  constructor(private contacts: Contacts) {}

  /**
   * This method will return limited contacts form Contacts
   * plugin.
   *
   * @param options { Options }
   * @returns contacts { Promise<Contact[]> }
   */
  async fetchContacts(options: Options): Promise<Contact[]> {
    try {
      const contacts = await this.contacts.all(options);
      return contacts;
    } catch (error) {
      return [];
    }
  }

  /**
   * This method search contacts by contact name form Contacts
   * plugin.
   *
   * @param searchText { string }
   * @param options { Options }
   * @returns contacts { Promise<Contact[]> }
   */
  async searchContacts(searchText: string, options: Options): Promise<Contact[]> {
    try {
      const contacts = await this.contacts.search(searchText, options);
      return contacts;
    } catch (error) {
      return [];
    }
  }
}
