export interface ContactPreference {
  status: Status;
  type: ContactType;
  customerNumber: string;
  phoneNumber: Status;
  email: Status;
  push: Status;
}

export enum IMeedPreferenceTag {
  MeedPush = 'meed_push',
  MeedEmail = 'meed_email'
}

export enum Status {
  Active = '1',
  Inactive = '0'
}
export enum ContactType {
  PhoneNumber = '01',
  Email = '02',
  Push = '03'
}
