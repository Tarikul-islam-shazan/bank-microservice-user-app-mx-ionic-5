import { ChangePasswordRequest } from '@app/more/models/more';
import { environment } from '@env/environment';
import { HeaderService } from '@app/core/services/header-service.service';
import { HttpClient } from '@angular/common/http';
import { IMember } from '@app/core/models/dto/member';
import { Injectable } from '@angular/core';
import { MemberService } from '@app/core/services/member.service';
import { Observable } from 'rxjs';

@Injectable()
export class PasswordService {
  private changePasswordUrl = environment.serviceUrl + '/credentials/change-password';

  get member(): IMember {
    return this.memberService.getCachedMember();
  }

  constructor(private http: HttpClient, private headerService: HeaderService, private memberService: MemberService) {}

  /**
   * @summary sends request to update password
   *
   * @param {ChangePasswordRequest} requestBody
   * @returns {Observable<boolean>}
   * @memberOf PasswordService
   */
  changePassword(requestBody: ChangePasswordRequest): Observable<boolean> {
    requestBody.username = this.member.username;

    return this.http.post<boolean>(this.changePasswordUrl, requestBody, {
      headers: this.headerService.getUserNameHeader()
    });
  }
}
