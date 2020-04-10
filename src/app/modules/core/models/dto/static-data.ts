export interface IStaticData {
  category: string;
  subCategory: string;
  bank?: string;
  data: any;
}

export enum StaticDataCategories {
  SuppressFeature = 'SuppressFeature',
  Contacts = 'Contacts'
}

export interface IStates {
  stateName: string;
  stateAbv: string;
}
