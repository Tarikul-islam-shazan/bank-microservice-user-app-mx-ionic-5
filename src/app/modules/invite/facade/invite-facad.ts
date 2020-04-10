/**
 * Feature: Invite Facade
 * Details: This facade is responsible to call functionality from Invite Service.
 * Date: February 10, 2020
 * Developer: Rahadur Rahman <rahadur.rahman@brainstation23.com>
 */
import { Injectable } from '@angular/core';
import { InviteService } from './../services/invite.service';
import { Observable } from 'rxjs';
import { Invitation } from '../models/invite';

export enum InviteStatus {
  Sent = 'SENT',
  Read = 'READ'
}

@Injectable()
export class InviteFacade {
  constructor(private inviteService: InviteService) {}

  /**
   * Get all invitations from InvitationService.
   * Which will be called from ngOnInit() method in invite page.
   *
   * @param null
   * @returns Observable<Invitation[]>
   */
  get invitations(): Observable<Invitation[]> {
    return this.inviteService.invitations;
  }

  get status(): typeof InviteStatus {
    return InviteStatus;
  }
}
