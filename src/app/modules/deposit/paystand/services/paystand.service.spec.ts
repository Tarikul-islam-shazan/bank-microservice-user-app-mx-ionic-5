import { TestBed } from '@angular/core/testing';

import { PaystandService } from './paystand.service';

describe('PaystandService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaystandService = TestBed.get(PaystandService);
    expect(service).toBeTruthy();
  });
});
