import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatementsService, AccountService, AccountType, IMonthlyStatement, IStatement } from '@app/core';
import { PdfViewerService, IPDFContent } from '@app/core/services/pdf-viewer.service';
@Injectable()
export class StatementsFacade {
  $statements: Observable<IStatement[]>;
  constructor(
    private statementsService: StatementsService,
    private accountService: AccountService,
    private pdfViewerService: PdfViewerService
  ) {
    this.loadStatements();
  }

  loadStatements(): void {
    const accountData = this.accountService.getCachedAccountSummary();
    const { accountId } = accountData.find(account => account.accountType === AccountType.DDA);
    this.$statements = this.statementsService.getStatements(accountId);
  }

  loadPdf(month: IMonthlyStatement, accountType: string): void {
    const accountData = this.accountService.getCachedAccountSummary();
    const { accountId } = accountData.find(account => account.accountType === accountType);

    const parms = {
      accountId,
      statementId: month.statementId
    };
    this.statementsService.loadMonthStatements(parms).subscribe(response => {
      this.viewPdf(response.documents, accountType);
    });
  }

  viewPdf(base64data: string, accountType: string) {
    const pdfTitle = accountType + ' statement';
    const pdfData: IPDFContent = {
      base64DataOrUrl: base64data,
      pdfTitle
    };
    this.pdfViewerService.openPDFFromBase64Data(pdfData);
  }
}
