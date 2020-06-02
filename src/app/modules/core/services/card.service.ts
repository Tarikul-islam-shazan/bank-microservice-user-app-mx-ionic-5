import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '@env/environment';
import { Logger } from './logger.service';
import { shareReplay } from 'rxjs/operators';
import { ICard, ICardParams } from '../models';
import { HeaderService } from './header-service.service';
import { MemberService } from './member.service';

const logger = new Logger('CardService');
@Injectable({
  providedIn: 'root'
})
export class CardService {
  private baseUrl = environment.serviceUrl;
  private baseUrlCards = this.baseUrl + '/cards';
  private _supportNumber: string;
  cards$: Observable<ICard>;
  constructor(private http: HttpClient, private headerService: HeaderService, private memberService: MemberService) {}

  loadCardInfo(): Observable<ICard> {
    return this.http.get<ICard>(`${this.baseUrlCards}`, {
      headers: this.headerService.getUserNameCustomerIdHeader()
    });
  }

  updateCardStatus(apiData: ICardParams): Observable<ICard> {
    return this.http.patch<ICard>(
      `${this.baseUrlCards}/${apiData.cardId}/${apiData.state}`,
      {},
      {
        headers: this.headerService.getUserNameCustomerIdHeader()
      }
    );
  }

  get cardDetails(): Observable<ICard> {
    if (!this.cards$) {
      this.cards$ = this.loadCardInfo().pipe(shareReplay(1));
    }
    return this.cards$;
  }

  set supportNumber(number: string) {
    this._supportNumber = number;
  }

  get supportNumber() {
    return this._supportNumber;
  }
}
