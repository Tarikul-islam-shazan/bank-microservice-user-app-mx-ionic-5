import { Injectable } from '@angular/core';
import { CardService } from '@app/core/services/card.service';
import { AppPlatform } from '@app/core/util/app-platform';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { ModalService, IMeedModalContent } from '@app/shared/services/modal.service';

@Injectable()
export class ContactUsFacade {
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
          title: 'more-module.contact-us-page.call-modal.title',
          details: ['more-module.contact-us-page.call-modal.content'],
          values: { callNumber: this.supportNumber }
        }
      ],
      actionButtons: [
        {
          text: 'more-module.contact-us-page.call-modal.actionButtons.call-text',
          cssClass: 'white-button',
          handler: () => {
            this.modalService.close();
            this.callNumber.callNumber(this.cardService.supportNumber, true);
          }
        },
        {
          text: 'more-module.contact-us-page.call-modal.actionButtons.cancel-text',
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
