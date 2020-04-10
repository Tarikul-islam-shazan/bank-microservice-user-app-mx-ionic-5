export interface DropdownOption {
  text: string;
  subText?: string;
  value: string;
}

export interface QuestionOption {
  code: number;
  question: string;
  id: string;
  order: number;
}

export enum AddressRadioButtonOption {
  Neither = 'neither',
  Member = 'member',
  Dependent = 'dependent'
}
