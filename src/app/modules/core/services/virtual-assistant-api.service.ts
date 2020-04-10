import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { VirtualAssistantResponse, InitializeRequest, ChatSessionRequest } from '@app/more/virtual-assistant/models';
import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root'
})
export class VirtualAssistantApiService {
  private baseUrl = environment.serviceUrl;
  constructor(private http: HttpClient) {}

  initialize(queryParameters: InitializeRequest): Observable<VirtualAssistantResponse> {
    return this.http.get<VirtualAssistantResponse>(`${this.baseUrl}/virtual-assistant/initialize`, {
      params: {
        ...queryParameters
      }
    });
  }

  chat(requestBody): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/virtual-assistant/chat`, requestBody);
  }

  chatSession(requestBody: ChatSessionRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/virtual-assistant/chat/session`, requestBody);
  }
}
