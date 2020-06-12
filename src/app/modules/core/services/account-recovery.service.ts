import { environment } from '@env/environment';
import { HeaderService } from './header-service.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  IChallengeAnswers,
  IChallengeQuestions,
  ITemporaryPasswordRequest,
  ITemporaryPassword,
  IRecoverPassword
} from '../models/dto';
import { IHttpRequestMethod, IOtpVerificationRequest, OtpService } from './otp.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountRecoveryService {
  private baseUrl = environment.serviceUrl;
  private key: string;
  private username: string;
  constructor(private http: HttpClient, private headerService: HeaderService, private otpService: OtpService) {}

  /**
   * @summary opens OTP modal on request success
   *
   * @param {string} username
   * @returns {Observable<IChallengeQuestions>}
   * @memberOf AccountRecoveryService
   */
  getChallengeQuestions(username: string): Observable<IChallengeQuestions> {
    this.username = username;
    const reqParams: HttpParams = new HttpParams({ fromString: `username=${username}` });
    const otpVerificationRequest: IOtpVerificationRequest = {
      url: this.baseUrl + '/credentials/forgot-password/challenge-questions',
      params: reqParams,
      requestMethod: IHttpRequestMethod.Get
    };
    return this.otpService.requestOtpCode(otpVerificationRequest);
  }

  /**
   * @summary validates challenge questions
   *
   * @param {IChallengeAnswers} answer
   * @returns {Observable<IChallengeAnswers>}
   * @memberOf AccountRecoveryService
   */
  validateChallengeQuestions(answer: IChallengeAnswers): Observable<IChallengeAnswers> {
    const headers: HttpHeaders = this.headerService.getBankIdentifierHeader();
    return this.http
      .post<IChallengeAnswers>(this.baseUrl + '/credentials/forgot-password/challenge-questions', answer, { headers })
      .pipe(
        tap((resp: any) => {
          this.key = resp.key;
        })
      );
  }

  /**
   * @summary Reset password.
   *
   * @param {string} password
   * @returns {Observable<IChallengeAnswers>}
   * @memberof AccountRecoveryService
   */
  resetPassword(password: string): Observable<IChallengeAnswers> {
    const headers: HttpHeaders = this.headerService.getBankIdentifierHeader();
    return this.http.post<IChallengeAnswers>(
      this.baseUrl + '/credentials/forgot-password/reset',
      { username: this.username, key: this.key, password },
      { headers }
    );
  }
  /**
   * @summary sneds request with email
   *
   * @param {string} email
   * @returns {Observable<IChallengeAnswers>}
   * @memberOf AccountRecoveryService
   */
  forgotUsername(email: string): Observable<IChallengeAnswers> {
    return this.http.post<IChallengeAnswers>(this.baseUrl + '/credentials/forgot-username', { email });
  }

  requestTemporaryPassword(answer: ITemporaryPasswordRequest): Observable<ITemporaryPassword> {
    this.username = answer.username;
    const headers: HttpHeaders = this.headerService.getBankIdentifierHeader();
    return this.http.post<ITemporaryPassword>(this.baseUrl + '/credentials/forgot-password', answer, { headers });
  }

  /**
   * @summary Recover password.
   *
   * @param {IRecoverPassword} recoverPasswordParams
   * @returns {Observable<IRecoverPassword>}
   * @memberof AccountRecoveryService
   */
  recoverPassword(recoverPasswordParams: IRecoverPassword): Observable<IRecoverPassword> {
    recoverPasswordParams.username = this.username;
    const headers: HttpHeaders = this.headerService.getBankIdentifierHeader();
    return this.http.post<IRecoverPassword>(
      this.baseUrl + '/credentials/forgot-password/reset',
      recoverPasswordParams,
      { headers }
    );
  }
}
