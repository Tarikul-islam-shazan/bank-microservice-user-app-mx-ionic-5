import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { IBankAtm, IBankAtmRequestParams, IMember } from '../models';
import { HttpClient } from '@angular/common/http';
import { MemberService } from './member.service';
import { HeaderService } from './header-service.service';

@Injectable({
  providedIn: 'root'
})
export class MoreMenuService {
  private baseUrl = environment.serviceUrl;
  private member: IMember;
  constructor(private http: HttpClient, private memberService: MemberService, private headerService: HeaderService) {
    this.member = this.memberService.getCachedMember();
  }

  getAtmByGeoCode(requestParams: IBankAtmRequestParams): Observable<IBankAtm[]> {
    const httpParams: any = requestParams;
    return this.http.get<IBankAtm[]>(this.baseUrl + `/bank/atm/${this.member.bank}`, {
      headers: this.headerService.getUserNameHeader(),
      params: httpParams
    });
  }

  getAtmByAddress(requestParams: IBankAtmRequestParams): Observable<IBankAtm[]> {
    const httpParams: any = requestParams;
    return this.http.get<IBankAtm[]>(this.baseUrl + `/bank/atm/${this.member.bank}`, {
      headers: this.headerService.getUserNameHeader(),
      params: httpParams
    });
  }
}
