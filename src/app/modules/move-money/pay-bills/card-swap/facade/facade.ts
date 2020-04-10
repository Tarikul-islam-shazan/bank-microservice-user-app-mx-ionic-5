import { Injectable } from '@angular/core';
import { BillPayService } from '@app/core/services/bill-pay.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Injectable()
export class CardSwapFacade {
  cardSwapSrcURL: SafeResourceUrl;
  constructor(private billPayService: BillPayService, private sanitizer: DomSanitizer) {}

  createToken(): void {
    this.billPayService.createToken().subscribe(q2TokenResponse => {
      this.cardSwapSrcURL = this.sanitizer.bypassSecurityTrustResourceUrl(q2TokenResponse.cardSwapSSOUrl);
    });
  }
}
