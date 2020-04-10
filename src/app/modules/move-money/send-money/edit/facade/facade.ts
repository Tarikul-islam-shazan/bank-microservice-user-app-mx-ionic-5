import { Injectable } from '@angular/core';
import { P2pService } from '@app/core/services/p2p.service';
import { Router } from '@angular/router';
import { IP2PTransfer } from '@app/move-money/send-money/models';
@Injectable()
export class EditFacade {
  constructor(private p2pService: P2pService, private router: Router) {}

  gotoConfirm(p2prequest: IP2PTransfer): void {
    p2prequest.amount = p2prequest.amount.replace(/\$/g, '');
    const { amount, message } = p2prequest;
    this.p2pService.p2pTransfer = { ...this.p2pTransfer, amount, message };
    this.router.navigate(['move-money/send-money/confirm']);
  }

  cancelEdit(): void {
    this.router.navigate(['move-money/send-money']);
  }
  get p2pTransfer(): Partial<IP2PTransfer> {
    return this.p2pService.p2pTransfer;
  }
  get amount(): string {
    return this.p2pTransfer.amount;
  }
  get message(): string {
    return this.p2pTransfer.message;
  }
  get receiverEmail(): string {
    return this.p2pTransfer.receiverEmail;
  }
}
