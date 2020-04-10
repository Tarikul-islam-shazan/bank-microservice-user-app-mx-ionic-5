import { Injectable } from '@angular/core';
import { ICustomer } from '@app/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class PersonalDetailsState {
  private customer: BehaviorSubject<ICustomer> = new BehaviorSubject({});
  private _customer$: Observable<ICustomer> = this.customer.asObservable();
  constructor() {}

  get customer$(): Observable<ICustomer> {
    return this._customer$;
  }

  updateCustomer(_customer: ICustomer) {
    this.customer.next(_customer);
  }
}
