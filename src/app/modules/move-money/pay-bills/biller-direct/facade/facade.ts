import { Injectable } from '@angular/core';
import { BillPayService } from '@app/core/services/bill-pay.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable()
export class BillerDirectFacade {
  billerDirectSrcURL: SafeResourceUrl;
  constructor(private billPayService: BillPayService, private sanitizer: DomSanitizer) {}

  createToken(): void {
    this.billPayService.createToken().subscribe(q2TokenResponse => {
      this.billerDirectSrcURL = this.sanitizer.bypassSecurityTrustResourceUrl(q2TokenResponse.billerDirectSSOUrl);
    });
  }
}
