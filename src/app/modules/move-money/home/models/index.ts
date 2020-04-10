export interface MoveMoneyOption {
  iconClass: string;
  itemName: string;
  appSuppress: string;
  onClick: (event) => void;
}
export interface MoveMoneyItem {
  optionName: string;
  options: MoveMoneyOption[];
}
