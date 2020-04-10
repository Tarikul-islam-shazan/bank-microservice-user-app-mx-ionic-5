import { Injectable } from '@angular/core';
import { PrivacyLegalService } from '../service/privacy-legal-service';
import { Observable } from 'rxjs';
import { IPrivacyAndLegalDocument } from '@app/core/models/dto/privacy-document';
import { PdfViewerService, IPDFContent } from '@app/core/services/pdf-viewer.service';

@Injectable()
export class PrivacyLegalFacade {
  constructor(private privacyLegalService: PrivacyLegalService, private pdfViewerService: PdfViewerService) {}

  privacyAndLegalDocuments$: Observable<
    IPrivacyAndLegalDocument[]
  > = this.privacyLegalService.fetchPrivacyAndLegalDocuments();

  showDocument(privacyAndLegalDocument: IPrivacyAndLegalDocument) {
    const pdfData: IPDFContent = {
      base64DataOrUrl: privacyAndLegalDocument.pdf,
      pdfTitle: privacyAndLegalDocument.title
    };
    this.pdfViewerService.openPDFFromBase64Data(pdfData);
  }
}
