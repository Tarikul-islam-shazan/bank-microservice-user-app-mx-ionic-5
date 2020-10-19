import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { PdfViewerService, IPDFContent } from '@app/core/services/pdf-viewer.service';
@Injectable()
export class MeedCoverFacade {
  constructor(private readonly analyticsService: AnalyticsService, private pdfViewerService: PdfViewerService) {}

  loadPdf() {
    const url = environment.meedPolicy.coverPolicy.url + environment.meedPolicy.coverPolicy.name;
    const pdfData: IPDFContent = {
      base64DataOrUrl: url,
      pdfTitle: 'MeedCover Policy'
    };
    this.pdfViewerService.openPDFFromUrl(pdfData);
    this.analyticsService.logEvent(AnalyticsEventTypes.MeedCoverPdfViewed, { name: 'MeedCover Policy' });
  }
}
