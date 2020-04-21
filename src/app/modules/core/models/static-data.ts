export enum StaticDataCategory {
  SignupOption = 'SignupOption'
}
export enum StaticDataSubCategory {
  AddressType = 'AddressType',
  PropertyType = 'PropertyType',
  Relationship = 'Relationship',
  Country = 'Country',
  Nationality = 'Nationality',
  Gender = 'Gender',
  MaritalStatus = 'MaritalStatus',
  HighestLevelOfEducation = 'HighestLevelOfEducation',
  Profession = 'Profession',
  Occupation = 'Occupation',
  GovtPosition = 'GovtPosition'
}
export interface IStaticData {
  category: StaticDataCategory;
  subCategory: StaticDataSubCategory;
  bank?: string;
  data: any;
}
