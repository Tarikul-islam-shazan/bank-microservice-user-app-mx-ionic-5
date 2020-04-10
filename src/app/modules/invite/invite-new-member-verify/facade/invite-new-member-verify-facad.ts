/**
 * Feature: Invite New Member Verify Facade
 * Module: InviteNewMemberVerify
 * Details: This facade is responsible to call functionality from Invite Service.
 * Date: February 28, 2020
 * Developer: Rahadur Rahman <rahadur.rahman@brainstation23.com>
 */
import { Injectable } from '@angular/core';
import { InviteService } from './../../services';
import { InviteeContact } from '@app/invite/models/invite';
import { Router } from '@angular/router';

@Injectable()
export class InviteNewMemberVerifyFacade {
  constructor(private router: Router, private inviteService: InviteService) {}

  get inviteeContacts(): InviteeContact[] {
    return this.inviteService.inviteeContacts;
  }

  /**
   * This method will navigate user back to the invite new member page and
   * removed only existing meed members emails.
   *
   * @param { null }
   * @returns { null }
   */
  onBackClick(): void {
    this.router.navigate(['/dashboard/invite/invite-new-member']);
  }

  /**
   * This method will navigate user to the invite confirm page and
   * removed only existing meed members emails.
   *
   * @param { null }
   * @returns { null }
   */
  onContinueClick(): void {
    this.router.navigateByUrl('/dashboard/invite/invite-new-member-confirm');
  }

  /**
   * On page Leave removed all existing Meed Member Emails from Invitee emails
   *
   * @param { null }
   * @returns { null }
   */
  removeExistingMeedMemberEmails(): void {
    this.inviteService.removeExistingMeedMemberEmails();
  }

  /**
   * This method will check is there only Meed Member Emails are existing or not.
   * If yes it's return true otherwise return false.
   *
   * @param { null }
   * @returns { hasExistingMeedMemberEmails: boolean }
   */
  onlyHasExistingMeedMemberEmails(): boolean {
    let hasExistingMeedMemberEmails = true;
    this.inviteService.inviteeContacts.forEach((inviteeContact: InviteeContact) => {
      if (!inviteeContact.isAlreadyMeedMember) {
        hasExistingMeedMemberEmails = false;
      }
    });
    return hasExistingMeedMemberEmails;
  }
}
