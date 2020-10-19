/**
 * Facade: Request money
 * Details: Request money landing page facade.
 * handle contacts search, fetch fund request, meed contacts
 * Date: January 28, 2020
 * Developer: Sanitul <sanitul@bs-23.com>
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsEventTypes, AnalyticsService } from '@app/analytics';
import { P2pService } from '@app/core/services/p2p.service';
import { IFundRequest } from '@app/move-money/request-money/models';
import { IContact, ContactType } from '@app/move-money/send-money/models';
@Injectable()
export class HomeFacade {
  receiverEmails: string[] = [];
  constructor(
    private router: Router,
    private p2pService: P2pService,
    private readonly analyticsService: AnalyticsService
  ) {}

  // Contact search input emails on changes events
  onInputEmailsChanges(emails: string[]) {
    this.receiverEmails = emails;
  }

  // Meed contacts selected, continue to the request money process
  continue(): void {
    this.isMeedMembers(this.receiverEmails);
  }

  // Check if fund requested receivers are meed members
  isMeedMembers(receiverEmails: string[]): void {
    this.p2pService.isMeedMember(receiverEmails).subscribe(responseEmails => {
      const meedMembers = receiverEmails.filter(value => responseEmails.includes(value));
      this.p2pService.fundRequests = this.addSenderToFundRequest(meedMembers);
      this.receiverEmails = [];
      this.router.navigate(['move-money/request-money/selected']);
    });
  }

  // Select contacts from contact list
  contactSelected(contact: IContact): void {
    this.analyticsService.logEvent(AnalyticsEventTypes.P2PContactSelected, { contact });
    if (!this.receiverEmails.includes(contact.email)) {
      this.receiverEmails.push(contact.email);
    }
  }

  // Add self email [login user] as a senderEmail on fund requests object
  addSenderToFundRequest(receiverEmails: string[]): IFundRequest[] {
    return receiverEmails.map(receiverEmail => {
      return {
        senderEmail: this.p2pService.member.email,
        receiverEmail
      };
    });
  }

  // Get current pending fund requests
  get fundRequests(): IFundRequest[] {
    return this.p2pService.fundRequestList;
  }

  // Get current user contact list
  get contacts(): IContact[] {
    if (this.p2pService.contactList) {
      return this.p2pService.contactList.filter(contact => contact.contactType === ContactType.MEED);
    }
    return [];
  }

  // Fetch fund request and contact list when request money landing page initialize
  fetchFundRequests(): void {
    this.p2pService.fetchFundRequests();
    this.p2pService.fetchContacts();
    this.analyticsService.logEvent(AnalyticsEventTypes.P2PFundRequestsLoaded);
    this.analyticsService.logEvent(AnalyticsEventTypes.P2PContactsLoaded);
  }

  // Select pending fund request from list for modifications
  selectRequest(fundRequest: IFundRequest) {
    this.p2pService.fundRequests = fundRequest;
    this.analyticsService.logEvent(AnalyticsEventTypes.P2PFundRequestSelected, { fundRequest });
    this.router.navigate(['move-money/request-money/cancel']);
  }
}
