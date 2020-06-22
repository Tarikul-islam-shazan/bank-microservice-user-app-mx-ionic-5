import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeaderService } from '@app/core/services/header-service.service';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { IContact } from '../models';

@Injectable()
export class P2PService {
  private baseUrl = environment.serviceUrl;
  constructor(private http: HttpClient, private headerService: HeaderService) {}

  getAllContacts(): Observable<IContact[]> {
    const url = this.baseUrl + '/contacts';
    return this.http.get<IContact[]>(url, {
      headers: this.headerService.getMemberICustomerIdHeader()
    });
  }

  verifyMember(email: string[]): Observable<string[]> {
    const url = this.baseUrl + '/meed/members/verify';
    return this.http.post<string[]>(url, email);
  }
}
