import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { AppPlatform } from '@app/core/util/app-platform';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { ErrorService } from '@app/core/services/error.service';
import { ModalService, IMeedModalContent } from '../../shared/services/modal.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { PdfViewerModalComponent } from '../components/pdf-viewer-modal';

@Injectable({
  providedIn: 'root'
})
export class PdfViewerService {
  constructor(
    private appPlatform: AppPlatform,
    private file: File,
    private document: DocumentViewer,
    private fileOpener: FileOpener,
    private errorService: ErrorService,
    private modalService: ModalService,
    private inAppBrowser: InAppBrowser,
    // tslint:disable-next-line: deprecation
    private transfer: FileTransfer
  ) {}

  async openPDFFromUrl(PDFContent: IPDFContent) {
    if (this.appPlatform.isCordova()) {
      const writeDirectory = this.appPlatform.isIos()
        ? this.file.dataDirectory
        : this.file.externalApplicationStorageDirectory;
      const fileName = PDFContent.pdfTitle.replace(/ /g, '_') + '.pdf';
      if (this.appPlatform.isIos()) {
        this.generatePDFViewerFromUrl({ ...PDFContent, fileName, writeDirectory });
      } else if (this.appPlatform.isAndroid()) {
        if (await this.appPlatform.isExternalStorageAuthorized()) {
          this.generatePDFViewerFromUrl({ ...PDFContent, fileName, writeDirectory });
        } else {
          if (await this.appPlatform.requestExternalStoragePermission()) {
            this.generatePDFViewerFromUrl({ ...PDFContent, fileName, writeDirectory });
          }
        }
      }
    } else {
      this.loadPdfOnWeb({ ...PDFContent, browserOpenMode: BrowserOpenMode.InAppBrowser });
    }
  }

  async openPDFFromBase64Data(PDFContent: IPDFContent) {
    if (this.appPlatform.isCordova()) {
      const blobData = this.appPlatform.base64toBlob(PDFContent.base64DataOrUrl, 'application/pdf') as Blob;
      const writeDirectory = this.appPlatform.isIos() ? this.file.dataDirectory : this.file.externalDataDirectory;
      if (this.appPlatform.isIos()) {
        this.generatePDFViewerFromBas64({ ...PDFContent, blobData, writeDirectory });
      } else if (this.appPlatform.isAndroid()) {
        if (await this.appPlatform.isExternalStorageAuthorized()) {
          this.generatePDFViewerFromBas64({ ...PDFContent, blobData, writeDirectory });
        } else {
          if (await this.appPlatform.requestExternalStoragePermission()) {
            this.generatePDFViewerFromBas64({ ...PDFContent, blobData, writeDirectory });
          }
        }
      }
    } else {
      this.loadPdfOnWeb({ ...PDFContent, browserOpenMode: BrowserOpenMode.InModal });
    }
  }

  private async generatePDFViewerFromUrl(PDFProps: IPDFProps) {
    const filePath = PDFProps.writeDirectory + PDFProps.fileName;
    await this.downloadFile(PDFProps).then(async _ => {
      if (this.appPlatform.isIos()) {
        this.openPDFOnIOS(filePath, PDFProps.pdfTitle);
      } else if (this.appPlatform.isAndroid()) {
        await this.openPDFOnAndroid(filePath);
      }
    });
  }

  private generatePDFViewerFromBas64(PDFProps: IPDFProps) {
    const fileName = PDFProps.pdfTitle.replace(/ /g, '_') + '.pdf';
    this.file
      .writeFile(PDFProps.writeDirectory, fileName, PDFProps.blobData, {
        replace: true
      })
      .then(async () => {
        const filePath = PDFProps.writeDirectory + fileName;
        if (this.appPlatform.isIos()) {
          this.openPDFOnIOS(filePath, PDFProps.pdfTitle);
        } else if (this.appPlatform.isAndroid()) {
          await this.openPDFOnAndroid(filePath);
        }
      })
      .catch(error => {
        this.errorService.sendError(error);
      });
  }

  private downloadFile(PDFProps: IPDFProps): Promise<boolean> {
    const fileTransfer: FileTransferObject = this.transfer.create();
    return fileTransfer.download(PDFProps.base64DataOrUrl, PDFProps.writeDirectory + PDFProps.fileName).then(
      _ => {
        return Promise.resolve(true);
      },
      error => {
        this.errorService.sendError(error);
        return Promise.resolve(false);
      }
    );
  }

  private loadPdfOnWeb(PDFProps: IPDFProps) {
    if (PDFProps.browserOpenMode === BrowserOpenMode.InModal) {
      const componentProps: IMeedModalContent = {
        data: {
          pdf: PDFProps.base64DataOrUrl,
          title: PDFProps.pdfTitle
        }
      };
      this.modalService.openModal(PdfViewerModalComponent, componentProps);
    } else {
      this.inAppBrowser.create(PDFProps.base64DataOrUrl);
    }
  }

  private openPDFOnAndroid(path: string): Promise<boolean> {
    return this.fileOpener
      .open(path, 'application/pdf')
      .then(_ => {
        return Promise.resolve(true);
      })
      .catch(error => {
        this.errorService.sendError(error);
        return Promise.resolve(false);
      });
  }

  private openPDFOnIOS(path: string, title: string): void {
    const options: DocumentViewerOptions = {
      title,
      email: {
        enabled: false
      },
      print: {
        enabled: true
      },
      openWith: {
        enabled: true
      },
      autoClose: {
        onPause: false
      }
    };
    this.document.viewDocument(path, 'application/pdf', options);
  }
}
export enum BrowserOpenMode {
  InAppBrowser = 'InAppBrowser',
  InModal = 'InModal'
}

export interface IPDFContent {
  base64DataOrUrl: string;
  pdfTitle: string;
}

interface IPDFProps extends IPDFContent {
  browserOpenMode?: BrowserOpenMode;
  writeDirectory?: string;
  blobData?: Blob;
  fileName?: string;
}
