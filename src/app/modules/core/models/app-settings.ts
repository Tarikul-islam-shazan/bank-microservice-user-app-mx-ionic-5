/**
 * Mapping for the menu items to display and order
 *
 * @export
 * @interface Menu
 */
export interface Menu {
  name: string;
  visible: boolean;
  enable: boolean;
  position?: number;
  imagePath?: string;
  childMenus?: Menu[];
}

/**
 * Used to house the locale of the app
 *
 * @export
 * @interface Locale
 */
export interface Locale {
  country: string;
  language: string;
  name: string;
  locale: string;
  dialCode: number;
  currency: string;
}

/**
 * Information about the app.
 *
 * @export
 * @interface AppInfo
 */
export interface AppInfo {
  version: string;
}

export interface SystemSettings {
  availableLocales?: Locale[];
  selectedLocale?: Locale;
  appInfo?: AppInfo;
  menus?: Menu[];
}

export interface UserSettings {
  username?: string;
  bankIdentifier?: string;
  useBiometric?: boolean;
  billPayProvider?: string;
  disabledSignUp?: boolean;
  meedExtraInfoNotShow?: boolean;
  contacts?: BankContacts;
}
export interface BankContacts {
  [key: string]: string;
}

export interface AppSettings {
  systemSettings?: SystemSettings;
  userSettings?: UserSettings;
}

export interface ContactSupport {
  phone: string;
}
