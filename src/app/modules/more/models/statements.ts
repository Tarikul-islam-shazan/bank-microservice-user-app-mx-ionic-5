export interface Statements {
  months: StatementsMonth[];
  year: string;
}

interface StatementsMonth {
  accountId: string;
  label: string;
  statementDate: string;
  statementId: number;
  year: string;
}
