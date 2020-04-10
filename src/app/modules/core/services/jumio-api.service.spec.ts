import { TestBed } from '@angular/core/testing';

import { JumioApiService } from './jumio-api.service';

describe('JumioApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JumioApiService = TestBed.get(JumioApiService);
    expect(service).toBeTruthy();
  });
});
