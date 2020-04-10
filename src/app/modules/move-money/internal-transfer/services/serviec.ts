import { Injectable } from '@angular/core';
import { TransferFrequency, ITransfer } from '@app/move-money/internal-transfer/models/index';
import * as moment from 'moment';

@Injectable()
export class CreateTransferService {
  private fromScheduledTransfers: boolean;
  private transfer: Partial<ITransfer>;
  constructor() {
    this.initialize();
  }
  initialize(): void {
    this.transfer = {
      frequency: TransferFrequency.Once,
      transferDate: moment().toISOString(true),
      currency: 'USD'
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
}
