import { TestBed } from '@angular/core/testing';

import { AccountRecoveryService } from './account-recovery.service';

describe('AccountRecoveryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountRecoveryService = TestBed.get(AccountRecoveryService);
    expect(service).toBeTruthy();
  });
});
