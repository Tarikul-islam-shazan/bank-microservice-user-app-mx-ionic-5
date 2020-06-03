/**
 * Issue: MM2-159
 * Details:  Statements: View list,
 * this model has been changed so that it satys aligned with
 * the backend model
 * Date: June 03, 2020
 * Developer: Raihan <raihanuzzaman@bs-23.net>
 */

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
