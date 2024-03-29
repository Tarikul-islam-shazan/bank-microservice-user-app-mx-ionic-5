import { environment } from '@env/environment';
import { HeaderService } from './header-service.service';
import { HttpClient } from '@angular/common/http';
import { IBillPayee, IBillPayment, IBiller, BillerCategory } from '@app/core/models/dto/member';
import { IHttpRequestMethod, IOtpVerificationRequest, OtpService } from './otp.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayBillService {
  billPayee: IBillPayee = {};
  biller: IBiller = {};
  private billPayeeBaseUrl = `${environment.serviceUrl}/bill-pay/payees`;
  private billPaymentBaseUrl = `${environment.serviceUrl}/bill-pay/payments`;
  private billerSearchUrl = `${environment.serviceUrl}/bill-pay/billers/search`;
  private giftCardPurchaseUrl = `${environment.serviceUrl}/bill-pay/gift-card/purchase`;

  constructor(private http: HttpClient, private headerService: HeaderService, private otpService: OtpService) {}

  addPayee(payee: IBillPayee): Observable<IBillPayee> {
    return this.http.post<IBillPayee>(
      this.billPayeeBaseUrl,
      {
        biller: payee.biller,
        accountNumber: payee.accountNumber
      },
      { headers: this.headerService.getMemberIdHeader() }
    );
  }
  addTopUpPayee(payee: IBillPayee): Observable<IBillPayee> {
    return this.http.post<IBillPayee>(
      this.billPayeeBaseUrl,
      {
        biller: payee.biller,
        phoneNumber: payee.phoneNumber
      },
      { headers: this.headerService.getMemberIdHeader() }
    );
  }

  updatePayee(payee: IBillPayee): Observable<IBillPayee> {
    return this.http.put<IBillPayee>(
      `${this.billPayeeBaseUrl}/${this.billPayee._id}`,
      {
        category: payee.category,
        biller: payee.biller as number,
        accountNumber: payee.accountNumber
      },
      { headers: this.headerService.getMemberIdHeader() }
    );
  }

  searchBillers(category: BillerCategory, name: string): Observable<IBiller[]> {
    return this.http.get<IBiller[]>(this.billerSearchUrl, {
      params: { category, name },
      headers: this.headerService.getBankIdentifierHeader().set('skip-loader', '')
    });
  }
  getBillAccounts(category: BillerCategory): Observable<IBillPayee[]> {
    return this.http.get<IBillPayee[]>(this.billPayeeBaseUrl, {
      params: { category },
      headers: this.headerService.getMemberIdHeader()
    });
  }

  deletePayee(id: string) {
    return this.http.delete(`${this.billPayeeBaseUrl}/${id}`, {
      headers: this.headerService.getMemberIdHeader()
    });
  }

  createUtilityPayment(billPayment: IBillPayment): Observable<IBillPayee> {
    const { amount, biller, accountNumber, currency } = billPayment,
      _billPayment = { biller, accountNumber, amount, currency, category: BillerCategory.Utility };
    return this.http.post<IBillPayee>(this.billPaymentBaseUrl, _billPayment, {
      headers: this.headerService.getBillPayProviderHeader()
    });
  }
  createTopUpPayment(billPayment: IBillPayment): Observable<IBillPayee> {
    const { amount, biller, phoneNumber, currency } = billPayment,
      _billPayment = { biller, phoneNumber, amount, currency, category: BillerCategory.Topup };
    return this.http.post<IBillPayee>(this.billPaymentBaseUrl, _billPayment, {
      headers: this.headerService.getBillPayProviderHeader()
    });
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

  giftCardPurchase(giftCardDetails: IBillPayment): Observable<IBillPayment> {
    giftCardDetails.category = BillerCategory.Giftcard;
    return this.http.post<IBillPayment>(this.billPaymentBaseUrl, giftCardDetails, {
      headers: this.headerService.getBillPayProviderHeader()
    });
  }
}
