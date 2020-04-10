import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { P2pService } from '@app/core/services/p2p.service';
import { IFundRequest } from '@app/move-money/request-money/models';
@Injectable()
export class SelectedFacade {
  constructor(private router: Router, private p2pService: P2pService) {}

  continue(): void {
    this.router.navigate(['move-money/request-money/edit']);
  }
  get fundRequests(): IFundRequest[] {
    return this.p2pService.fundRequests as IFundRequest[];
  }
}
