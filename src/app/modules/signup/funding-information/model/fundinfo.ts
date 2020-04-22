export interface IFundInfo {
  fundMyself: boolean;
  providerInfo?: IProviderInfo;
}

export interface IProviderInfo {
  firstName: string;
  secondName?: string;
  dateOfBirth: string;
  paternalLastName?: string;
  maternalLastName?: string;
}
