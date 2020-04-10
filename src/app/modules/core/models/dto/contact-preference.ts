export interface ContactPreference {
  preferenceStatus: boolean; // property name changed to make the modal dismiss properly
  type: string;
}

export enum IMeedPreferenceTag {
  MeedPush = 'meed_push',
  MeedEmail = 'meed_email'
}

export enum IBankPreferenceTag {
  BankEmail = 'email',
  BankPush = 'push'
}
