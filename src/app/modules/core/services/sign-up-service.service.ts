/**
 * Service: Signup service
 * Details: Get and Submit identity question From the bank .
 * Date: February 11,2020
 * Developer: Md.Kausar <md.kausar@brainstation23.com>
 * Include Ticket ID:GMA-4146:Signup: Handling error in KYC page.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {
  ICountry,
  ApplyForBankResponse,
  BankApplication,
  IMember,
  IStates,
  TncResponse,
  ProductOnboardedResponse,
  FundAccountResponse,
  RegistrationFeeRequest,
  DepositFund,
  AccountType,
  ISignUpDirectDepositAccounts,
  IMemberApplication,
  IdentityQuestion,
  IdentityAnswer,
  IGeneralInfo,
  IAccountLevel,
  IAddressInfo,
  IBeneficiaryInfo,
  IPersonalInfo,
  IGovtDisclosureApplication,
  IGovtDisclosureResponse,
  IConfirmIdentityInfo,
  FundingType,
  IFundingInfo,
  TncDocument
} from '../models';
import { Observable } from 'rxjs/internal/Observable';
import { Logger } from './logger.service';
import { environment } from '@env/environment';
import { flatMap, map, tap } from 'rxjs/operators';
import { HeaderService } from './header-service.service';
import { MemberService } from './member.service';
import { SettingsService } from './settings.service';
import { UserSettings } from '../models/app-settings';
import { IFundInfo } from '@app/signup/funding-information/model/fundinfo';
import { take } from 'rxjs/operators';

const logger = new Logger('SignUpService');

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private baseUrl = environment.serviceUrl;
  private baseUrlOnboarding = environment.serviceUrl + '/meed/onboarding/';
  signUpDirectDepositAccounts: ISignUpDirectDepositAccounts = {};
  private _memberApplication: IMemberApplication = {};
  private _idendityQuestions: IdentityQuestion[];
  private _fundingInfo: IFundingInfo;
  private _accountFundType: FundingType;
  // this property dictates the flow of direct deposit, as it is shared between signup and inside the app
  dynamicDirectDepositFlowToLogin = true;
  constructor(
    private http: HttpClient,
    private headerService: HeaderService,
    private memberService: MemberService,
    private settingService: SettingsService
  ) {}

  registerEmail(aMember: IMember): Observable<IMember> {
    return this.http
      .post<IMember>(this.baseUrlOnboarding, aMember, {
        observe: 'response'
      })
      .pipe(
        tap((tapResponse: HttpResponse<IMember>) => {
          const bankIdentifier = tapResponse.headers.get('meedbankingclub-bank-identifier');
          const userSettings: UserSettings = { bankIdentifier };
          this.settingService.setUserSettings(userSettings);
        }),
        map((mapResponse: HttpResponse<IMember>) => {
          return mapResponse.body as IMember;
        })
      );
  }

  get member(): IMember {
    return this.memberService.getCachedMember();
  }

  set member(member: IMember) {
    this.memberService.setMember(member);
  }

  get memberApplication(): IMemberApplication {
    return this._memberApplication;
  }

  set memberApplication(memberApplication: IMemberApplication) {
    this._memberApplication = memberApplication;
  }

  /**
   * Setter of identity questions .
   * @memberof SignUpService]
   */
  set identityQuestions(identityQuestions: IdentityQuestion[]) {
    this._idendityQuestions = identityQuestions;
  }

  /**
   * Getter of identity questions .
   * @memberof SignUpService]
   */
  get identityQuestions(): IdentityQuestion[] {
    return this._idendityQuestions;
  }

  set fundingInfo(fundingInfo: IFundingInfo) {
    this._fundingInfo = fundingInfo;
  }

  get fundingInfo(): IFundingInfo {
    return this._fundingInfo;
  }

  set accountFundType(fundType: FundingType) {
    this._accountFundType = fundType;
  }

  get accountFundType(): FundingType {
    return this._accountFundType;
  }

  assignCompressed(aMember: IMember): Observable<IMember> {
    const id = aMember._id;
    delete aMember._id;
    return this.http
      .patch<IMember>(this.baseUrlOnboarding + `${id}`, aMember, {
        observe: 'response'
      })
      .pipe(
        tap((tapResponse: HttpResponse<IMember>) => {
          const bankIdentifier = tapResponse.headers.get('meedbankingclub-bank-identifier');
          this.member = tapResponse.body as IMember;
          const userSettings: UserSettings = { bankIdentifier, username: this.member.username };
          this.settingService.setUserSettings(userSettings);
        }),
        map((mapResponse: HttpResponse<IMember>) => {
          return mapResponse.body as IMember;
        })
      );
  }

  addInviterByEmail(email: string): Observable<IMember> {
    const member: IMember = this.member;
    return this.http.get(this.baseUrlOnboarding + 'validate', { params: { inviterEmail: email } }).pipe(
      flatMap((resp: any) => {
        return this.http.patch<IMember>(this.baseUrlOnboarding + `${member._id}`, { inviter: resp.inviterId }).pipe(
          tap((_member: IMember) => {
            this.member = _member;
          })
        );
      })
    );
  }

  addInviterByCode(code: string): Observable<IMember> {
    const member: IMember = this.member;
    return this.http.get(this.baseUrlOnboarding + 'validate', { params: { inviterCode: code } }).pipe(
      flatMap((resp: any) => {
        return this.http.patch<IMember>(this.baseUrlOnboarding + `${member._id}`, { inviter: resp.inviterId }).pipe(
          tap((_member: IMember) => {
            this.member = _member;
          })
        );
      })
    );
  }

  noOneInvite(): Observable<IMember> {
    const member: IMember = this.member;
    return this.http.get(this.baseUrlOnboarding + 'validate', { params: { inviter: null } }).pipe(
      flatMap((resp: any) => {
        return this.http.patch<IMember>(this.baseUrlOnboarding + `${member._id}`, { inviter: resp.inviterId }).pipe(
          tap((_member: IMember) => {
            this.member = _member;
          })
        );
      })
    );
  }

  addCountry(member: IMember): Observable<IMember> {
    return this.http
      .patch<IMember>(
        this.baseUrlOnboarding + `${member._id}`,
        { country: member.country },
        {
          observe: 'response'
        }
      )
      .pipe(
        tap((tapResponse: HttpResponse<IMember>) => {
          const _bankIdentifier = tapResponse.headers.get('meedbankingclub-bank-identifier');
          this.member = tapResponse.body as IMember;
          const userSettings: UserSettings = { bankIdentifier: _bankIdentifier, username: this.member.username };
          this.settingService.setUserSettings(userSettings);
        }),
        map((mapResponse: HttpResponse<IMember>) => {
          return mapResponse.body as IMember;
        })
      );
  }

  getCountries(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>(this.baseUrlOnboarding + 'countries');
  }

  createEmailVerificationCode(): Observable<any> {
    const member: IMember = this.member;
    return this.http.post(this.baseUrl + '/verification', { email: member.email });
  }

  verifyEmailCode(code: string): Observable<any> {
    const member: IMember = this.member;
    return this.http.patch(this.baseUrl + '/verification', { email: member.email, verificationCode: code });
  }

  createLogin(formValue: { username$: string; password$: string }): Observable<IMember> {
    const bodyParams = { username: formValue.username$, password: formValue.password$ };
    return this.http
      .post<IMember>(this.baseUrl + '/bank/onboarding/create-login', bodyParams, {
        headers: this.headerService.getMemberIdHeader()
      })
      .pipe(
        tap((_member: IMember) => {
          this.member = _member;
        })
      );
  }

  fundingInformationSubmission(fundInfo: IFundInfo): Observable<IMember> {
    return this.http.post<IMember>(this.baseUrl + '/bank/onboarding/apply/fund-provider', fundInfo, {
      headers: this.headerService.getMemberIdCustomerIdHeader()
    });
  }

  getCountryState(countryId: string): Observable<IStates[]> {
    return this.http.get<IStates[]>(this.baseUrlOnboarding + `countries/${countryId}/states`).pipe(
      map((resp: any) => {
        const { states } = resp;
        return states;
      })
    );
  }
  ApplyForBankAccount(bankApplication: BankApplication): Observable<ApplyForBankResponse> {
    return this.http
      .post<ApplyForBankResponse>(this.baseUrl + '/bank/onboarding/apply', bankApplication, {
        headers: this.headerService.getUserNameMemberIdHeader()
      })
      .pipe(
        tap((resp: ApplyForBankResponse) => {
          this.signUpDirectDepositAccounts.memberApplication = bankApplication.memberApplication;
          this.member.customerId = resp.customerId;
        })
      );
  }

  getTermsConditions(): Observable<TncDocument[]> {
    return this.http.get<TncDocument[]>(this.baseUrl + '/bank/onboarding/terms-and-conditions', {
      headers: this.headerService.getMemberIdHeader() // backend changed the parameter from customer id to member id
    });
  }

  getTermsConditionBase64String(code: string): Observable<{ code: string; document: string }> {
    return this.http
      .get<{ code: string; document: string }>(this.baseUrl + `/bank/onboarding/terms-and-conditions/${code}`, {
        headers: this.headerService.getMemberIdHeader() // backend changed the parameter from customer id to member id
      })
      .pipe(take(1));
  }

  acceptTermsCondition(): Observable<ProductOnboardedResponse> {
    return this.http.post<ProductOnboardedResponse>(
      this.baseUrl + '/bank/onboarding/terms-and-conditions',
      {},
      {
        headers: this.headerService.getMemberIdCustomerIdHeader()
      }
    );
  }

  /**
   * 'disabled-cookies', 'true'
   * Ticket: GMA-4692
   * @summary Some of the case we do not need to send cookies to server [signup deposit, registration-fee]
   * Date: March 11, 2020
   */
  registrationFee(registrationFeeRequest: RegistrationFeeRequest): Observable<FundAccountResponse> {
    return this.http.post<FundAccountResponse>(
      this.baseUrl + '/bank/onboarding/registration-fee',
      registrationFeeRequest,
      { headers: this.headerService.getUserNameMemberIdHeader().append('disabled-cookies', 'true') }
    );
  }

  /**
   * 'disabled-cookies', 'true'
   * Ticket: GMA-4692
   * @summary Some of the case we do not need to send cookies to server [signup deposit, registration-fee]
   * Date: March 11, 2020
   */
  fundDeposit(depositFund: DepositFund): Observable<any> {
    return this.http.post(this.baseUrl + '/deposit/direct', depositFund, {
      headers: this.headerService.getMemberIdCustomerIdHeader().append('disabled-cookies', 'true')
    });
  }

  /**
   * Submit and verify the identity questions from bank .
   * @memberof SignUpService]
   */
  verifyIdentityAnswers(identityAnswers: IdentityAnswer): Observable<ApplyForBankResponse> {
    return this.http.post<ApplyForBankResponse>(
      this.baseUrl + '/bank/onboarding/identity-questions',
      { identityAnswers },
      {
        headers: this.headerService.getUserNameMemberIdHeader()
      }
    );
  }

  /**
   * Get the identity questions form bank.
   * @memberof SignUpService]
   */
  getIdentitQuestions(): Observable<ApplyForBankResponse> {
    return this.http
      .get<ApplyForBankResponse>(this.baseUrl + '/bank/onboarding/identity-questions', {
        headers: this.headerService.getUserNameMemberIdHeader()
      })
      .pipe(
        tap((res: ApplyForBankResponse) => {
          this.identityQuestions = res.questions;
        })
      );
  }

  applyGeneralInformation(generalInfo: IGeneralInfo): Observable<IMember> {
    generalInfo.email = this.member.email;
    const url = this.baseUrl + '/bank/onboarding/apply/general-info';
    return this.http.post<IMember>(url, generalInfo, {
      headers: this.headerService.getMemberICustomerIdHeader()
    });
  }

  /**
   *
   *
   * @param {number} postalCode
   * @returns {Observable<Partial<IAddressInfo>>}
   * @memberof SignUpService
   */
  getStateCityMunicipality(postalCode: number): Observable<Partial<IAddressInfo[]>> {
    return this.http.get<Partial<IAddressInfo[]>>(
      `${this.baseUrl}/bank/onboarding/${postalCode}/state-city-municipality`,
      {
        headers: this.headerService.getMemberICustomerIdHeader()
      }
    );
  }

  /**
   *
   *
   * @param {IAddressInfo} addressInfo
   * @returns {Observable<IMember>}
   * @memberof SignUpService
   */
  submitAddressInfo(addressInfo: IAddressInfo): Observable<IMember> {
    return this.http
      .post<IMember>(this.baseUrl + '/bank/onboarding/apply/address-info', addressInfo, {
        headers: this.headerService.getMemberICustomerIdHeader()
      })
      .pipe(
        tap((res: IMember) => {
          this.member = res;
        })
      );
  }

  selectAccountLevel(accountLevel: string): Observable<IAccountLevel> {
    return this.http.post<IAccountLevel>(
      `${this.baseUrl}/bank/onboarding/apply/account-level`,
      { accountLevel },
      { headers: this.headerService.getMemberIdHeader() }
    );
  }

  submitBeneficiaryApplication(beneficiaryApplication: Partial<IBeneficiaryInfo>): Observable<IMember> {
    return this.http.post<ApplyForBankResponse>(
      this.baseUrl + '/bank/onboarding/apply/beneficiary-info',
      beneficiaryApplication,
      {
        headers: this.headerService.getUserNameMemberICustomerIdHeader()
      }
    );
  }
  submitPersonaInfo(personalInfo: IPersonalInfo): Observable<IMember> {
    return this.http.post<IMember>(`${this.baseUrl}/bank/onboarding/apply/personal-info`, personalInfo, {
      headers: this.headerService.getMemberICustomerIdHeader()
    });
  }

  submitGovernmentDisclosureApplication(
    govtDisclosureApplication: IGovtDisclosureApplication
  ): Observable<IGovtDisclosureResponse> {
    return this.http.post<IGovtDisclosureResponse>(
      `${this.baseUrl}/bank/onboarding/apply/gov-disclosure`,
      govtDisclosureApplication,
      { headers: this.headerService.getMemberICustomerIdHeader() }
    );
  }

  confirmIdentity(identityInfo: any) {
    return this.http.post<IConfirmIdentityInfo>(
      this.baseUrl + '/bank/onboarding/apply/identity-confirmation',
      identityInfo,
      {
        headers: this.headerService.getMemberICustomerIdHeader()
      }
    );
  }

  getDeposistInfo(fundingType: FundingType): Observable<IFundingInfo> {
    return this.http
      .get<IFundingInfo>(`${this.baseUrl}/bank/onboarding/apply/funding-info?fundingType=${fundingType}`, {
        headers: this.headerService.getMemberICustomerIdHeader()
      })
      .pipe(
        tap((res: IFundingInfo) => {
          this.fundingInfo = res;
        })
      );
  }
}
