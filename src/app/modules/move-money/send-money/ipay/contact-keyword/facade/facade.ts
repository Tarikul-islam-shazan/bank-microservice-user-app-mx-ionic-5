import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { P2pService } from '@app/core/services/p2p.service';
import { IOtp } from '@app/core/models/dto/member';
import { Observable } from 'rxjs/internal/Observable';
import { P2PTransferType, IContact } from '@app/move-money/send-money/models';
import { Subscription } from 'rxjs';
import { ModalService } from '@app/shared/services/modal.service';
import { OtpVerificationModalPage } from '@app/shared/components/otp-verification-modal/container';
import { AnalyticsEventTypes, AnalyticsService } from '@app/analytics';

@Injectable()
export class ContactKeywordFacade {
  otpCodeSubscription: Subscription;
  constructor(
    private router: Router,
    private p2pService: P2pService,
    private modalService: ModalService,
    private readonly analyticsService: AnalyticsService
  ) {}

  continue(sharedSecret: string): void {
    this.p2pService.contact = { ...this.p2pService.contact, sharedSecret };
    this.addIpayContact();
  }

  addIpayContact(): void {
    this.analyticsService.logEvent(AnalyticsEventTypes.IPayContactSubmitted);
    this.sendOtp().subscribe(
      contactAdded => {},
      error => {
        if (error.status === 403) {
          this.modalService.openModal(OtpVerificationModalPage, {}, async dismissResp => {
            const { data: contactAdded } = dismissResp;
            if (contactAdded) {
              this.analyticsService.logEvent(AnalyticsEventTypes.IPayContactAdded, { contact: contactAdded });
              this.tranferSuccess(contactAdded as IContact);
            }
          });
        }
      }
    );
  }
  sendOtp(): Observable<IContact> {
    return this.p2pService.addIpayContact();
  }
  tranferSuccess(p2pTransferResponse: IContact): void {
    const { email, customerId, sharedSecret } = p2pTransferResponse;
    const transferType = P2PTransferType.EXTERNAL;
    this.p2pService.p2pTransfer = {
      ...this.p2pService.p2pTransfer,
      transferType,
      receiverEmail: email,
      receiverCustomerId: customerId,
      sharedSecret,
      receiverCurrency: 'USD'
    };
    this.p2pService.fetchContacts();
    this.router.navigate(['move-money/send-money/edit']);
  }
}
