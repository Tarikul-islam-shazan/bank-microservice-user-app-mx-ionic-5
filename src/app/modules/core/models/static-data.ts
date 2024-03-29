export enum StaticDataCategory {
  AddressInformation = 'addressInformation',
  BeneficiaryInformation = 'beneficiaryInformation',
  PersonalInformation = 'personalInformation',
  GovtDisclosure = 'govtDisclosure',
  IdentityConfirmation = 'identityConfirmation',
  TransferFrequency = 'transferFrequency',
  Contacts = 'contacts',
  Banks = 'bankList'
}

export enum StaticData {
  AddressType = 'addressType',
  PropertyType = 'propertyType',
  PlaceOfBirth = 'placeOfBirth',
  Country = 'country',
  Gender = 'gender',
  GovtPosition = 'govtPosition',
  MaritalStatus = 'maritalStatus',
  Nationality = 'nationality',
  Occupation = 'occupation',
  Profession = 'profession',
  Relationship = 'relationship',
  HighestLevelOfEducation = 'highestLevelOfEducation',
  UtilityDocument = 'utilityDocument',
  TransferFrequency = 'transferFrequency',
  Support = 'support'
}

export interface StaticDataProperties {
  code: string;
  value: string;
  [key: string]: any;
}

export interface IStaticData {
  category: StaticDataCategory;
  subCategory: string;
  bank: string;
  data: {
    [key: string]: StaticDataProperties[];
  };
}

export interface ISupportStaticData {
  category: StaticDataCategory;
  subCategory: string;
  bank: string;
  data: {
    [key: string]: string;
  };
}
export interface IDropdownOption {
  text: string;
  subText?: string;
  value: string;
}
