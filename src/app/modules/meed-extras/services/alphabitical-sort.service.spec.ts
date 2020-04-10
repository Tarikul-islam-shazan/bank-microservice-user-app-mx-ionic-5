import { TestBed } from '@angular/core/testing';

import { AlphabiticalSortService } from './alphabitical-sort.service';

describe('AlphabiticalSortService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlphabiticalSortService = TestBed.get(AlphabiticalSortService);
    expect(service).toBeTruthy();
  });
});
