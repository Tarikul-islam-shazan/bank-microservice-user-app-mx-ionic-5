/**
 * Feature: Invite Model
 * Details: This file is responsible to declare all invitations model for Map api response & declaration types.
 * Date: February 10, 2020
 * Developer: Rahadur Rahman <rahadur.rahman@brainstation23.com>
 */
export interface Invitation {
  inviter: string;
  member: string;
  inviteeEmail: string;
  message: string;
  expirationDate: Date;
  createdDate: string;
  status: string;
  language: string;
}

export interface InvitationRequest {
  inviteeEmail: string;
  language: string;
  message: string;
}

export interface InviteeEmail {
  inviteeEmail: string;
}

export interface Contact {
  name: string;
  emails: string[];
  selected?: boolean;
}

export interface InviteeContact {
  name?: string;
  email: string;
  selected?: boolean;
  isAlreadyMeedMember?: boolean;
}
