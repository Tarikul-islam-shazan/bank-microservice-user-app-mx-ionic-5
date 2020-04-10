import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { HeaderService } from '@app/core/services/header-service.service';
import { Observable } from 'rxjs';
import { IPrivacyAndLegalDocument } from '@app/core/models/dto/privacy-document';
@Injectable()
export class PrivacyLegalService {
  privacyAndLegalUrl = environment.serviceUrl + '/privacy-and-legal';
  constructor(private http: HttpClient, private headerService: HeaderService) {}

  fetchPrivacyAndLegalDocuments(): Observable<IPrivacyAndLegalDocument[]> {
    return this.http.get<IPrivacyAndLegalDocument[]>(this.privacyAndLegalUrl, {
      headers: this.headerService.getUserNameCustomerIdHeader()
    });
  }
}
