export interface IFundInfo {
  fundMyself: boolean;
  providerInfo?: {
    firstName: string;
    secondName?: string;
    dateOfBirth: string;
    paternalLastName?: string;
    maternalLastName?: string;
  };
}
