import { TestBed } from '@angular/core/testing';

import { JumioService } from './jumio.service';

describe('JumioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JumioService = TestBed.get(JumioService);
    expect(service).toBeTruthy();
  });
});
