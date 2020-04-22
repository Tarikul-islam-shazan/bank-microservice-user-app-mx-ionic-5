export enum StaticDataCategory {
  AddressType = 'addressType',
  PlaceOfBirthForeign = 'placeOfBirthForeign',
  PlaceOfBirthMexico = 'placeOfBirthMexico',
  Country = 'country',
  Gender = 'gender',
  GovtPosition = 'govtPosition',
  MaritalStatus = 'maritalStatus',
  Nationality = 'nationality',
  Occupation = 'occupation',
  Profession = 'profession',
  PropertyType = 'propertyType',
  Relationship = 'relationship',
  HighestLevelOfEducation = 'highestLevelOfEducation'
}
export interface IStaticData {
  category: StaticDataCategory;
  subCategory: string;
  bank: string;
  data: {
    code: string;
    value: string;
  }[];
}
export interface IDropdownOption {
  text: string;
  subText?: string;
  value: string;
}
