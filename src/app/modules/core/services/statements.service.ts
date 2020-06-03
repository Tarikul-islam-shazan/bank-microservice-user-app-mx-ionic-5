import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '@env/environment';
import { Logger } from './logger.service';
import { HeaderService } from './header-service.service';
import { IStatements, IStatementDetails, IStatementDetailsReq } from '../models';
import { shareReplay, map } from 'rxjs/operators';
import * as moment from 'moment';
import _ from 'lodash';

const logger = new Logger('StatementsService');
@Injectable({
  providedIn: 'root'
})
export class StatementsService {
  private baseUrl = environment.serviceUrl;
  private baseUrlStatements = this.baseUrl + '/accounts';
  statements$: Observable<IStatements[]>;
  constructor(private http: HttpClient, private headerService: HeaderService) {}

  loadStatements(accountId: string): Observable<IStatements[]> {
    return this.http
      .get<IStatements[]>(`${this.baseUrlStatements}/${accountId}/statements`, {
        headers: this.headerService.getUserNameCustomerIdHeader()
      })
      .pipe(
        map(statements => {
          return _.chain(statements)
            .sortBy(statement => moment(statement.statementDate))
            .reverse()
            .value();
        })
      );
  }

  loadMonthStatements(apiData: IStatementDetailsReq): Observable<IStatementDetails> {
    return this.http.get<IStatementDetails>(
      `${this.baseUrlStatements}/${apiData.accountId}/statements/${apiData.statementId}`,
      {
        headers: this.headerService.getUserNameCustomerIdHeader()
      }
    );
  }

  getStatements(accountId: string): Observable<IStatements[]> {
    if (!this.statements$) {
      this.statements$ = this.loadStatements(accountId).pipe(shareReplay(1));
    }
    return this.statements$;
  }
}
