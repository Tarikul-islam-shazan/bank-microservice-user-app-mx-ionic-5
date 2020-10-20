/**
 * Feature: Invite Facade
 * Details: This facade is responsible to call functionality from Invite Service.
 * Date: February 10, 2020
 * Developer: Rahadur Rahman <rahadur.rahman@brainstation23.com>
 */
import { Injectable } from '@angular/core';
import { InviteService } from '../services/invite.service';
import { Invitation } from '../models/invite';
import { AnalyticsEventTypes, AnalyticsService } from '@app/analytics';

export enum InviteStatus {
  Sent = 'SENT',
  Read = 'READ',
  Applied = 'APPLIED'
}

@Injectable()
export class InviteFacade {
  private _invitations: Invitation[];
  constructor(private inviteService: InviteService, private readonly analyticsService: AnalyticsService) {
    this._invitations = [];
  }

  /**
   * Get all invitations from InvitationService.
   * Which will be called from ngOnInit() method in invite page.
   *
   * @param null
   * @returns Observable<Invitation[]>
   * @returns _invitations { Invitation[] }
   */
  get invitations(): Invitation[] {
    return this._invitations;
  }

  set invitations(invitations: Invitation[]) {
    this._invitations = invitations;
  }

  get status(): typeof InviteStatus {
    return InviteStatus;
  }

  initialize() {
    this.inviteService.getInvitations().subscribe((invitations: Invitation[]) => {
      this.analyticsService.logEvent(AnalyticsEventTypes.AllInvitationsLoaded);
      this.invitations = invitations;
    });
  }
}
