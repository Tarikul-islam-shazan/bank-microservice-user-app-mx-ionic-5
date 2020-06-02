import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatementsService, AccountService, AccountType, IStatement, IStatements } from '@app/core';
import { PdfViewerService, IPDFContent } from '@app/core/services/pdf-viewer.service';
import { ModalService, IMeedModalContent } from '@app/shared';
import { DownloadService, IXMLContent } from '@app/core/services/download.service';
@Injectable()
export class StatementsFacade {
  $statements: Observable<IStatements[]>;
  constructor(
    private statementsService: StatementsService,
    private accountService: AccountService,
    private pdfViewerService: PdfViewerService,
    private modalService: ModalService,
    private downloadService: DownloadService
  ) {
    this.loadStatements();
  }

  loadStatements(): void {
    const accountData = this.accountService.getCachedAccountSummary();
    const { accountId } = accountData.find(account => account.accountType === AccountType.DDA);
    this.$statements = this.statementsService.getStatements(accountId);
  }

  loadPdf(month: IStatement, accountType: string): void {
    const accountData = this.accountService.getCachedAccountSummary();
    const { accountId } = accountData.find(account => account.accountType === accountType);

    const parms = {
      accountId,
      statementId: month.statementId
    };
    this.statementsService.loadMonthStatements(parms).subscribe(response => {
      this.viewPdf(response.pdf, accountType);
    });
  }

  async openModal(month: IStatement, acountType: string): Promise<void> {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'more-module.statements-page.modal.title'
        }
      ],
      actionButtons: [
        {
          text: 'more-module.statements-page.modal.pdf-button',
          cssClass: 'white-button',
          handler: async () => {
            await this.modalService.close();
            this.loadPdf(month, acountType);
          }
        },
        {
          text: 'more-module.statements-page.modal.xml-button',
          cssClass: 'white-button',
          handler: async () => {
            await this.modalService.close();
            this.initiateXml(month, acountType);
          }
        },
        {
          text: 'more-module.statements-page.modal.cancle-button',
          cssClass: 'grey-outline-button',
          handler: async () => {
            await this.modalService.close();
          }
        }
      ],
      onDidDismiss: () => {}
    };
    await this.modalService.openInfoModalComponent({ componentProps });
  }

  viewPdf(base64data: string, accountType: string) {
    const pdfTitle = accountType + ' statement';
    const pdfData: IPDFContent = {
      base64DataOrUrl: base64data,
      pdfTitle
    };
    this.pdfViewerService.openPDFFromBase64Data(pdfData);
  }

  initiateXml(month: IStatement, accountType: string): void {
    const accountData = this.accountService.getCachedAccountSummary();
    const { accountId } = accountData.find(account => account.accountType === accountType);

    const parms = {
      accountId,
      statementId: month.statementId
    };
    this.statementsService.loadMonthStatements(parms).subscribe(response => {
      this.downloadXml(response.xml, accountType);
    });
  }

  downloadXml(xml: string, accountType: string) {
    const xmlTitle = accountType + ' statement';
    const xmlTobase64data = 'data:text/xml;base64,' + xml;
    const xmlData: IXMLContent = {
      base64DataOrUrl: xmlTobase64data,
      xmlTitle
    };

    this.downloadService.downloadFromUrl(xmlData);
  }
}
