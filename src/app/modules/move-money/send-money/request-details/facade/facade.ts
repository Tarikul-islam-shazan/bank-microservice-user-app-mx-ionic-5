/**
 * Facade: Send money fund request details facade
 * Details: Retrive the details of selectd fund request to me.
 * process to pay fund or decline fund request
 * Date: January 28, 2020
 * Developer: Sanitul <sanitul@bs-23.com>
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { P2pService } from '@app/core/services/p2p.service';
import { ModalService, IMeedModalContent } from '@app/shared/services/modal.service';
import { IFundRequest, RequestStatus } from '@app/move-money/request-money/models';
import { P2PTransferType } from '@app/move-money/send-money/models';
import { AnalyticsEventTypes, AnalyticsService } from '@app/analytics';
@Injectable()
export class RequestDetailsFacade {
  constructor(
    private router: Router,
    private p2pService: P2pService,
    private modalService: ModalService,
    private readonly analyticsService: AnalyticsService
  ) {}

  // Get the selected fund request to me
  get fundRequest(): IFundRequest {
    return this.p2pService.fundRequests as IFundRequest;
  }
  get amount(): number {
    return this.fundRequest.amount;
  }
  get message(): string {
    return this.fundRequest.message;
  }
  get email(): string {
    return this.fundRequest.senderEmail;
  }
  // Pay the selected fund
  payFund(): void {
    const { senderEmail: receiverEmail, amount, message, confirmationCode } = this.fundRequest;

    // create p2pTransfer object from fund request
    this.p2pService.p2pTransfer = {
      ...this.p2pService.p2pTransfer,
      receiverEmail,
      amount: amount.toString(),
      message,
      transferType: P2PTransferType.INTERNAL,
      confirmationCode
    };
    this.router.navigate(['move-money/send-money/edit']);
  }
  // Decline the selected fund request
  declineFund(): void {
    this.promptConformation('move-money-module.send-money.request-details.modal.content', confirmed => {
      if (confirmed) {
        this.p2pService.fundRequests = {
          ...(this.p2pService.fundRequests as IFundRequest),
          requestStatus: RequestStatus.DECLINED
        };
        this.p2pService.updateFundRequest().subscribe(() => {
          this.analyticsService.logEvent(AnalyticsEventTypes.P2PFundRequestDeclined);
          this.p2pService.fetchFundRequests();
          this.router.navigate(['move-money/send-money']);
        });
      }
    });
  }
  // Prompt conformation for decline a fund request
  async promptConformation(details: string, confirmed) {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: '',
          details: [details],
          values: { email: this.email }
        }
      ],
      actionButtons: [
        {
          text: 'move-money-module.send-money.request-details.modal.yes-button',
          cssClass: 'white-button',
          handler: () => {
            confirmed(true);
            this.modalService.close();
          }
        },
        {
          text: 'move-money-module.send-money.request-details.modal.no-button',
          cssClass: 'grey-outline-button',
          handler: () => {
            this.modalService.close();
          }
        }
      ]
    };
    await this.modalService.openInfoModalComponent({ componentProps });
  }
}
