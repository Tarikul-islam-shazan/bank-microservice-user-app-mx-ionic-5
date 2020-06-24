import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeaderService } from '@app/core/services/header-service.service';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { IContact, IInvexContact } from '../models';

interface IMeedContact {
  contactType: string;
  email: string;
}

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

  verifyMember(email: string): Observable<string[]> {
    const url = this.baseUrl + '/meed/members/verify';
    return this.http.post<string[]>(url, [email]);
  }

  addMeedContact(contact: IMeedContact): Observable<{}> {
    const url = this.baseUrl + '/contacts';
    return this.http.post<{}>(url, contact, { headers: this.headerService.getMemberICustomerIdHeader() });
  }

  addInvexContact(contact: IInvexContact): Observable<void> {
    const url = this.baseUrl + '/contacts';
    return this.http.post<void>(url, contact, { headers: this.headerService.getMemberICustomerIdHeader() });
  }

  addOtherDomesticContact(contact): Observable<void> {
    const url = this.baseUrl + '/contacts';
    return this.http.post<void>(url, contact, { headers: this.headerService.getMemberICustomerIdHeader() });
  }
}
