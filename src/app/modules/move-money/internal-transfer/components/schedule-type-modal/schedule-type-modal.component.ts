import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ITransfer, TransferFrequency } from '@app/move-money/internal-transfer/models';
import { CreateTransferService } from '@app/move-money/internal-transfer/services/serviec';
import { IDropdownOption } from '@app/core';
@Component({
  selector: 'schedule-type-modal',
  templateUrl: './schedule-type-modal.component.html',
  styleUrls: ['./schedule-type-modal.component.scss']
})
export class ScheduleTypeModalComponent {
  minimumCalendarDate = new Date().toISOString();

  transfer: Partial<ITransfer>;
  transferFrequencyList: IDropdownOption[];
  constructor(private modalCtrl: ModalController, public createTransferService: CreateTransferService) {
    this.transfer = this.createTransferService.getTransfer();
    this.transferFrequencyList = createTransferService.transferFrequency;
    if (!this.transfer.frequency) {
      this.transfer.frequency = this.transferFrequencyList.filter((frequencyData: IDropdownOption) => {
        return frequencyData.text === TransferFrequency.Once;
      })[0].value as TransferFrequency;
    }
  }
  async dismiss(option?: any): Promise<any> {
    return await this.modalCtrl.dismiss(option);
  }
}
