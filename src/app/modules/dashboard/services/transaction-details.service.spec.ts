import { TestBed } from '@angular/core/testing';

import { TransactionDetailsService } from './transaction-details.service';

describe('TransactionDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransactionDetailsService = TestBed.get(TransactionDetailsService);
    expect(service).toBeTruthy();
  });
});
