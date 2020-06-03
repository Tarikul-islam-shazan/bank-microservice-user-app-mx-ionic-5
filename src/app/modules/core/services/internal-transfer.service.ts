import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs/internal/Observable';
import { ITransfer } from '@app/move-money/internal-transfer/models';
import { IDropdownOption, StaticDataCategory, StaticData } from '../models/static-data';
import { StaticDataService } from './static-data.service';
import { shareReplay } from 'rxjs/operators';
import { HeaderService } from './header-service.service';
@Injectable({
  providedIn: 'root'
})
export class InternalTransferService {
  staticData$: Observable<{ [key: string]: IDropdownOption[] }>;
  _transferFrequency: IDropdownOption[];

  private baseUrl = environment.serviceUrl;

  constructor(
    private http: HttpClient,
    private staticDataService: StaticDataService,
    private headerService: HeaderService
  ) {}

  get transferFrequency(): IDropdownOption[] {
    return this._transferFrequency;
  }

  set transferFrequency(transferFrequency: IDropdownOption[]) {
    this._transferFrequency = transferFrequency;
  }

  submitInternalTransfer(requestBody: ITransfer): Observable<ITransfer> {
    return this.http.post<ITransfer>(`${this.baseUrl}/bank/internal-transfer`, requestBody, {
      headers: this.headerService.getUserNameHeader()
    });
  }

  modifyInternalTransfer(requestBody: ITransfer): Observable<ITransfer> {
    return this.http.patch<ITransfer>(`${this.baseUrl}/bank/internal-transfer`, requestBody, {
      headers: this.headerService.getUserNameHeader()
    });
  }

  getInternalTransfers(): Observable<ITransfer[]> {
    return this.http.get<ITransfer[]>(`${this.baseUrl}/bank/internal-transfer`, {
      headers: this.headerService.getMemberICustomerIdHeader()
    });
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
      headers: this.headerService.getUserNameHeader(),
      params: requestBody as HttpParams
    });
  }

  loadTransferFrequency() {
    if (!this.staticData$) {
      this.staticData$ = this.staticDataService.get(StaticDataCategory.TransferFrequency).pipe(shareReplay(1));
    }
    this.staticData$.subscribe((staticData: { [key: string]: IDropdownOption[] }) => {
      this.transferFrequency = staticData[StaticData.TransferFrequency];
    });
  }
}
