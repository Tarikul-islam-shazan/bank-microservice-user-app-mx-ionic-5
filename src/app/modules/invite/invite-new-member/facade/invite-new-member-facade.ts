/**
 * Facade: Invite New Member Facade
 * Module: InviteNewMember
 * Details: This facade is responsible to call functionality from Invite Service.
 * Date: February 10, 2020
 * Developer: Rahadur Rahman <rahadur.rahman@brainstation23.com>
 */
import { Injectable } from '@angular/core';
import { InviteService } from '../../services';
import { AppPlatform } from '@app/core';
import { Router } from '@angular/router';
import { InviteeEmail, InviteeContact } from '@app/invite/models/invite';
import { REG_EX_PATTERNS } from '@app/core/models';
import { ModalService, IMeedModalContent, IinputOption, InputFormatType } from '@app/shared';
import { ChooseContactPage } from '../choose-contact/container/choose-contact.page';

@Injectable()
export class InviteNewMemberFacade {
  emailFormatMask: IinputOption;
  public inviteeContact: InviteeContact[];
  public email = '';
  public name = '';

  constructor(
    private appPlatform: AppPlatform,
    private inviteService: InviteService,
    private router: Router,
    private modalService: ModalService
  ) {
    this.emailFormatMask = {
      type: InputFormatType.EMAIL_ADDRESS_FORMAT
    };
    this.inviteeContact = [];
  }

  /**
   * Return is current platform is cordova or not.
   *
   * @param { null }
   * @returns { cordova: boolean }
   */
  get isCordova(): boolean {
    return this.appPlatform.isCordova();
  }

  /**
   * This method will create Email badge when user enter a valid email and name
   * and click Add Invitee button to enter another invitee.
   *
   * @param null
   * @returns null { void }
   */

  addInvitee() {
    if (this.isValidEmail()) {
      if (!this.emailAlreadyEntered()) {
        this.inviteService.inviteeContacts.push({ name: this.name.trim(), email: this.email.trim() });
        this.email = '';
        this.name = '';
      }
    }
  }

  getContacts(): void {
    this.inviteeContact = this.inviteService.inviteeContacts;
  }

  removeContact(index: number): void {
    this.inviteService.inviteeContacts.splice(index, 1);
  }

  /**
   * That Continue button click event called verifyInviteeEmails() method
   * form InviteService for check is there any meed member emails are entered
   * or not. If Yes then this method redirect us to Verify page, If not
   * it will redirect us to Confirmation Page.
   *
   * @param { null }
   * @returns { null }
   */
  onContinueClick(): void {
    if (this.isValidEmail() && !this.emailAlreadyEntered() && this.name !== '') {
      this.inviteService.inviteeContacts.push({ name: this.name.trim(), email: this.email.trim() });
      this.email = '';
      this.name = '';
    } else {
      this.email = '';
      this.name = '';
    }

    const inviteeEmails: InviteeEmail[] = [];
    this.inviteService.inviteeContacts.forEach((inviteeContact: InviteeContact) => {
      inviteeEmails.push({ inviteeEmail: inviteeContact.email });
    });
    this.inviteService.verifyInviteeEmails(inviteeEmails).subscribe((hasMeedMemberEmail: boolean) => {
      if (hasMeedMemberEmail) {
        this.router.navigateByUrl('/dashboard/invite/invite-new-member-verify');
      } else {
        this.router.navigateByUrl('/dashboard/invite/invite-new-member-confirm');
      }
    });
  }

  /**
   * This method open selected Choose from contact modal
   * with already entered contact or emails.
   *
   * @param null
   * @returns null { Promise<void> }
   */
  async onChooseFromContact(): Promise<void> {
    const componentProps: IMeedModalContent = {
      onDidDismiss: () => {
        this.inviteeContact = this.inviteService.inviteeContacts;
      }
    };
    this.modalService.openModal(ChooseContactPage, componentProps);
  }

  /**
   * This method clear all selected inviteeContacts
   * if user close this page.
   *
   * @param null
   * @returns null { Promise<void> }
   */
  async onClickBack(): Promise<void> {
    this.inviteService.inviteeContacts = [];
    this.email = '';
  }

  /**
   * This method will check invitee email is valid or not
   *
   * @param null
   * @returns true/false { boolean }
   */
  isValidEmail(): boolean {
    if (REG_EX_PATTERNS.EMAIL.test(this.email.trim())) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * This method will check is an invitee email already entered
   * for invitation.
   *
   * @param null
   * @returns true/false { boolean }
   */
  emailAlreadyEntered(): boolean {
    return this.inviteService.inviteeContacts.find(contact => contact.email === this.email.trim()) ? true : false;
  }
}
