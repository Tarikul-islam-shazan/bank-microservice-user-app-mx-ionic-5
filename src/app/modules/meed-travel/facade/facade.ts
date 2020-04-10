import { Injectable } from '@angular/core';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { environment } from '@env/environment';
import { ModalService } from '@app/shared/services/modal.service';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { PdfViewerService, IPDFContent } from '@app/core/services/pdf-viewer.service';

@Injectable()
export class MeedTravelFacade {
  constructor(
    private iab: InAppBrowser,
    private modalService: ModalService,
    private analytics: AnalyticsService,
    private pdfViewerService: PdfViewerService
  ) {}

  bookTravel() {
    this.iab.create('https://meed.mybookingplatform.com/us');
  }

  loadPdf() {
    const url = environment.meedPolicy.travelPolicy.url + environment.meedPolicy.travelPolicy.name;
    const pdfData: IPDFContent = {
      base64DataOrUrl: url,
      pdfTitle: 'MeedTravel Policy'
    };
    this.pdfViewerService.openPDFFromUrl(pdfData);
    this.analytics.logEvent(AnalyticsEventTypes.MeedTravelPdfViewed, { name: 'MeedTravel Policy' });
  }

  async book() {
    this.analytics.logEvent(AnalyticsEventTypes.ExternalSiteViewed, { name: 'MeedTravel' });
    const componentProps = {
      contents: [
        {
          title: 'meed-travel-page.main-page.modal-title',
          details: ['meed-travel-page.main-page.modal-description']
        }
      ],
      actionButtons: [
        {
          text: 'meed-travel-page.main-page.modal-btn',
          cssClass: 'white-button',
          handler: (event: any) => {
            componentProps.dismissModal();
            this.bookTravel();
          }
        }
      ],
      dismissModal: () => {}
    };
    await this.modalService.openInfoModalComponent({ componentProps });
  }
}
