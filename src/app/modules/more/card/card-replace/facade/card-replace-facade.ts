import { Injectable } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AppPlatform, CardService } from '@app/core';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { ModalService, IMeedModalContent } from '@app/shared/services/modal.service';

@Injectable()
export class CardReplaceFacade {
  constructor(
    private callNumber: CallNumber,
    private appPlatform: AppPlatform,
    private cardService: CardService,
    private analytics: AnalyticsService,
    private modalService: ModalService
  ) {}

  async callANumber(): Promise<void> {
    this.analytics.logEvent(AnalyticsEventTypes.CallInitiated);
    if (this.appPlatform.isIos()) {
      await this.callANumberFromIOS();
    } else if (this.appPlatform.isAndroid()) {
      await this.callANumberFromAndroid();
    }
  }

  async callANumberFromIOS(): Promise<void> {
    await this.callNumber.callNumber(this.cardService.supportNumber, true);
  }

  async callANumberFromAndroid(): Promise<void> {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'info-modal-module.card-page.details.title',
          details: ['info-modal-module.card-page.details.content1'],
          values: { callNumber: this.supportNumber }
        }
      ],
      actionButtons: [
        {
          text: 'info-modal-module.card-page.actionButtons.button1',
          cssClass: 'white-button',
          handler: () => {
            this.modalService.close();
            this.callNumber.callNumber(this.cardService.supportNumber, true);
          }
        },
        {
          text: 'info-modal-module.card-page.actionButtons.button2',
          cssClass: 'grey-outline-button',
          handler: () => {
            this.modalService.close();
          }
        }
      ]
    };
    await this.modalService.openInfoModalComponent({ componentProps });
  }

  isCordova(): boolean {
    return this.appPlatform.isCordova();
  }

  get supportNumber(): string {
    return this.cardService.supportNumber.split(' ').join('-');
  }
}
