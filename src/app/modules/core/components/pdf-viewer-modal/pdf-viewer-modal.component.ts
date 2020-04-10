import { Component, OnInit, Input } from '@angular/core';
import { IPrivacyAndLegalDocument } from '@app/core/models/dto/privacy-document';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'mbc-pdf-viewer-modal',
  templateUrl: './pdf-viewer-modal.component.html',
  styleUrls: ['./pdf-viewer-modal.component.scss']
})
export class PdfViewerModalComponent implements OnInit {
  binary: string;
  title: string;
  @Input() set data(privacyAndLegalDocument: IPrivacyAndLegalDocument) {
    this.title = privacyAndLegalDocument.title;
    this.binary = atob(privacyAndLegalDocument.pdf);
  }

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async dismiss() {
    await this.modalCtrl.dismiss();
  }
}
