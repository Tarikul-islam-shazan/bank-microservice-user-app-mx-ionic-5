/**
 * Core Service: preference settings service
 * Details: getContact preference, change contact preference, update language etc.
 * Date: February 10th, 2020
 * Developer: Sudipta <sudipta.ghosh@bs-23.net>
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '@env/environment';
import { Logger } from './logger.service';
import { HeaderService } from './header-service.service';
import { MemberService } from './member.service';
import { IMember, IUASNamedUserLookupResponse, ContactPreference, IUASAddRemoveTag, IOtp } from '../models';
import { shareReplay } from 'rxjs/operators';
import { IOtpVerificationRequest, IHttpRequestMethod, OtpService } from './otp.service';

const logger = new Logger('PreferenceService');

@Injectable({
  providedIn: 'root'
})
export class PreferenceSettingsService {
  private baseUrl = environment.serviceUrl;
  private baseUrlPreferenceSettings = this.baseUrl + '/meed';
  namedUser$: Observable<IUASNamedUserLookupResponse>;
  contactPreferences$: Observable<ContactPreference[]>;
  constructor(
    private http: HttpClient,
    private headerService: HeaderService,
    private memberService: MemberService,
    private otpService: OtpService
  ) {}

  /**
   * update application language
   * @param {string} language
   * @returns {Observable<IMember>}
   * @memberof PreferenceSettingsService
   */
  updateLanguage(language: string): Observable<IMember> {
    const { _id } = this.memberService.getCachedMember();
    return this.http.patch<IMember>(
      `${this.baseUrlPreferenceSettings}/members/${_id}/language`,
      { language },
      {
        headers: this.headerService.getUserNameHeader()
      }
    );
  }

  /**
   * load named user from server
   * @returns {Observable<IUASNamedUserLookupResponse>}
   * @memberof PreferenceSettingsService
   */
  loadNamedUser(): Observable<IUASNamedUserLookupResponse> {
    return this.http.get<IUASNamedUserLookupResponse>(
      `${this.baseUrl}/uas/named-user?namedUser=${this.memberService.getCachedMember().customerId}`
    );
  }

  /**
   * get named user from obserable
   * @returns {Observable<IUASNamedUserLookupResponse>}
   * @memberof PreferenceSettingsService
   */
  getNamedUser(): Observable<IUASNamedUserLookupResponse> {
    if (!this.namedUser$) {
      this.namedUser$ = this.loadNamedUser().pipe(shareReplay(1));
    }
    return this.namedUser$;
  }

  /**
   * loadContact preference
   * @returns {Observable<ContactPreference[]>}
   * @memberof PreferenceSettingsService
   */
  loadContactPreference(): Observable<ContactPreference[]> {
    return this.http.get<ContactPreference[]>(`${this.baseUrl}/customer/contact-preference`, {
      headers: this.headerService.getUserNameMemberICustomerIdHeader()
    });
  }

  /**
   * get contact preference from obserable
   * @returns {Observable<ContactPreference[]>}
   * @memberof PreferenceSettingsService
   */
  getContactPreference(): Observable<ContactPreference[]> {
    if (!this.contactPreferences$) {
      this.contactPreferences$ = this.loadContactPreference().pipe(shareReplay(1));
    }
    return this.contactPreferences$;
  }

  /**
   * add named user
   * @param {string} tag
   * @returns {Observable<IUASAddRemoveTag>}
   * @memberof PreferenceSettingsService
   */
  addNamedUserTag(tag: string): Observable<IUASAddRemoveTag> {
    return this.http.post<IUASAddRemoveTag>(`${this.baseUrl}/uas/named-user/tags`, {
      namedUser: this.memberService.getCachedMember().customerId,
      tag
    });
  }

  /**
   * delete named user
   * @param {string} tag
   * @returns {Observable<IUASAddRemoveTag>}
   * @memberof PreferenceSettingsService
   */
  deleteNamedUserTag(tag: string): Observable<IUASAddRemoveTag> {
    return this.http.request<IUASAddRemoveTag>('delete', `${this.baseUrl}/uas/named-user/tags`, {
      body: { namedUser: this.memberService.getCachedMember().customerId, tag }
    });
  }

  /**
   * update contact preference
   * @param {ContactPreference} apiParms
   * @returns {Observable<ContactPreference>}
   * @memberof PreferenceSettingsService
   */
  updateContactPreference(apiParms: ContactPreference): Observable<ContactPreference> {
    const otpVerificationRequest: IOtpVerificationRequest = {
      url: this.baseUrl + '/customer/contact-preference',
      body: apiParms,
      headers: this.headerService.getUserNameMemberICustomerIdHeader(),
      requestMethod: IHttpRequestMethod.Put
    };
    return this.otpService.requestOtpCode(otpVerificationRequest);
  }
}
