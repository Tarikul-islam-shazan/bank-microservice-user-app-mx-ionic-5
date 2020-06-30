import { Injectable } from '@angular/core';
import { ICustomer } from '@app/core';

@Injectable({
  providedIn: 'root'
})
export class ChangeAddressService {
  private _customer: ICustomer;
  constructor() {}

  set customerData(customer: ICustomer) {
    this._customer = customer;
  }

  get customerData(): ICustomer {
    return this._customer;
  }
}
