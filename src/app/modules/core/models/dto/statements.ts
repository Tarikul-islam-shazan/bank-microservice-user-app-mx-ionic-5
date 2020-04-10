export interface IStatement {
  year: string;
  months: IMonthlyStatement[];
}

export interface IMonthlyStatement {
  accountId: string;
  label: string;
  statementDate: string;
  statementId: string;
  year: string;
}

export interface IStatementDetailsReq {
  accountId: string;
  statementId: string;
}

export interface IStatementDetails {
  documents: any;
  type: string;
}
