import { environment } from '@env/environment';
import { flatMap, map, tap } from 'rxjs/operators';
import { HeaderService } from './header-service.service';
import { HttpClient } from '@angular/common/http';
import { IBillPayee, IBillPayment, IOtp } from '../models';
import { IHttpRequestMethod, IOtpVerificationRequest, OtpService } from './otp.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayBillService {
  billPayee: IBillPayee = {};
  private billPayeeBaseUrl = environment.serviceUrl + '/bill-pay/payees';
  private billPaymentBaseUrl = environment.serviceUrl + '/bill-pay/payments';

  constructor(private http: HttpClient, private headerService: HeaderService, private otpService: OtpService) {}

  /**
   * @summary returns bill payee list woth payments
   *
   * @param {string} [withPaymentMethodType='']
   * @returns {Observable<IBillPayee[]>}
   * @memberOf PayBillService
   */
  getPayeeList(withPaymentMethodType: string = ''): Observable<IBillPayee[]> {
    const headers = this.headerService.getBillPayProviderHeader(),
      params = { withPaymentMethodType };
    return this.http
      .get(this.billPaymentBaseUrl, {
        headers,
        params
      })
      .pipe(
        flatMap((paymentList: IBillPayment[]) => {
          return this.http
            .get<IBillPayee[]>(this.billPayeeBaseUrl, {
              headers,
              params
            })
            .pipe(
              map((billPayees: IBillPayee[]) => {
                const payeeList = [];
                if (billPayees.length > 0) {
                  billPayees.forEach(payee => {
                    const payment = paymentList.filter(_payment => {
                      return payee.payeeId === _payment.payeeId;
                    });
                    if (payment.length > 0) {
                      Object.assign(payee, payment[0]);
                    }
                    payeeList.push(payee);
                  });
                }
                return payeeList;
              })
            );
        })
      );
  }

  getPayeeDetails(): Observable<IBillPayee> {
    return this.http
      .get(this.billPayeeBaseUrl + `/${this.billPayee.payeeId}`, {
        headers: this.headerService.getBillPayProviderHeader()
      })
      .pipe(
        tap(_billPayee => {
          this.billPayee = _billPayee;
        })
      );
  }

  addPayee(otp?: IOtp): Observable<IBillPayee> {
    const otpVerificationRequest: IOtpVerificationRequest = {
      url: this.billPayeeBaseUrl,
      body: this.billPayee,
      headers: this.headerService.getBillPayProviderHeader(),
      requestMethod: IHttpRequestMethod.Post
    };
    return this.otpService.requestOtpCode(otpVerificationRequest);
  }

  deletePayee() {
    return this.http.delete(this.billPayeeBaseUrl + `/${this.billPayee.payeeId}`, {
      headers: this.headerService.getBillPayProviderHeader()
    });
  }

  createPayment(billPayment: IBillPayment): Observable<IBillPayment> {
    const otpVerificationRequest: IOtpVerificationRequest = {
      url: this.billPaymentBaseUrl,
      body: billPayment,
      headers: this.headerService.getBillPayProviderHeader(),
      requestMethod: IHttpRequestMethod.Post
    };
    return this.otpService.requestOtpCode(otpVerificationRequest);
  }

  updatePayment(billPayment: IBillPayment): Observable<IBillPayment> {
    const _billPayment = {
      amount: billPayment.amount,
      currency: billPayment.currency,
      executionDate: billPayment.executionDate
    };
    return this.http.patch<IBillPayment>(this.billPaymentBaseUrl + `/${billPayment.paymentId}`, _billPayment, {
      headers: this.headerService.getBillPayProviderHeader()
    });
  }

  deletePayment(paymentId: string) {
    return this.http.delete<IBillPayment>(this.billPaymentBaseUrl + `/${paymentId}`, {
      headers: this.headerService.getBillPayProviderHeader()
    });
  }
}
