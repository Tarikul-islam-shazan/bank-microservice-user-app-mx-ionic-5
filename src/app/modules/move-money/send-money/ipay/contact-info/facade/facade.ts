import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { P2pService } from '@app/core/services/p2p.service';
import { IContact } from '@app/move-money/send-money/models';
@Injectable()
export class ContactInfoFacade {
  constructor(private router: Router, private p2pService: P2pService) {}

  continue(contactInfoForm: Partial<IContact>): void {
    const { name, phone, email, nickName } = contactInfoForm;
    this.p2pService.contact = { ...this.p2pService.contact, name, phone, email, nickName };
    this.router.navigate(['move-money/send-money/ipay/contact-keyword']);
  }

  get email(): string {
    return this.p2pService.contact.email;
  }
}
