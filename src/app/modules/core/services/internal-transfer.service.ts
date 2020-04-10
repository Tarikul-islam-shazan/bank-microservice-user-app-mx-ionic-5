import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs/internal/Observable';
import { SettingsService } from '@app/core/services/settings.service';
import { ITransfer } from '@app/move-money/internal-transfer/models';
@Injectable({
  providedIn: 'root'
})
export class InternalTransferService {
  private baseUrl = environment.serviceUrl;
  private httpHeader = new HttpHeaders({
    'MeedBankingClub-Bank-Identifier': this.settingsService.getSettings().userSettings.bankIdentifier,
    'MeedBankingClub-Username': this.settingsService.getSettings().userSettings.username
  });

  constructor(private http: HttpClient, private settingsService: SettingsService) {}

  submitInternalTransfer(requestBody: ITransfer): Observable<ITransfer> {
    return this.http.post<ITransfer>(`${this.baseUrl}/bank/internal-transfer`, requestBody, {
      headers: this.httpHeader
    });
  }

  modifyInternalTransfer(requestBody: ITransfer): Observable<ITransfer> {
    return this.http.patch<ITransfer>(`${this.baseUrl}/bank/internal-transfer`, requestBody, {
      headers: this.httpHeader
    });
  }

  getInternalTransfers(): Observable<ITransfer[]> {
    return this.http.get<ITransfer[]>(`${this.baseUrl}/bank/internal-transfer`, { headers: this.httpHeader });
  }

  /**
   *
   * @description delete schudule transfer
   * @param {(Partial<ITransfer> | HttpParams)} requestBody
   * @returns {Observable<{ status: boolean }>}
   * @memberof InternalTransferService
   */
  deleteInternalTransfer(requestBody: Partial<ITransfer> | HttpParams): Observable<{ status: boolean }> {
    return this.http.delete<{ status: boolean }>(`${this.baseUrl}/bank/internal-transfer`, {
      headers: this.httpHeader,
      params: requestBody as HttpParams
    });
  }
}
