import { TestBed } from '@angular/core/testing';

import { InternalTransferApiService } from './internal-transfer-api.service';

describe('InternalTransferApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InternalTransferApiService = TestBed.get(InternalTransferApiService);
    expect(service).toBeTruthy();
  });
});
