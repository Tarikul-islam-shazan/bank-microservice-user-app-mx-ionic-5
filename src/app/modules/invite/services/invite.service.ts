/**
 * Feature: Invite Service
 * Details: This service handle all backend API request for invitation module.
 * Date: February 10, 2020
 * Updated: March 30, 2020
 * Developer: Rahadur Rahman <rahadur.rahman@brainstation23.com>
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeaderService } from '@app/core/services/header-service.service';
import { environment } from '@env/environment';

import { Invitation, InviteeEmail, InvitationRequest, InviteeContact } from './../models/invite';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';

@Injectable()
export class InviteService {
  private _inviteeContacts: InviteeContact[];

  constructor(private headerService: HeaderService, private http: HttpClient) {
    this._inviteeContacts = [];
  }

  /**
   * This method fetch all Invitations from Backend API service
   * and return an Observable array response.
   *
   * @param null
   * @returns Observable<Invitation[]>
   */
  getInvitations(): Observable<Invitation[]> {
    return this.http.get<Invitation[]>(`${environment.serviceUrl}/invitations`, {
      headers: this.headerService.getMemberIdHeader()
    });
  }

  /**
   * This method is responsible for sending invitation to all of the valid invitee emails.
   * after successfully send invitation request it will received Invitation array from
   * backend server. and populate _invitations$ Observable property with upcoming response
   *
   * @param { inviteeEmails: InvitationRequest[] }
   * @returns { Observable<boolean>}
   */
  sendInvitation(inviteeEmails: InvitationRequest[]): Observable<boolean> {
    return this.http
      .post<Invitation[]>(`${environment.serviceUrl}/invitations`, inviteeEmails, {
        headers: this.headerService.getMemberIdHeader()
      })
      .pipe(
        map((response: Invitation[]) => {
          if (response) {
            return true;
          } else {
            return false;
          }
        })
      );
  }

  /**
   * This method is responsible to Verify all invitee email which is entered for
   * invitation request. This method will check is there any Existing Meed Member Email
   * entered by the user or not. If any existing meed member email is entered,
   * method will received thous members email as a response from Backend server,
   * and Map *isAlreadyMeedMember* property of all of the Meed member emails.
   *
   * @param { null }
   * @returns { Observable<boolean> }
   */
  verifyInviteeEmails(inviteeEmails: InviteeEmail[]): Observable<boolean> {
    return this.http
      .post<InviteeEmail[]>(`${environment.serviceUrl}/invitations/verify`, inviteeEmails, {
        headers: this.headerService.getBankIdentifierHeader()
      })
      .pipe(
        map((response: InviteeEmail[]) => {
          let hasExistingMeedMemberEmail = false;
          response.map((inviteeEmail: InviteeEmail) => {
            const index = this.inviteeContacts.findIndex(
              (inviteeContact: InviteeContact) => inviteeContact.email === inviteeEmail.inviteeEmail
            );
            this.inviteeContacts[index].isAlreadyMeedMember = true;
            hasExistingMeedMemberEmail = true;
          });
          return hasExistingMeedMemberEmail;
        })
      );
  }

  /**
   * This method is responsible to Removed all existing meed member email
   * from _inviteeContacts: InviteeContact[] property
   *
   * @param { null }
   * @returns { null }
   */
  removeExistingMeedMemberEmails(): void {
    this.inviteeContacts = this.inviteeContacts.filter((inviteeContact: InviteeContact) => {
      if (!inviteeContact.isAlreadyMeedMember) {
        return inviteeContact;
      }
    });
  }

  /**
   * This get inviteeContacts property method allow us to access _inviteeContacts
   * from all over the Invite Module. Which help us to maintain the state of
   * this property.
   *
   * @param { null }
   * @returns { inviteeContact: InviteeContact[][] }
   */
  get inviteeContacts(): InviteeContact[] {
    return this._inviteeContacts;
  }

  /**
   * This set inviteeContacts property method allow us to assign _inviteeContacts
   * from all over the Invite Module. Which help us to maintain the state of
   * this property.
   *
   * @param { inviteeContact: InviteeContact[][] }
   * @returns { null }
   */
  set inviteeContacts(inviteeContact: InviteeContact[]) {
    this._inviteeContacts = inviteeContact;
  }
}
