/**
 * Facade: Send money home page facade
 * Details: Fetch contacts and fund request to me from p2p serivce.
 * Modify contact list and fund request
 * Date: January 28, 2020
 * Developer: Sanitul <sanitul@bs-23.com>
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { P2pService } from '@app/core/services/p2p.service';
import { P2PTransferType, IContact, ContactType } from '@app/move-money/send-money/models';
import { IFundRequest } from '@app/move-money/request-money/models';
@Injectable()
export class HomeFacade {
  enableContactsEditUpdate = false;
  constructor(private router: Router, private p2pService: P2pService) {}

  // Contacts selected, continue to the send money p2p transfer process
  continue(receiverEmail: string): void {
    this.transferType(receiverEmail);
  }
  get contacts(): IContact[] {
    return this.p2pService.contactList;
  }
  // Get fund requests to me
  get fundRequests(): IFundRequest[] {
    if (this.p2pService.fundRequestList) {
      return this.p2pService.fundRequestList.filter(
        fundRequest => fundRequest.receiverEmail === this.p2pService.member.email
      );
    }
    return [];
  }
  // Fetch fund requests and contact list when send money landing page initialize
  fetchFundRequests(): void {
    this.p2pService.fetchFundRequests();
    this.p2pService.fetchContacts();
  }
  // Select a fund request to me for accept or decline
  selectRequest(fundRequest: IFundRequest): void {
    this.p2pService.fundRequests = fundRequest;
    this.router.navigate(['move-money/send-money/request-details']);
  }
  // Set the transfer type internal or external for receiver email
  transferType(receiverEmail: string): void {
    this.p2pService.isMeedMember([receiverEmail]).subscribe(responseEmails => {
      if (responseEmails.includes(receiverEmail)) {
        const transferType = P2PTransferType.INTERNAL;
        this.p2pService.p2pTransfer = { ...this.p2pService.p2pTransfer, receiverEmail, transferType };
        this.router.navigate(['move-money/send-money/edit']);
      } else {
        this.p2pService.contact = { ...this.p2pService.contact, email: receiverEmail };
        this.router.navigate(['move-money/send-money/ipay/contact-info']);
      }
    });
  }
  // Contact select and create p2pTransfer object for meed or ipay
  contactSelected(contact: IContact): void {
    const { email, customerId, sharedSecret, contactType } = contact;
    const transferType = contactType === ContactType.MEED ? P2PTransferType.INTERNAL : P2PTransferType.EXTERNAL;
    switch (contactType) {
      case ContactType.MEED:
        this.p2pService.p2pTransfer = { ...this.p2pService.p2pTransfer, receiverEmail: email, transferType };
        break;
      case ContactType.IPAY:
        this.p2pService.p2pTransfer = {
          ...this.p2pService.p2pTransfer,
          transferType,
          receiverEmail: email,
          receiverCustomerId: customerId,
          sharedSecret,
          receiverCurrency: 'USD'
        };
        break;
    }
    this.router.navigate(['move-money/send-money/edit']);
  }
  // Ipay or meed contact modify
  contactModify(contact: IContact): void {
    const customerId = contact.customerId ? contact.customerId : contact._id;
    this.p2pService.contact = { ...contact, customerId };
    this.router.navigate(['move-money/send-money/contact-modify']);
  }

  toggleContactsModify(): void {
    this.enableContactsEditUpdate = !this.enableContactsEditUpdate;
  }

  get isContactsModifyEnable(): boolean {
    return this.enableContactsEditUpdate;
  }
}
