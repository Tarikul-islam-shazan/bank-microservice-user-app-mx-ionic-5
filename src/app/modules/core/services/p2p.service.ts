/**
 * Core Service: p2p service
 * Details: p2p service. Manage p2p module [send money and request money] api service call and shared data
 * Date: February 7, 2020
 * Developer: Sanitul <sanitul@bs-23.com>
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeaderService } from '@app/core/services/header-service.service';
import { environment } from '@env/environment';
import { MemberService } from '@app/core/services/member.service';
import { AccountService } from '@app/core/services/account.service';
import { Observable } from 'rxjs/internal/Observable';
import { IP2PTransfer, IContact } from '@app/move-money/send-money/models';
import { IFundRequest } from '@app/move-money/request-money/models';
import { IMember } from '@app/core/models/dto/member';
import { AccountType, IAccount } from '@app/core/models/dto/account';
import { OtpService, IOtpVerificationRequest, IHttpRequestMethod } from '@app/core/services/otp.service';
@Injectable({
  providedIn: 'root'
})
export class P2pService {
  private baseUrl = environment.serviceUrl;
  p2pTransfer: Partial<IP2PTransfer> = {};
  contactList: IContact[];
  contact: Partial<IContact> = {};

  fundRequestList: IFundRequest[] = []; // Fund request list
  fundRequests: IFundRequest[] | IFundRequest; // Add/update/delete fund requests

  constructor(
    private http: HttpClient,
    private headerService: HeaderService,
    private memberService: MemberService,
    private accountService: AccountService,
    private otpService: OtpService
  ) {
    this.initialize();
  }
  /**
   * initialize p2p transfer sender email and account id from logged user
   * @memberof P2pService
   */
  initialize(): void {
    this.p2pTransfer.senderEmail = this.member.email;
    this.p2pTransfer.senderAccountId = this.checkingAccount.accountId;
  }

  get member(): IMember {
    return this.memberService.getCachedMember();
  }

  get checkingAccount(): IAccount {
    return this.accountService.getCachedAccountSummary().find(account => account.accountType === AccountType.DDA);
  }
  /**
   * check members emails are already a meed member
   * @param {string[]} membersEmails
   * @returns {Observable<string[]>}
   * @memberof P2pService
   */
  isMeedMember(membersEmails: string[]): Observable<string[]> {
    return this.http.post<string[]>(this.baseUrl + '/meed/members/verify', membersEmails);
  }
  /**
   * Submit p2p transfer from send money
   * @returns {Observable<IP2PTransfer>}
   * @memberof P2pService
   */
  submitP2P(): Observable<IP2PTransfer> {
    const otpVerificationRequest: IOtpVerificationRequest = {
      url: this.baseUrl + '/p2p',
      body: this.p2pTransfer,
      headers: this.headerService.getUserNameMemberICustomerIdHeader(),
      requestMethod: IHttpRequestMethod.Post
    };
    return this.otpService.requestOtpCode(otpVerificationRequest);
  }
  /**
   * Get fund requests
   * @memberof P2pService
   */
  fetchFundRequests(): void {
    this.http
      .get<{ requests: IFundRequest[] }>(this.baseUrl + '/fundrequests', {
        headers: this.headerService.getMemberIdHeader()
      })
      .subscribe(fundRequests => {
        this.fundRequestList = fundRequests.requests;
      });
  }
  /**
   * get user all contacts. External ipay and internal meed contact
   * @memberof P2pService
   */
  fetchContacts(): void {
    this.http
      .get<{ contacts: IContact[] }>(this.baseUrl + '/contacts', {
        headers: this.headerService.getMemberICustomerIdHeader()
      })
      .subscribe(contactsResponse => (this.contactList = contactsResponse.contacts));
  }
  /**
   * Add ipay contact
   * @returns {Observable<IContact>}
   * @memberof P2pService
   */
  addIpayContact(): Observable<IContact> {
    const otpVerificationRequest: IOtpVerificationRequest = {
      url: this.baseUrl + '/contacts',
      body: this.contact,
      headers: this.headerService.getUserNameMemberICustomerIdHeader(),
      requestMethod: IHttpRequestMethod.Post
    };
    return this.otpService.requestOtpCode(otpVerificationRequest);
  }
  /**
   * Create a fund request
   * @returns {Observable<{ requests: IFundRequest[] }>}
   * @memberof P2pService
   */
  createFundRequests(): Observable<{ requests: IFundRequest[] }> {
    return this.http.post<{ requests: IFundRequest[] }>(this.baseUrl + `/fundrequests`, this.fundRequests, {
      headers: this.headerService.getMemberIdHeader()
    });
  }
  /**
   * Delete a fund request
   * @returns {Observable<{ deleted: boolean }>}
   * @memberof P2pService
   */
  deleteFundRequest(): Observable<{ deleted: boolean }> {
    const { _id: fundRequestId } = this.fundRequests as IFundRequest;
    return this.http.delete<{ deleted: boolean }>(this.baseUrl + `/fundrequests/${fundRequestId}`, {
      headers: this.headerService.getMemberIdHeader()
    });
  }
  /**
   * update the fund requestStatus CANCELLED or DECLINED
   * @returns {Observable<IFundRequest>}
   * @memberof P2pService
   */
  updateFundRequest(): Observable<IFundRequest> {
    const { _id: fundRequestId, requestStatus, senderEmail, receiverEmail, amount, message, confirmationCode } = this
      .fundRequests as IFundRequest;
    return this.http.patch<IFundRequest>(
      this.baseUrl + `/fundrequests/${fundRequestId}`,
      {
        requestStatus,
        senderEmail,
        receiverEmail,
        amount,
        message,
        confirmationCode
      } as IFundRequest,
      {
        headers: this.headerService.getMemberIdHeader()
      }
    );
  }
  /**
   * Delete ipay contact
   * @returns {Observable<{ deleted: boolean }>}
   * @memberof P2pService
   */
  deleteIpayContact(): Observable<{ deleted: boolean }> {
    const { customerId, contactType } = this.contact;
    return this.http.delete<{ deleted: boolean }>(this.baseUrl + `/contacts/${customerId}?contactType=${contactType}`, {
      headers: this.headerService.getMemberIdHeader()
    });
  }
  /**
   * Update already added ipay contact
   * @returns {Observable<{ updated: boolean }>}
   * @memberof P2pService
   */
  updateIpayContact(): Observable<{ updated: boolean }> {
    const { customerId, email, nickName, contactType } = this.contact;
    return this.http.patch<{ updated: boolean }>(
      this.baseUrl + `/contacts/${customerId}?contactType=${contactType}`,
      { email, nickName },
      {
        headers: this.headerService.getMemberIdHeader()
      }
    );
  }
}
