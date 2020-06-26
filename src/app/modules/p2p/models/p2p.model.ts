import { DropdownOption } from '@app/signup/models/signup';
export interface IContact {
  _id?: string;
  contactType?: ContactType;
  identityType?: IdentityType;
  identityNumber?: string;
  paternalLastName?: string;
  maternalLastName?: string;
  firstName?: string;
  secondName?: string;
  companyName?: string;
  bankCode?: string;
  alias?: string;
  rfc?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
}

export enum ContactType {
  Meed = 'meed', // verified as an active Meed Member but not invex member (MTD175)
  Domestic = 'domestic', // verified as an active Meed & invex Member (MTD176)
  Invex = 'invex', // not a Meed Member but member of invex (MTD176)
  Other = 'other' // verified as an active Meed Member and not a member of invex (MTD176)
}

export enum IdentityType {
  DebitCard = 'DebitCard',
  Clabe = 'Clabe',
  Mobile = 'Mobile',
  AccountNumber = 'AccountNumber',
  Company = 'Company'
}

export const invexPayeeIdentifiers: DropdownOption[] = [
  {
    text: 'Account Number',
    value: IdentityType.AccountNumber
  },
  {
    text: 'Clabe',
    value: IdentityType.Clabe
  },
  {
    text: 'Debit Card Number',
    value: IdentityType.DebitCard
  }
];

export const otherBankPayeeIdentifiers: DropdownOption[] = [
  {
    text: 'Company Name',
    value: IdentityType.Company
  },
  {
    text: 'Clabe',
    value: IdentityType.Clabe
  },
  {
    text: 'Debit Card Number',
    value: IdentityType.DebitCard
  },
  {
    text: 'Mobile Number',
    value: IdentityType.Mobile
  }
];
export interface IOtherContact {
  alias: string;
  contactType: string;
  identityType: string;
  identityNumber?: string;
  bankCode: string;
  firstName?: string;
  secondName?: string;
  paternalLastName?: string;
  maternalLastName?: string;
  email?: string;
  phone?: string;
  rfc?: string;
}

export interface IInvexContact {
  alias: string;
  contactType: ContactType;
  identityType: string;
  identityNumber: string;
  email?: string;
  phone?: string;
}
