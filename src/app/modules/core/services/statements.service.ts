import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '@env/environment';
import { Logger } from './logger.service';
import { HeaderService } from './header-service.service';
import { IStatement, IStatementDetails, IStatementDetailsReq } from '../models';
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
  statements$: Observable<IStatement[]>;
  constructor(private http: HttpClient, private headerService: HeaderService) {}

  loadStatements(accountId: string): Observable<IStatement[]> {
    return this.http
      .get<IStatement[]>(`${this.baseUrlStatements}/${accountId}/statements`, {
        headers: this.headerService.getUserNameCustomerIdHeader()
      })
      .pipe(
        map(statements => {
          return _.chain(statements)
            .map(statement => {
              statement.year = moment(new Date(statement.statementDate), 'YYYY-MM-DD').format('YYYY');
              statement.label = moment(new Date(statement.statementDate), 'YYYY-MM-DD').format('MM-YYYY');
              return statement;
            })
            .sortBy(statement => moment(statement.statementDate))
            .reverse()
            .groupBy(statement => statement.year)
            .map((value, key) => ({ year: key, months: value }))
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

  getStatements(accountId: string): Observable<IStatement[]> {
    if (!this.statements$) {
      this.statements$ = this.loadStatements(accountId).pipe(shareReplay(1));
    }
    return this.statements$;
  }
}
