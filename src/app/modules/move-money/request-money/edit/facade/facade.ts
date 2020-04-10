import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { P2pService } from '@app/core/services/p2p.service';
import { IFundRequest } from '@app/move-money/request-money/models';
@Injectable()
export class EditFacade {
  constructor(private router: Router, private p2pService: P2pService) {}

  gotoConfirm(p2prequest): void {
    p2prequest.amount = p2prequest.amount.replace(/\$/g, '');
    this.p2pService.fundRequests = this.updateFundRequests(this.p2pService.fundRequests as IFundRequest[], p2prequest);
    this.router.navigate(['move-money/request-money/confirm']);
  }

  updateFundRequests(fundRequests: IFundRequest[], { amount, message }): IFundRequest[] {
    return fundRequests.map(fundRequest => ({ ...fundRequest, amount, message }));
  }

  cancelEdit(): void {
    this.router.navigate(['move-money/request-money']);
  }

  get fundRequests(): IFundRequest[] {
    return this.p2pService.fundRequests as IFundRequest[];
  }
}
