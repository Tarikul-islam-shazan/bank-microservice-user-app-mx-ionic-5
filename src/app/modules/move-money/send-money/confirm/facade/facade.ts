/**
 * Facade: Send money confirm facade
 * Details: submit send money p2p transfer to external ipay member or internal meed member
 * Date: January 28, 2020
 * Developer: Sanitul <sanitul@bs-23.com>
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { P2pService } from '@app/core/services/p2p.service';
import { IP2PTransfer } from '@app/move-money/send-money/models';
import { Observable } from 'rxjs/internal/Observable';
import { TransferSuccessModalComponent } from '@app/move-money/send-money/components/transfer-success-modal';
import { ModalService } from '@app/shared/services/modal.service';
import { OtpVerificationModalPage } from '@app/shared/components/otp-verification-modal/container';
import { AnalyticsEventTypes, AnalyticsService } from '@app/analytics';
@Injectable()
export class ConfirmFacade {
  constructor(
    private router: Router,
    private p2pService: P2pService,
    private modalService: ModalService,
    private readonly analyticsService: AnalyticsService
  ) {}

  // Back to modify p2p transfer before submit
  backToEdit(): void {
    this.router.navigate(['move-money/send-money/edit']);
  }
  // Cancel send money submission
  cancelSendMoney(): void {
    this.router.navigate(['move-money/send-money']);
  }
  // Get the p2p transfer object
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
  // Submit p2p transfer external or internal and handle the OTP verification
  submitP2PTransfer(): void {
    this.analyticsService.logEvent(AnalyticsEventTypes.P2PFundTransferSubmitted);
    this.sendOtp().subscribe(
      p2pTransferResponse => {
        this.tranferSuccess(p2pTransferResponse);
      },
      error => {
        if (error.status === 403) {
          this.modalService.openModal(OtpVerificationModalPage, {}, async dismissResp => {
            const { data: p2pTransferResponse } = dismissResp;
            if (p2pTransferResponse) {
              this.tranferSuccess(p2pTransferResponse as IP2PTransfer);
            }
          });
        }
      }
    );
  }
  // Verify otp for send money internal p2p transfer
  sendOtp(): Observable<IP2PTransfer> {
    return this.p2pService.submitP2P();
  }
  // Showing success modal if send money p2p transfer success
  async tranferSuccess(p2pTransferResponse: IP2PTransfer): Promise<void> {
    const { amount, receiverEmail, senderEmail } = this.p2pTransfer;
    const { confirmationCode, createdAt } = p2pTransferResponse;
    this.analyticsService.logEvent(AnalyticsEventTypes.P2PFundTransferCompleted);
    const componentProps = {
      data: {
        amount,
        receiverEmail,
        confirmationCode,
        createdAt
      } as IP2PTransfer
    };
    await this.modalService.openModal(TransferSuccessModalComponent, componentProps, () => {
      this.p2pService.fetchContacts();
      this.router.navigate(['move-money/send-money']);
    });
  }
}
