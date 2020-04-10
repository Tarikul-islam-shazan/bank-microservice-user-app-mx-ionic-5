/**
 * Feature: Invite New Member Confirm Facade
 * Module: InviteNewMemberConfirm
 * Details: This facade is responsible to call functionality from Invite Service.
 * Date: February 28, 2020
 * Developer: Rahadur Rahman <rahadur.rahman@brainstation23.com>
 */
import { Injectable } from '@angular/core';
import { InviteService } from '@app/invite/services';
import { InvitationRequest, InviteeContact } from '@app/invite/models/invite';
import { Router } from '@angular/router';
import { SettingsService } from '@app/core';
import { IMeedModalContent, ModalService, SuccessModalPage } from '@app/shared';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class InviteNewMemberConfirmFacade {
  inviteMessage = '';

  constructor(
    private router: Router,
    private inviteService: InviteService,
    private settingServices: SettingsService,
    private modalService: ModalService,
    private translate: TranslateService
  ) {
    this.inviteMessage = this.translate.instant('invite-module.invite-new-member-confirm.invite-message');
  }

  get inviteeContacts(): InviteeContact[] {
    return this.inviteService.inviteeContacts;
  }

  onClickBack(): void {
    this.router.navigateByUrl('/dashboard/invite/invite-new-member');
  }

  /**
   * This method will Map all InviteeEmail to InviteeRequest and call
   * sendInvitation() method from InviteService and open a Success modal
   * after sanding the invitation.
   *
   * @param { null }
   * @returns { null }
   */
  onClickInvite(): void {
    const invitations: InvitationRequest[] = [];
    this.inviteService.inviteeContacts.forEach((inviteeContact: InviteeContact) => {
      invitations.push({
        inviteeEmail: inviteeContact.email,
        language: this.settingServices.getCurrentLocale().locale,
        message: this.inviteMessage
      });
    });

    // Send invitations to the Backend server
    this.inviteService.sendInvitation(invitations).subscribe((success: boolean) => {
      if (success) {
        this.inviteService.inviteeContacts = [];
        this.openSuccessModal();
      }
    });
  }

  /**
   * This method will removed invitee email on badge-email click
   *
   * @param {index: number}
   * @returns { null }
   */
  removeContact(index: number): void {
    this.inviteService.inviteeContacts.splice(index, 1);
    if (this.inviteService.inviteeContacts.length <= 0) {
      this.router.navigateByUrl('/dashboard/invite/invite-new-member');
    }
  }

  /**
   * This method will open success modal after successfully
   *
   * @param { null }
   * @returns { null }
   */
  private openSuccessModal(): void {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'invite-module.invite-success-modal.success-modal-title'
        }
      ],
      actionButtons: [
        {
          text: 'invite-module.invite-success-modal.success-modal-button',
          cssClass: 'white-button',
          handler: async () => {
            this.modalService.close();
          }
        }
      ],
      onDidDismiss: async () => {
        await this.navigateToMeedShare();
      }
    };

    this.modalService.openModal(SuccessModalPage, componentProps);
  }

  /**
   * This method will redirect to MeedShare after successfully
   * send invitation
   *
   * @param null
   * @returns null { Promise<void> }
   */
  private async navigateToMeedShare(): Promise<void> {
    this.router.navigateByUrl('/dashboard/invite').then(() => {
      this.router.navigateByUrl('/dashboard/rewards').then(() => {
        this.router.navigateByUrl('/meed-share');
      });
    });
  }
}
