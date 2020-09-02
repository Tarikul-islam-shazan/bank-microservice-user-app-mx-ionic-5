export interface IMeedShare {
  id?: any;
  member?: string;
  country?: string;
  // TODO: need to specify member type
  memberType?: string;
  lastMonthDistribution?: number;
  totalDistribution?: number;
  totalInvitees?: number;
}

export enum ValueType {
  Integer = 'integer',
  Currency = 'currency'
}
