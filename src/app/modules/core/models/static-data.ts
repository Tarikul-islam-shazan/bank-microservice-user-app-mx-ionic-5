export enum StaticDataCategory {
  AddressInformation = 'addressInformation',
  BeneficiaryInformation = 'beneficiaryInformation',
  PersonalInformation = 'personalInformation',
  GovtDisclosure = 'govtDisclosure',
  IdentityConfirmation = 'identityConfirmation'
}

export enum StaticData {
  AddressType = 'addressType',
  PropertyType = 'propertyType',
  PlaceOfBirthForeign = 'placeOfBirthForeign',
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
  UtilityDocument = 'utilityDocument'
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

export interface IDropdownOption {
  text: string;
  subText?: string;
  value: string;
}
