import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { P2pService } from '@app/core/services/p2p.service';
import { ModalService, IMeedModalContent } from '@app/shared/services/modal.service';
import { IContact } from '@app/move-money/send-money/models';
import { AnalyticsEventTypes, AnalyticsService } from '@app/analytics';
@Injectable()
export class ContactModifyFacade {
  constructor(
    private router: Router,
    private p2pService: P2pService,
    private modalService: ModalService,
    private readonly analyticsService: AnalyticsService
  ) {}
  get ipayContact(): Partial<IContact> {
    return this.p2pService.contact;
  }
  get email(): string {
    return this.ipayContact.email;
  }

  updateContact(email: string): void {
    this.p2pService.contact = { ...this.p2pService.contact, email };
    this.promptConformation('move-money-module.send-money.contact-modify.modal.content-update', confirmed => {
      if (confirmed) {
        this.p2pService.updateIpayContact().subscribe(() => {
          this.analyticsService.logEvent(AnalyticsEventTypes.IPayContactUpdated);
          this.modifySuccessed();
        });
      }
    });
  }
  deleteContact(): void {
    this.promptConformation('move-money-module.send-money.contact-modify.modal.content-delete', confirmed => {
      if (confirmed) {
        this.p2pService.deleteIpayContact().subscribe(() => {
          this.analyticsService.logEvent(AnalyticsEventTypes.IPayContactDeleted);
          this.modifySuccessed();
        });
      }
    });
  }
  async promptConformation(details: string, confirmed): Promise<void> {
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
          text: 'move-money-module.send-money.contact-modify.modal.yes-button',
          cssClass: 'white-button',
          handler: () => {
            confirmed(true);
            this.modalService.close();
          }
        },
        {
          text: 'move-money-module.send-money.contact-modify.modal.no-button',
          cssClass: 'grey-outline-button',
          handler: () => {
            this.modalService.close();
          }
        }
      ]
    };
    await this.modalService.openInfoModalComponent({ componentProps });
  }
  modifySuccessed(): void {
    this.p2pService.fetchContacts();
    this.router.navigate(['move-money/send-money']);
  }
}
