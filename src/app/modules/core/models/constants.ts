export enum DateFormat {
  Short = 'L LT', // 'short': equivalent to 'M/d/yy, h:mm a' (6/15/15, 9:03 AM).
  Medium = 'll LTS', // 'medium': equivalent to 'MMM d, y, h:mm:ss a' (Jun 15, 2015, 9:03:01 AM).
  ShortDate = 'L', // 'shortDate': equivalent to 'M/d/yy' (6/15/15).
  MediumDate = 'll', // 'mediumDate': equivalent to 'MMM d, y' (Jun 15, 2015).
  LongDate = 'LL', // 'longDate': equivalent to 'MMMM d, y' (June 15, 2015).
  FullDate = 'LLLL', // 'fullDate': equivalent to 'EEEE, MMMM d, y' (Monday, June 15, 2015).
  ShortTime = 'LT', // 'shortTime': equivalent to 'h:mm a' (9:03 AM).
  MediumTime = 'LTS' // 'mediumTime': equivalent to 'h:mm:ss a' (9:03:01 AM).
}

interface PageProperties {
  NAME: string;
  ROUTE_PATH: string;
}

interface Page {
  [key: string]: PageProperties;
}

export const PAGES: Page = {
  LOGIN_USER: {
    NAME: 'page-login-user',
    ROUTE_PATH: '/login-user'
  },
  SIGNUP_EMAIL: {
    NAME: 'signup-email',
    ROUTE_PATH: '/signup/email'
  },
  SIGNUP_COMPRESSED: {
    NAME: 'signup-compressed',
    ROUTE_PATH: '/signup/compressed'
  },
  VERIFICATION: {
    NAME: 'signup-email-verification',
    ROUTE_PATH: '/signup/verification'
  },
  SIGNUP_CONFIRM_IDENTITY: {
    NAME: 'Signup confirm identity page',
    ROUTE_PATH: '/signup/confirm-identity'
  },
  SIGNUP_CREATE_LOGIN: {
    NAME: 'signup-login-create',
    ROUTE_PATH: '/signup/create-login'
  },
  SIGNUP_PERSONAL: {
    NAME: 'signup-general-info',
    ROUTE_PATH: '/signup/personal'
  },
  SIGNUP_GENERAL_INFORMATION: {
    NAME: 'Signup General Information',
    ROUTE_PATH: '/signup/general-information'
  },
  SIGNUP_BENEFICIARY: {
    NAME: 'Signup Beneficiary Information',
    ROUTE_PATH: '/signup/beneficiary-information'
  },
  SIGNUP_PERSONAL_INFORMATION: {
    NAME: 'Signup Personal Information',
    ROUTE_PATH: '/signup/personal-information'
  },
  SIGNUP_FUNDING_INFORMATION: {
    NAME: 'Signup Who will be providing the funding',
    ROUTE_PATH: '/signup/funding-information'
  },
  SIGNUP_GOVERNMENT_DISCLOSURE: {
    NAME: 'Signup Government Disclosure',
    ROUTE_PATH: '/signup/government-disclosure'
  },
  SIGNUP_ADDRESS: {
    NAME: 'signup-address',
    ROUTE_PATH: '/signup/address'
  },
  SIGNUP_ADDRESS_INFORMATION: {
    NAME: 'Signup Address Information',
    ROUTE_PATH: '/signup/address-information'
  },
  SIGNUP_ACCOUNT_SELECTION: {
    NAME: 'Signup Select Account Level',
    ROUTE_PATH: '/signup/account-selection'
  },
  SIGNUP_QUESTIONS: {
    NAME: 'signup-security-questions',
    ROUTE_PATH: '/signup/questions'
  },
  SIGNUP_IDENTITY_VERIFICATION: {
    NAME: 'signup-confirm-id',
    ROUTE_PATH: '/signup/identity-verification'
  },
  SIGNUP_TERMS_CONDITIONS: {
    NAME: 'signup-terms-and-conditions',
    ROUTE_PATH: '/signup/terms-conditions'
  },
  SIGNUP_IDENTITY_CONFIRMATION: {
    NAME: 'signup-identity-confirmation',
    ROUTE_PATH: '/signup/identity-confirmation'
  },
  SIGNUP_ACCOUNT_FUNDING: {
    NAME: 'Signup Account Funding',
    ROUTE_PATH: '/signup/account-funding'
  },
  SIGNUP_ACCOUNT_FUNDING_OPTION: {
    NAME: 'Signup Account Funding Option',
    ROUTE_PATH: '/signup/account-funding/funding-option'
  },
  DIRECT_DEPOSIT: {
    NAME: 'signup-direct-deposit-entry',
    ROUTE_PATH: 'deposit/direct-deposit'
  },
  DIRECT_DEPOSIT_COMPLETE: {
    NAME: 'signup-direct-deposit-thanks',
    ROUTE_PATH: 'deposit/direct-deposit-complete'
  },
  DIRECT_DEPOSIT_INFO: {
    NAME: 'signup-direct-deposit-intro',
    ROUTE_PATH: 'deposit/direct-deposit-info'
  },
  DIRECT_DEPOSIT_START: {
    NAME: 'signup-direct-deposit-start',
    ROUTE_PATH: 'deposit/direct-deposit-start'
  },
  SIGNUP_SCANID: {
    NAME: 'signup-scan-id-instructions',
    ROUTE_PATH: '/signup/scanid'
  },
  DEPOSIT_ECHECK: {
    NAME: 'signup-echeck-account',
    ROUTE_PATH: '/signup/deposit/e-check'
  },
  DEPOSIT_THANK_YOU: {
    NAME: 'signup-funding-settled',
    ROUTE_PATH: 'deposit/deposit-thank-you'
  },
  MOVE_MONEY: {
    NAME: 'signup-move-money',
    ROUTE_PATH: '/dashboard/move-money'
  },
  DIRECT_DEPOSIT_MONEY: {
    NAME: 'Direct deposit Money Page',
    ROUTE_PATH: '/deposit/money'
  },
  DASHBOARD: {
    NAME: 'login-dashboard',
    ROUTE_PATH: '/dashboard/home'
  },
  CHECKING: {
    NAME: 'checking-history',
    ROUTE_PATH: '/home/checking-history'
  },
  LINE_OF_CREDIT: {
    NAME: 'loc-history',
    ROUTE_PATH: '/home/loc-history'
  },
  SAVING_TRANSACTIONS: {
    NAME: 'Saving Transactions Page',
    ROUTE_PATH: '/home/savings-transactions'
  },
  SAVING_GOAL: {
    NAME: 'savings-goal-new',
    ROUTE_PATH: '/home/saving-goal'
  },
  TRANSACTION_DETAILS: {
    NAME: 'transaction-details',
    ROUTE_PATH: '/home/transaction-details'
  },
  REWARDS: {
    NAME: 'Rewards Page',
    ROUTE_PATH: '/home/rewards'
  },
  INVITE: {
    NAME: 'Invite Page',
    ROUTE_PATH: '/home/invite'
  },
  CONTACT_US: {
    NAME: 'Contact us page',
    ROUTE_PATH: '/more/contact-us'
  },
  MORE: {
    NAME: 'more-menu',
    ROUTE_PATH: '/more'
  },
  MEED_EXTRA: {
    NAME: 'extras-dashboard',
    ROUTE_PATH: '/meed-extras'
  },
  MEED_EXTRA_ALL_OFFERS: {
    NAME: 'all-offer-result',
    ROUTE_PATH: '/meed-extras/all-offers'
  },
  DIRECT_DEPOSIT_SETUP: {
    NAME: 'Direct Deposit Setup',
    ROUTE_PATH: 'deposit/direct-deposit-setup'
  },
  MEED_CATEGORIES_OFFERS: {
    NAME: 'extras-results',
    ROUTE_PATH: '/meed-extras/categories-offer'
  },
  MEED_ONLINE_OFFERS: {
    NAME: 'extras-online-offer-detail',
    ROUTE_PATH: '/meed-extras/online-offer'
  },
  MEED_INSTORE_OFFERS: {
    NAME: 'extras-instore-offer-detail',
    ROUTE_PATH: '/meed-extras/instore-offer'
  },
  MOVE_BETWEEN_ACCOUNT_CONFIRM_DETAILS: {
    NAME: 'move-between-account-confirm-details',
    ROUTE_PATH: '/move-money/move-between-accounts/confirm-details'
  },
  MOVE_BETWEEN_ACCOUNTS: {
    NAME: 'move-between-accounts',
    ROUTE_PATH: '/move-money/move-between-accounts'
  },
  SCHEDULED_TRANSFERS: {
    NAME: 'scheduled-transfers',
    ROUTE_PATH: '/move-money/scheduled-transfers'
  },
  OXXO_MONEY_DEPOSIT: {
    NAME: 'oxxo-money-deposit',
    ROUTE_PATH: '/move-money/oxxo-money-deposit'
  },
  TRANSFER_FROM_OTHER_BANK: {
    NAME: 'transfer-from-other-bank',
    ROUTE_PATH: '/move-money/transfer-from-other-bank'
  },
  MEED_SEARCH_OFFERS: {
    NAME: 'extras-search-offers',
    ROUTE_PATH: '/meed-extras/search-offers'
  },
  MEED_NEARBY_OFFERS: {
    NAME: 'extras-nearby-offers',
    ROUTE_PATH: '/meed-extras/nearby-offers'
  },
  MORE_MENU: {
    NAME: 'more-menu',
    ROUTE_PATH: '/more'
  },
  PERSONAL_DETAILS: {
    NAME: 'personal-details',
    ROUTE_PATH: '/more/personal-details'
  },
  ACCOUNT_INFO: {
    NAME: 'account-info',
    ROUTE_PATH: '/more/account-info'
  },
  CARD_DETAILS: {
    NAME: 'card-dashboard',
    ROUTE_PATH: '/more/card'
  },
  CARD_STATUS: {
    NAME: 'card-status',
    ROUTE_PATH: '/more/card/card-status'
  },
  CARD_LOST: {
    NAME: 'card-lost',
    ROUTE_PATH: '/more/card/card-lost'
  },
  CARD_REPLACE: {
    NAME: 'card-replace',
    ROUTE_PATH: '/more/card/card-replace'
  },
  CARD_PIN: {
    NAME: 'card-pin',
    ROUTE_PATH: '/more/card/card-pin'
  },
  STATEMENTS: {
    NAME: 'statements-dashboard',
    ROUTE_PATH: '/more/statements'
  },
  ATM_FINDER: {
    NAME: 'atm-finder',
    ROUTE_PATH: '/more/atm-finder'
  },
  CHANGE_NAME: {
    NAME: 'change-name',
    ROUTE_PATH: '/more/change-name'
  },
  CHANGE_NICKNAME: {
    NAME: 'change-nickname',
    ROUTE_PATH: '/more/change-nickname'
  },
  CHANGE_ADDRESS: {
    NAME: 'change-address',
    ROUTE_PATH: 'change-address'
  },
  MEED_SHARE: {
    NAME: 'share-dashboard',
    ROUTE_PATH: '/meed-share'
  },
  MOBILE_CHECK_DEPOSIT: {
    NAME: 'mobile-check-deposit',
    ROUTE_PATH: '/move-money/mobile-check-deposit'
  },
  MEED_COVER: {
    NAME: 'cover-dashboard',
    ROUTE_PATH: '/meed-cover'
  },
  MEED_TRAVEL: {
    NAME: 'travel-dashboard',
    ROUTE_PATH: '/meed-cover'
  },
  PAY_BILLS: {
    NAME: 'pay-bills',
    ROUTE_PATH: '/move-money/pay-bills'
  },
  BILLER_DIRECR: {
    NAME: 'pay-bills',
    ROUTE_PATH: '/move-money/pay-bills/biller-direct'
  },
  CARD_SWAP: {
    NAME: 'card-swap',
    ROUTE_PATH: '/move-money/pay-bills/card-swap'
  },
  BILL_PAY: {
    NAME: 'bill-pay',
    ROUTE_PATH: '/move-money/pay-bills/bill-pay'
  },
  SETTINGS: {
    NAME: 'settings-dashboard',
    ROUTE_PATH: '/more/settings'
  },
  ADD_PAYEE: {
    NAME: 'add-payee',
    ROUTE_PATH: '/move-money/pay-bills/add-payee'
  },
  EDIT_PAYEE: {
    NAME: 'edit-payee',
    ROUTE_PATH: '/move-money/pay-bills/edit-payee'
  },
  CHANGE_LANGUAGE: {
    NAME: 'change-language-dashboard',
    ROUTE_PATH: '/more/settings/change-language'
  },
  CONTACT_PREFERNECES: {
    NAME: 'contact-preference-dashboard',
    ROUTE_PATH: '/more/settings/contact-preferences'
  },
  SEND_MONEY: {
    NAME: 'send-money-home',
    ROUTE_PATH: '/move-money/send-money'
  },
  SEND_MONEY_EDIT: {
    NAME: 'send-money-edit',
    ROUTE_PATH: '/move-money/send-money/edit'
  },
  SEND_MONEY_CONFIRM: {
    NAME: 'send-money-confirm',
    ROUTE_PATH: '/move-money/send-money/confirm'
  },
  SEND_MONEY_CONTACT_MODIFY: {
    NAME: 'send-money-contact-modify',
    ROUTE_PATH: '/move-money/send-money/modift'
  },
  SEND_MONEY_REQUEST_DETAILS: {
    NAME: 'send-money-request-details',
    ROUTE_PATH: '/move-money/send-money/request-details'
  },
  REQUEST_MONEY: {
    NAME: 'request-money-home',
    ROUTE_PATH: '/move-money/request-money'
  },
  REQUEST_MONEY_EDIT: {
    NAME: 'request-money-edit',
    ROUTE_PATH: '/move-money/request-money/edit'
  },
  REQUEST_MONEY_SELECTED: {
    NAME: 'request-money-selected',
    ROUTE_PATH: '/move-money/request-money/selected'
  },
  REQUEST_MONEY_CONFIRM: {
    NAME: 'request-money-confirm',
    ROUTE_PATH: '/move-money/request-money/confirm'
  },
  REQUEST_MONEY_CANCEL: {
    NAME: 'request-money-cancel',
    ROUTE_PATH: '/move-money/request-money/cancel'
  },
  BILL_PAYMENT: {
    NAME: 'bill-payment',
    ROUTE_PATH: '/move-money/pay-bills/bill-payment'
  },
  PRIVACY_LEGAL: {
    NAME: 'privacy-legal',
    ROUTE_PATH: '/more/privacy-legal'
  },
  VERSION_INFO: {
    NAME: 'version-info-dashboard',
    ROUTE_PATH: '/more/settings/version-info'
  },
  MESSAGES_CENTER: {
    NAME: 'message-center',
    ROUTE_PATH: '/more/message-center'
  },
  SEND_MONEY_INTERNATIONALLY: {
    NAME: 'send-money-internationally',
    ROUTE_PATH: '/move-money/send-money-internationally'
  },
  SWEEP: {
    NAME: 'sweep',
    ROUTE_PATH: '/more/settings/sweep'
  },
  MOVE_BETWEEN_ACCOUNT_CANCEL_TRANSFER: {
    NAME: 'cancel-internal-transfer',
    ROUTE_PATH: '/move-money/move-between-accounts/cancel-transfer'
  },
  CHANGE_PASSWORD: {
    NAME: 'change-password',
    ROUTE_PATH: '/more/settings/change-password'
  },
  P2P_HOME: {
    NAME: 'p2p-home',
    ROUTE_PATH: '/p2p/home'
  },
  P2P_REGISTRATION_TYPE: {
    NAME: 'p2p-registration-type',
    ROUTE_PATH: 'registration-type/:to'
  },
  P2P_INVEX_PAYEE_REGISTRATION: {
    NAME: 'p2p-invex-payee-registration',
    ROUTE_PATH: '/p2p/invex-payee-registration'
  },
  P2P_OTHER_PAYEE_REGISTRATION: {
    NAME: 'p2p-other-bank-payee-registration',
    ROUTE_PATH: '/p2p/home'
  },
  TOP_UP_MOBILE: {
    NAME: 'top-up-mobile',
    ROUTE_PATH: '/move-money/pay-bills/top-up-mobile'
  },
  ADD_TOP_UP_PAYEE: {
    NAME: 'add-top-up-payee',
    ROUTE_PATH: '/move-money/pay-bills/add-top-up-payee'
  },
  TOP_UP_PAYMENT: {
    NAME: 'top-up-payment',
    ROUTE_PATH: '/move-money/pay-bills/top-up-payment'
  },
  GIFT_CARD: {
    NAME: 'gift-card',
    ROUTE_PATH: '/move-money/pay-bills/gift-card'
  }
};
