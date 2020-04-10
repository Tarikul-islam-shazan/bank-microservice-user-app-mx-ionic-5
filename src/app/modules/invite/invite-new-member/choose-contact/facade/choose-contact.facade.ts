/**
 * Feature: Fcade
 * Details: This facade handle all action of choose contacts.
 * Date: March 30, 2020
 * Developer: Rahadur Rahman <rahadur.rahman@brainstation23.com>
 */
import { Injectable } from '@angular/core';
import { Options } from '@meed-native/contacts/ngx';
import { ChooseContactService } from '@app/invite/services/choose-contact.service';
import { InviteService } from '@app/invite/services';
import { Contact, InviteeContact } from '@app/invite/models/invite';
import { ModalService, IMeedModalContent } from '@app/shared';
import { AppPlatform } from '@app/core';

@Injectable()
export class ChooseContactFacade {
  searchString = '';

  contacts: Contact[];

  searchContacts: Contact[];

  infiniteScrollDisabled = false;

  private limit = 20;
  private skip = 0;

  constructor(
    private contactService: ChooseContactService,
    private inviteService: InviteService,
    private modalService: ModalService,
    private platformService: AppPlatform
  ) {}

  /**
   * This method will return limited contacts list
   * when page or modal open fist time.
   *
   * @params null
   * @returns Promise<void>
   */
  async fetchContacts(): Promise<void> {
    const contactPermission = await this.platformService.requestContactPermission();
    if (contactPermission) {
      const options: Options = { limit: this.limit, skip: this.skip };
      this.contacts = await this.contactService.fetchContacts(options);
      this.skip = this.skip + (this.limit + 1);
      this.contactCheckMaps();
    } else {
      await this.showPermissionSettingModal();
    }
  }

  /**
   * This method will search contacts by Contact display name
   * and return 50 limited contacts at a time.
   *
   * @param event { (ionChange) }
   * @returns null { Promise<void> }
   */
  async searchContact(searchText: string): Promise<void> {
    this.searchString = searchText;
    const option: Options = { limit: 50, skip: 0 };
    if (this.searchString) {
      this.searchContacts = await this.contactService.searchContacts(this.searchString, option);
      await this.searchContactsCheckMaps();
    } else {
      this.searchContacts = [];
    }
  }

  /**
   * This method will add contact to our inviteeContacts.
   * to whom an invitation will be send.
   *
   * @param contact { Contact } Single Contact of plugin contacts.
   * @returns null { Promise<void> }
   */
  async onSelectContact(contact: Contact): Promise<void> {
    const find = this.inviteService.inviteeContacts.find(
      (inviteeContact: InviteeContact) => inviteeContact.name === contact.name
    );

    if (!find && contact.selected) {
      const inviteeContact: InviteeContact = {
        name: contact.name,
        email: contact.emails[0],
        selected: contact.selected
      };
      this.inviteService.inviteeContacts.push(inviteeContact);
    } else {
      if (!contact.selected) {
        const index = this.inviteService.inviteeContacts.indexOf(find);
        this.inviteService.inviteeContacts.splice(index, 1);
      }
    }
  }

  /**
   * This method is like previous onSelectContact() but
   * it will add contacts to our inviteeContacts. from searchContacts
   *
   * @param contact { Contact } Single Contact of plugin contacts.
   * @returns null { Promise<void> }
   */
  async onSelectSearchContact(contact: Contact): Promise<void> {
    const find = this.inviteService.inviteeContacts.find(
      (inviteeContact: InviteeContact) => inviteeContact.name === contact.name
    );

    if (!find && contact.selected) {
      const inviteeContact: InviteeContact = {
        name: contact.name,
        email: contact.emails[0],
        selected: contact.selected
      };
      this.inviteService.inviteeContacts.push(inviteeContact);
      this.contactCheckMaps();
    } else {
      if (!contact.selected) {
        const index = this.inviteService.inviteeContacts.indexOf(find);
        this.inviteService.inviteeContacts.splice(index, 1);
        this.contacts.map((con: Contact) => {
          if (con.name === contact.name) {
            con.selected = false;
          }
        });
      }
    }
  }

  /**
   * This method will fetch more contact when ionic "ion-infinite-scroll"
   *  (ionInfinite) event called and update contacts list with more
   * contacts.
   *
   * @param event { (ionInfinite) }
   * @returns null { Promise<void> }
   */
  async doInfinite(event: any): Promise<void> {
    const options: Options = { limit: this.limit, skip: this.skip };
    const newContacts = await this.contactService.fetchContacts(options);

    event.target.complete();
    if (newContacts.length > 0) {
      this.contacts.push(...newContacts);
      this.skip = this.skip + (this.limit + 1);
      this.contactCheckMaps();
    } else {
      this.infiniteScrollDisabled = true;
    }
  }

  /**
   * This method is only for close Choose contact modal.
   * but this "Add friend" button will active when user select at least one
   * contact from contacts list.
   *
   * @param null
   * @returns null { Promise<void> }
   */
  async onAddFriendClick(): Promise<void> {
    this.modalService.close();
  }

  /**
   * This method will check is inviteeContacts has  at least one
   * contact from contacts list.
   *
   * @param null
   * @returns true/false { boolean }
   */
  enableAddFriendButton(): boolean {
    const find = this.inviteService.inviteeContacts.find(
      (inviteeContact: InviteeContact) => inviteeContact.selected === true
    );

    if (!find) {
      return true;
    }
    return false;
  }

  /**
   * This method will close "Choose from contact" modal.
   *
   * @param null
   * @returns null { Promise<void> }
   */
  async onBackClick(): Promise<void> {
    await this.modalService.close();
  }

  /**
   * This method will clear contacts list, search text & set
   * skip to 0 if user close the modal.
   *
   * @param null
   * @returns null {void}
   */
  clearSearchText(): void {
    this.searchString = '';
    this.contacts = [];
    this.skip = 0;
    this.infiniteScrollDisabled = false;
  }

  /**
   * This method will check or uncheck the "ion-checkbox"
   * of contacts list items based on inviteeContacts.
   *
   * @param null
   * @returns null { Promise<void> }
   */
  private async contactCheckMaps(): Promise<void> {
    if (this.inviteService.inviteeContacts.length > 0) {
      this.inviteService.inviteeContacts.forEach((inviteeContact: InviteeContact) => {
        this.contacts.map((contact: Contact) => {
          if (contact.name === inviteeContact.name) {
            contact.selected = true;
          }
        });
      });
    }
  }

  /**
   * This method will check or uncheck the "ion-checkbox"
   * of searchContacts list items based on inviteeContacts.
   *
   * @param null
   * @returns null { Promise<void> }
   */
  private async searchContactsCheckMaps(): Promise<void> {
    if (this.inviteService.inviteeContacts.length > 0) {
      this.inviteService.inviteeContacts.forEach((inviteeContact: InviteeContact) => {
        this.searchContacts.map((contact: Contact) => {
          if (inviteeContact.name === contact.name) {
            contact.selected = true;
          }
        });
      });
    }
  }

  /**
   * This method will show permission modal id user Deny Contacts
   * Permission for the first time when user open "Choose form contact" modal
   *
   * @param null
   * @returns null { Promise<void> }
   */
  private async showPermissionSettingModal(): Promise<void> {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'invite-module.invite-new-member-page.permission-setting-modal.title',
          details: ['invite-module.invite-new-member-page.permission-setting-modal.details']
        }
      ],
      actionButtons: [
        {
          text: 'invite-module.invite-new-member-page.permission-setting-modal.setting-button-text',
          cssClass: 'white-button',
          handler: async () => {
            await this.platformService.openNativeAppSetting();
            await this.modalService.close();
            await this.modalService.close();
          }
        },
        {
          text: 'invite-module.invite-new-member-page.permission-setting-modal.cancel-button-text',
          cssClass: 'grey-outline-button',
          handler: async () => {
            await this.modalService.close();
            await this.modalService.close();
          }
        }
      ]
    };

    await this.modalService.openInfoModalComponent({ componentProps });
  }
}
