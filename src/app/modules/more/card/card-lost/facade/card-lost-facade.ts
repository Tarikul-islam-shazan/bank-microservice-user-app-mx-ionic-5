import { Injectable } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AppPlatform, CardService } from '@app/core';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { ModalService, IMeedModalContent } from '@app/shared/services/modal.service';

@Injectable()
export class CardLostFacade {
  constructor(
    private callNumber: CallNumber,
    private appPlatform: AppPlatform,
    private cardService: CardService,
    private readonly analyticsService: AnalyticsService,
    private modalService: ModalService
  ) {}

  async callANumber(): Promise<void> {
    this.analyticsService.logEvent(AnalyticsEventTypes.CallInitiated);
    if (this.appPlatform.isIos()) {
      await this.callANumberFromIOS();
    } else if (this.appPlatform.isAndroid()) {
      await this.callANumberFromAndroid();
    }
  }

  async callANumberFromIOS(): Promise<void> {
    await this.callNumber.callNumber(this.supportNumber, true);
  }

  async callANumberFromAndroid(): Promise<void> {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'info-modal-module.card-page.details.title',
          details: ['info-modal-module.card-page.details.content1'],
          values: { callNumber: this.supportNumber.split(' ').join('-') }
        }
      ],
      actionButtons: [
        {
          text: 'info-modal-module.card-page.actionButtons.button1',
          cssClass: 'white-button',
          handler: () => {
            this.modalService.close();
            this.callNumber.callNumber(this.supportNumber, true);
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

  get supportNumber() {
    return this.cardService.supportNumber;
  }
}
