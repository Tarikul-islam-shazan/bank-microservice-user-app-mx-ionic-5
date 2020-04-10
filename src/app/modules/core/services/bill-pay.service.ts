import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeaderService } from '@app/core/services/header-service.service';
import { environment } from '@env/environment';
import { Observable } from 'rxjs/internal/Observable';
import { IMember } from '@app/core/models/dto/member';
import { MemberService } from '@app/core/services/member.service';
import { IQ2CreateTokenRequest, IQ2CreateTokenResponse } from '@app/move-money/pay-bills/models';

/**
 * Ticket: GMA-4378
 * * Details: Interface property added that required by Backend and Back button issue solved
 * Developer: Zahidul Islam<zahidul@bs-23.net>
 * Date: 10 Feb, 2020
 * @export
 * @class BillPayService
 */
@Injectable({
  providedIn: 'root'
})
export class BillPayService {
  private baseUrl = environment.serviceUrl;
  constructor(private http: HttpClient, private headerService: HeaderService, private memberService: MemberService) {}

  get member(): IMember {
    return this.memberService.getCachedMember();
  }

  createToken(): Observable<IQ2CreateTokenResponse> {
    const requestBody: IQ2CreateTokenRequest = {
      memberEmail: this.member.email,
      accountStatus: this.member.applicationStatus,
      nickname: this.member.nickname,
      memberStatus: this.member.accountStatus // required by Backend
    };
    return this.http.post<IQ2CreateTokenResponse>(`${this.baseUrl}/bill-pay/token`, requestBody, {
      headers: this.headerService.getQ2Headers()
    });
  }
}
