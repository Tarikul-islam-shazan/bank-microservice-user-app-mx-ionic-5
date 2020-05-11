export interface IStaticData {
  category: string;
  subCategory: string;
  bank?: string;
  data: any;
}

export enum StaticDataCategories {
  SuppressFeature = 'suppressFeature',
  Contacts = 'contacts'
}

export interface IStates {
  stateName: string;
  stateAbv: string;
}
