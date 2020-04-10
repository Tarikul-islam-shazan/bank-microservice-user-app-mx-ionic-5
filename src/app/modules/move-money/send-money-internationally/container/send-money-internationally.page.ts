import { Component, OnInit } from '@angular/core';
import { ModalService } from '@app/shared';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'mbc-send-money-internationally',
  templateUrl: './send-money-internationally.page.html',
  styleUrls: ['./send-money-internationally.page.scss']
})
export class SendMoneyInternationallyPage implements OnInit {
  constructor(private modalService: ModalService, private iab: InAppBrowser) {}

  ngOnInit() {}

  async openModal(link: string) {
    const componentProps = {
      contents: [
        {
          title: 'move-money-module.send-money-internationally.modal-title',
          details: ['move-money-module.send-money-internationally.modal-description']
        }
      ],
      actionButtons: [
        {
          text: 'move-money-module.send-money-internationally.modal-btn',
          cssClass: 'white-button',
          handler: (event: any) => {
            this.iab.create(link, '_system');
            componentProps.dismissModal();
          }
        }
      ],
      dismissModal: () => {}
    };
    await this.modalService.openInfoModalComponent({ componentProps });
  }
}
