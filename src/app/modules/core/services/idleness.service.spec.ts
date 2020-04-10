import { TestBed } from '@angular/core/testing';

import { IdlenessService } from './idleness.service';

describe('IdlenessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IdlenessService = TestBed.get(IdlenessService);
    expect(service).toBeTruthy();
  });
});
