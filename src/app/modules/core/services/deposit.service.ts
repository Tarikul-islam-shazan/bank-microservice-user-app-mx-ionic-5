import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { IDepositCheck, IDepositCheckResponse } from '@app/move-money/mobile-check-deposit/models';
import { HeaderService } from '@app/core/services/header-service.service';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class DepositService {
  private baseUrl = `${environment.serviceUrl}/deposit`;
  constructor(private http: HttpClient, private headerService: HeaderService) {}

  submitCheque(depositFormData: FormData): Observable<IDepositCheckResponse> {
    return this.http.post<IDepositCheckResponse>(`${this.baseUrl}/check`, depositFormData, {
      headers: this.headerService.getUserNameHeader()
    });
  }
}
