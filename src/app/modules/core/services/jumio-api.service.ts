import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '@env/environment';
import { IJumioWebInitiate, IJumioWebInitiateResponse } from '@app/signup/scan-id/models';
import { IScannedIdData } from '../models';
import { HeaderService } from '@app/core/services/header-service.service';
@Injectable({
  providedIn: 'root'
})
export class JumioApiService {
  private _scannedIdData: IScannedIdData;
  private baseUrl = environment.serviceUrl;

  constructor(private http: HttpClient, private headerService: HeaderService) {}

  get scannedIdData(): IScannedIdData {
    return this._scannedIdData;
  }
  set scannedIdData(scannedIdData: IScannedIdData) {
    this._scannedIdData = scannedIdData;
  }

  /**
   * Feature: Jumio web initiate by calling httpRequest
   * @returns {Observable<IJumioWebInitiateResponse>}
   * @memberof JumioApiService
   * Ticket: GMA-4137
   * Details: Jumio code refactor
   * Date: March 06, 2020
   * Developer: Utpaul <Utpal.Sarker@brainstation23.com>
   */
  jumioWebInitiate(webInitiateRequest: IJumioWebInitiate): Observable<IJumioWebInitiateResponse> {
    return this.http.post<IJumioWebInitiateResponse>(`${this.baseUrl}/jumio-web-initiate`, webInitiateRequest, {
      headers: this.headerService.getUserNameHeader()
    });
  }
}
