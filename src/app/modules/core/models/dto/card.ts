export interface ICard {
  cardId: string;
  cardNumber: string;
  isCardActive: boolean;
}

export interface ICardParams {
  cardId: string;
  state: string;
}

export enum CardStatus {
  Locked = 'lock',
  Unlockd = 'unlock'
}
