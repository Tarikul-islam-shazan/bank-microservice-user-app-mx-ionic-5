import { Component, OnInit } from '@angular/core';
import { ModalService } from '@app/shared';

@Component({
  selector: 'address-success-modal',
  templateUrl: './address-success-modal.component.html',
  styleUrls: ['./address-success-modal.component.scss']
})
export class AddressSuccessModalComponent implements OnInit {
  constructor(private modalService: ModalService) {}

  ngOnInit() {}

  async dismiss() {
    await this.modalService.close();
  }
}
