export interface IStatement {
  year: string;
  statements: IMonthlyStatement[];
}

export interface IMonthlyStatement {
  statementDate: string;
  statementId: string;
  month: string;
}

export interface IStatementDetailsReq {
  accountId: string;
  statementId: string;
}

export interface IStatementDetails {
  documents: any;
  type: string;
}
