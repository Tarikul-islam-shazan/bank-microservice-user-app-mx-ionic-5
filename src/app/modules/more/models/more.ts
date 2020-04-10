export interface AccountManagement {
  inviterEmail: string;
  createdDate: string;
}
export interface IMoreMenuOption {
  iconClass: string;
  menuItemName: string;
  isNativeFeatureAvailable?: boolean;
  isNative?: boolean;
  route: string;
  suppress?: string;
  handler?: ($event) => void;
}
export interface IMoreMenuItem {
  optionName: string;
  options: IMoreMenuOption[];
}

export interface ChangePasswordRequest {
  username?: string;
  currentPassword: string;
  newPassword: string;
}
