import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ITransfer } from '@app/move-money/internal-transfer/models';
import { CreateTransferService } from '@app/move-money/internal-transfer/services/serviec';
@Component({
  selector: 'schedule-type-modal',
  templateUrl: './schedule-type-modal.component.html',
  styleUrls: ['./schedule-type-modal.component.scss']
})
export class ScheduleTypeModalComponent {
  /**
   * Minimum calendar date of schedule type modal component
   * Ticket: GMA-4660
   * Move between accounts > From schedule date user can select past date.
   * Fix: we define minimum datetime for <ion-datetime> to current dateTime
   * @author sanitul hassan <sanitul@bs-23.com>
   */
  minimumCalendarDate = new Date().toISOString();

  transfer: Partial<ITransfer>;
  constructor(private modalCtrl: ModalController, private createTransferService: CreateTransferService) {
    this.transfer = this.createTransferService.getTransfer();
  }
  async dismiss(option?: any): Promise<any> {
    return await this.modalCtrl.dismiss(option);
  }
}
