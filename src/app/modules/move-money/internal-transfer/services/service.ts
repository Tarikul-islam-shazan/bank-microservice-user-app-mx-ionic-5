import { Injectable } from '@angular/core';
import { ITransfer } from '@app/move-money/internal-transfer/models/index';
import * as moment from 'moment';
import { IDropdownOption, InternalTransferService } from '@app/core';

@Injectable()
export class TransferService {
  private fromScheduledTransfers: boolean;
  private transfer: Partial<ITransfer>;
  _transferFrequency: IDropdownOption[];
  constructor(private internalTransferService: InternalTransferService) {
    this.initialize();
  }
  initialize(): void {
    this.transfer = {
      transferDate: moment().toISOString(true)
    };
    this.fromScheduledTransfers = false;
  }

  getTransfer(): Partial<ITransfer> {
    return this.transfer;
  }

  setTransfer(transfer: Partial<ITransfer>): void {
    this.transfer = transfer;
  }

  isFromScheduledTransfers(): boolean {
    return this.fromScheduledTransfers;
  }

  setFromScheduledTransfers(fromTransferPage: boolean): void {
    this.fromScheduledTransfers = fromTransferPage;
  }

  resetTransferService(): void {
    this.initialize();
  }

  get transferFrequency(): IDropdownOption[] {
    return this.internalTransferService.transferFrequency;
  }
}
