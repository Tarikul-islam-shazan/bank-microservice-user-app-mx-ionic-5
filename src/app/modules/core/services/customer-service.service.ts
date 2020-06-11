import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomer, IStates, IOtp, IDocumentRequestData, IAddress } from '../models';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { HeaderService } from './header-service.service';
import { map, tap } from 'rxjs/operators';
import { MemberService } from './member.service';
import { OtpService, IOtpVerificationRequest, IHttpRequestMethod } from './otp.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = environment.serviceUrl;
  constructor(
    private http: HttpClient,
    private headerService: HeaderService,
    private memberService: MemberService,
    private otpService: OtpService
  ) {}

  getCustomerInfo(): Observable<ICustomer> {
    return this.http.get<ICustomer>(this.baseUrl + '/customer', {
      headers: this.headerService.getUserNameMemberICustomerIdHeader()
    });
  }

  updateNickname(_nickname: string): Observable<ICustomer> {
    return this.http
      .put<ICustomer>(
        this.baseUrl + '/customer',
        { nickname: _nickname },
        { headers: this.headerService.getUserNameMemberICustomerIdHeader() }
      )
      .pipe(
        tap(_customer => {
          Object.assign(this.memberService.member, _customer);
        })
      );
  }

  updateEmail(email: string): Observable<ICustomer> {
    return this.http
      .put<ICustomer>(
        this.baseUrl + '/customer',
        { email },
        { headers: this.headerService.getUserNameMemberICustomerIdHeader() }
      )
      .pipe(
        tap(_customer => {
          Object.assign(this.memberService.member, _customer);
        })
      );
  }

  getCountryState(countryId: string): Observable<IStates[]> {
    return this.http.get<IStates[]>(this.baseUrl + `/meed/onboarding/countries/${countryId}/states`).pipe(
      map((resp: any) => {
        const { states } = resp;
        return states;
      })
    );
  }

  updateAddress(address: IAddress[]): Observable<ICustomer> {
    const otpVerificationRequest: IOtpVerificationRequest = {
      url: this.baseUrl + '/customer',
      body: address,
      headers: this.headerService.getUserNameMemberICustomerIdHeader(),
      requestMethod: IHttpRequestMethod.Put
    };

    return this.otpService.requestOtpCode(otpVerificationRequest);
  }
  updatePhone(customer: ICustomer): Observable<ICustomer> {
    const otpVerificationRequest: IOtpVerificationRequest = {
      url: this.baseUrl + '/customer',
      body: customer,
      headers: this.headerService.getUserNameMemberICustomerIdHeader(),
      requestMethod: IHttpRequestMethod.Put
    };
    return this.otpService.requestOtpCode(otpVerificationRequest);
  }

  // updated for the new otp implementation
  updateName(document: IDocumentRequestData): Observable<ICustomer> {
    const otpVerificationRequest: IOtpVerificationRequest = {
      url: this.baseUrl + '/customer',
      body: document,
      headers: this.headerService.getUserNameMemberICustomerIdHeader(),
      requestMethod: IHttpRequestMethod.Put
    };
    return this.otpService.requestOtpCode(otpVerificationRequest);
  }
}
