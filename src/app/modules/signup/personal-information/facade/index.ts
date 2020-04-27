import { SignUpPersonalInfoFacade } from './facade';
export const FACADE_SERVICE = [SignUpPersonalInfoFacade];
export enum PersonalInfoFormControls {
  CountryOfBirth = 'countryOfBirth',
  Occupation = 'occupation',
  EconomicActivity = 'economicActivity'
}
export * from './facade';
