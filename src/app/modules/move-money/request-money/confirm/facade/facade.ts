import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { P2pService } from '@app/core/services/p2p.service';
import { TransferSuccessModalComponent } from '@app/move-money/request-money/components';
import { ModalService } from '@app/shared/services/modal.service';
import { IFundRequest } from '@app/move-money/request-money/models';
@Injectable()
export class ConfirmFacade {
  constructor(private router: Router, private p2pService: P2pService, private modalService: ModalService) {}
  backToEdit(): void {
    this.router.navigate(['move-money/request-money/edit']);
  }

  cancelSendMoney(): void {
    this.router.navigate(['move-money/request-money']);
  }

  submitFundRequests(): void {
    this.p2pService.createFundRequests().subscribe(fundRequests => {
      this.tranferSuccess(fundRequests.requests);
    });
  }

  get fundRequests(): IFundRequest[] {
    return this.p2pService.fundRequests as IFundRequest[];
  }

  get fundRequestFirstElement(): IFundRequest {
    const [first] = this.fundRequests;
    return first;
  }

  get amount(): number {
    return this.fundRequestFirstElement.amount;
  }

  get message(): string {
    return this.fundRequestFirstElement.message;
  }

  get email(): string {
    return this.fundRequestFirstElement.receiverEmail;
  }

  async tranferSuccess(fundRequestsResponse: IFundRequest[]) {
    const componentProps = {
      data: fundRequestsResponse
    };
    await this.modalService.openModal(TransferSuccessModalComponent, componentProps, onDidDismiss => {
      this.p2pService.fetchFundRequests();
      this.router.navigate(['move-money/request-money']);
    });
  }
}
