import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { P2pService } from '@app/core/services/p2p.service';
import { ModalService, IMeedModalContent } from '@app/shared/services/modal.service';
import { IFundRequest } from '@app/move-money/request-money/models';
import { AnalyticsEventTypes, AnalyticsService } from '@app/analytics';
@Injectable()
export class CancelFacade {
  constructor(
    private router: Router,
    private p2pService: P2pService,
    private modalService: ModalService,
    private readonly analyticsService: AnalyticsService
  ) {}

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
    return this.fundRequest.receiverEmail;
  }

  deleteRequest(): void {
    this.promptConformation('move-money-module.request-money.cancel.modal.content', confirmed => {
      if (confirmed) {
        this.p2pService.deleteFundRequest().subscribe(() => {
          this.analyticsService.logEvent(AnalyticsEventTypes.IPayContactDeleted);
          this.p2pService.fetchFundRequests();
          this.router.navigate(['move-money/request-money']);
        });
      }
    });
  }

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
          text: 'move-money-module.request-money.cancel.modal.yes-button',
          cssClass: 'white-button',
          handler: () => {
            confirmed(true);
            this.modalService.close();
          }
        },
        {
          text: 'move-money-module.request-money.cancel.modal.no-button',
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
