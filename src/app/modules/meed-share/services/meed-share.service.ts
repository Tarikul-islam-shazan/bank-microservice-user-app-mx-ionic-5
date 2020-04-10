import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Logger } from './../../core/services/logger.service';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { IMeedShare } from '@app/core';
import { MemberService } from '@app/core/services/member.service';
const logger = new Logger('MeedShareService');
@Injectable()
export class MeedShareService {
  private baseUrl = environment.serviceUrl;
  private baseUrlShare = this.baseUrl + '/meedshare/';
  constructor(private http: HttpClient, private memberService: MemberService) {}

  getShareData(): Observable<IMeedShare> {
    return this.http.get<IMeedShare>(this.baseUrlShare, {
      params: { memberId: this.memberService.getCachedMember()._id }
    });
  }
}
