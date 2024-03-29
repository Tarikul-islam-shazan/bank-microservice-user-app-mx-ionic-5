/**
 *  Analytics Provider
 *
 * @export
 * @interface AnalyticsProvider
 */
export interface AnalyticsProvider {
  /**
   *
   *
   * @param {string} id
   * @memberof AnalyticsProvider
   */
  setUserId(id: string): void;
  /**
   *
   *
   * @param {string} name
   * @param {string} value
   * @memberof AnalyticsProvider
   */
  setUserProperty(name: string, value: string): void;
  /**
   *
   *
   * @param {string} name
   * @memberof AnalyticsProvider
   */
  setCurrentScreenName(name: string): void;
  /**
   *
   *
   * @param {boolean} isEnabled
   * @memberof AnalyticsProvider
   */
  setAnalyticsEnabled(isEnabled: boolean): void;
  /**
   *
   *
   * @param {*} event
   * @memberof AnalyticsProvider
   */
  logEvent(event: any, params?: any): void;
}

export enum AnalyticsEventTypes {
  PageView = 'page_view',
  ButtonClick = 'button_click',
  Login = 'login',
  RouteNavigation = 'route_navigation',
  JumioScan = 'jumio_scan',
  LoginCompleted = 'login_completed',
  EmailSubmitted = 'email_submitted',
  CompressedSubmitted = 'nickname_inviter_country_submitted',
  VerificationCodeSent = 'verification_code_sent',
  EmailVerified = 'email_verified',
  ApplicationStarted = 'application_started',
  LoginCreated = 'login_created',
  IdVerificationStarted = 'id_verification_started',
  IdVerificationCanceled = 'id_verification_canceled',
  IdVerificationCompleted = 'id_verification_completed',
  IdVerificationFailed = 'id_verification_failed',
  GeneralInfoSubmitted = 'general_info_submitted',
  FundingProviderSelect = 'signup_who_will_fund_selected',
  GovernmentDisclosureCompleted = 'signup_government_disclosure_completed',
  AddressInfoSubmitted = 'address_info_submitted',
  SignupGeneralInfoCompleted = 'signup_general_info_completed',
  SignupAddressInfoCompleted = 'signup_address_info_completed',
  SignupBeneficiaryInfoCompleted = 'signup_beneficiary_info_completed',
  SignupAccountLevelSelected = 'signup_account_level_selected',
  SignupPersonalInfoCompleted = 'signup_personal_info_completed',
  IdDocumentSubmitted = 'Id_document_submitted',
  TermsAndConditionsAgreed = 'terms_and_conditions_agreed',
  AccountFunded = 'account_funded',
  ApplicationStatusDetermined = 'application_status_determined',
  DepositMethodSelected = 'deposit_method_selected',
  FundingAmountsSelected = 'funding_amounts_selected',
  FundingCompleted = 'funding_completed',
  DirectDepositSelected = 'direct_deposit_selected',
  DirectDepositViewed = 'direct_deposit_viewed',
  DirectDepositEmailed = 'direct_deposit_emailed',
  AccountSelected = 'account_selected',
  TransferStarted = ' transfer_started',
  LOCAdvanceSearch = 'search_started',
  SavingsGoalStarted = 'savings_goal_started',
  SavingsGoalCreated = 'savings_goal_created',
  SavingsGoalUpdated = 'savings_goal_updated',
  SavingsGoalDeleted = 'savings_goal_deleted',
  MeedCoverPdfViewed = 'meed_cover_pdf_viewed',
  MeedTravelPdfViewed = 'meed_travel_pdf_viewed',
  MeedTravelPageVisited = 'meed_travel_page_visited',
  OfferViewed = 'offer_viewed',
  MeedExtrasFeaturedOffersLoaded = 'meed_extras_feature_offers_loaded',
  MeedExtrasCategoriesLoaded = 'meed_extras_categories_loaded',
  MeedExtrasCategorySelected = 'meed_extras_category_selected',
  ExtrasCategorySelected = 'extras_category_selected',
  NearbyOffersSelected = 'nearby_offers_selected',
  AllOfferSelected = 'all_offer_selected',
  AllOfferLoaded = 'all_offers_loaded',
  OfferActivated = 'offer_activated',
  ZipSearchInitiated = 'zip_search_initiated',
  NearbyZipSearchInitiated = 'nearby_zip_search_initiated',
  SearchDealCategoriesSelected = 'search_deal_categories_selected',
  SearchDealTypesSelected = 'search_deal_types_selected',
  ExternalSiteViewed = 'external_site_viewed',
  CallInitiated = 'call_initiated',
  CardStatusChanged = 'card_status_changed',
  AddressChanged = 'address_changed',
  EmailChanged = 'email_changed',
  PhoneNumberChanged = 'phone_number_changed',
  NameChangeCompleted = 'name_change_completed',
  NicknameChangeCompleted = 'nickname_change_completed',
  PhoneNumberChangeCompleted = 'phone_number_change_completed',
  LanguageChanged = 'language_changed',
  LoginOptionClicked = 'login_option_clicked',
  MenuItemSelected = 'menu_item_selected',
  ChangeMeedEmailStatus = 'meed_email_status_changed',
  ChangeMeedPushNotificationStatus = 'meed_push_notification_status_changed',
  ChangeBankEmailStatus = 'bank_email_status_changed',
  ChangeBankPushNotificationStatus = 'bank_push_notification_status_changed',
  VerifyIndentityQuestionnaireStated = 'verify_indentity_questionnaire_stated',
  VerifyIndentityQuestionnaireEnd = 'verify_indentity_questionnaire_end',
  SweepStatusUpdated = 'sweep_status_updated',
  BillPayeeAdded = 'bill_payee_added',
  BillPayeeDeleted = 'bill_payee_deleted',
  BillPaymentDone = 'bill_payment_done',
  BillPaymentAdded = 'bill_payment_added',
  BillPaymentUpdated = 'bill_payment_updated',
  BillPaymentDeleted = 'bill_payment_deleted',
  EmailVerificationCodeFailed = 'email_verification_code_failed',
  PasswordChanged = 'password_changed',
  AllInvitationsLoaded = 'all_invitations_loaded',
  InvitationSent = 'invitation_sent',
  InternalTransferSubmitted = 'internal_transfer_submitted',
  ScheduleTransferModifyed = 'internal_transfer_modifyed',
  ScheduledTransfersLoaded = 'scheduled_transfers_loaded',
  ScheduleTransferDeleted = 'schedule_transfer_deleted',
  P2PSearchedNext = 'email_existing_contact_search_clicked_next',
  P2PFundRequestDeclined = 'p2p_fund_request_declined',
  IPayContactSubmitted = 'ipay_contact_submitted',
  IPayContactAdded = 'ipay_contact_added',
  IPayContactUpdated = 'ipay_contact_updated',
  IPayContactDeleted = 'ipay_contact_deleted',
  P2PFundRequestsLoaded = 'p2p_fund_requests_loaded',
  P2PContactsLoaded = 'p2p_contacts_loaded',
  P2PFundRequestSelected = 'p2p_fund_request_selected',
  P2PContactSelected = 'p2p_contact_selected',
  P2PFundTransferSubmitted = 'p2p_fund_transfer_submitted',
  P2PFundTransferCompleted = 'p2p_fund_transfer_completed',
  EmailChangeCompleted = 'email_change_completed',
  InternalTransferPaymentOptionSelected = 'internal_transfer_payment_option_selected',
  InternalTransferCancelled = 'internal_transfer_celcelled',
  ScheduledTransferSelected = 'scheduled_transfer_selected'
}
export interface AnalyticsNavigationParameters {
  from: string;
  to: string;
}

export interface AnalyticsJumioParameters {
  documentType: string;
}

export interface AnalyticsLoginParameters {
  username: string;
}

export enum AnalyticsUserProperties {
  PreferredLanguage = 'preferred_language',
  BankName = 'bank_name',
  MemberId = 'member_id',
  UserName = 'user_name',
  UserEmail = 'user_email',
  UserState = 'user_state',
  UserCity = 'user_city',
  UserAge = 'user_age',
  UserGender = 'user_gender'
}
