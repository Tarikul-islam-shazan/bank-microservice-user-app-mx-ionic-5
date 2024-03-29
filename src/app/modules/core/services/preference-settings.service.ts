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
import {
  IMember,
  IUASNamedUserLookupResponse,
  ContactPreference,
  IUASAddRemoveTag,
  ContactPreferenceRequest,
  IPreference
} from '../models';
import { shareReplay } from 'rxjs/operators';

const logger = new Logger('PreferenceService');

@Injectable({
  providedIn: 'root'
})
export class PreferenceSettingsService {
  private baseUrl = environment.serviceUrl;
  private baseUrlPreferenceSettings = this.baseUrl + '/meed';
  namedUser$: Observable<IUASNamedUserLookupResponse>;
  contactPreferences$: Observable<ContactPreference>;
  constructor(private http: HttpClient, private headerService: HeaderService, private memberService: MemberService) {}

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
  loadContactPreference(): Observable<ContactPreference> {
    return this.http.get<ContactPreference>(`${this.baseUrl}/customer/contact-preference`, {
      headers: this.headerService.getUserNameMemberICustomerIdHeader()
    });
  }

  /**
   * get contact preference from obserable
   * @returns {Observable<ContactPreference[]>}
   * @memberof PreferenceSettingsService
   */
  getContactPreference(): Observable<ContactPreference> {
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
   *
   *
   * @param {ContactPreferenceRequest}} contactPreference
   * @returns {Observable<Partial<ContactPreference>>}
   * @memberof PreferenceSettingsService
   */
  updateContactPreference(contactPreference: ContactPreferenceRequest): Observable<Partial<ContactPreference>> {
    return this.http.put<Partial<ContactPreference>>(
      `${this.baseUrl}/customer/contact-preference?type=${contactPreference.type}&&status=${contactPreference.status}`,
      {},
      { headers: this.headerService.getUserNameMemberICustomerIdHeader() }
    );
  }

  /**
   *
   * @param {IPreference} preference
   * @returns {Observable<IPreference[]>}
   * @memberof PreferenceSettingsService
   */
  updateMeedPrefernces(preferences: IPreference): Observable<IPreference[]> {
    return this.http.patch<IPreference[]>(
      `${this.baseUrlPreferenceSettings}/preferences`,
      { ...preferences },
      {
        headers: this.headerService.getMemberIdHeader()
      }
    );
  }
}
