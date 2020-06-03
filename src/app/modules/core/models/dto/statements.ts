export interface IStatements {
  year: string;
  statements: IStatement[];
}

export interface IStatement {
  statementId: string;
  statementDate?: string;
  month: string;
}

export interface IStatementDetailsReq {
  accountId: string;
  statementId: string;
}

export interface IStatementDetails {
  pdf: string;
  xml?: string;
}
