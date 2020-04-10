import { TestBed } from '@angular/core/testing';

import { MeedShareService } from './meed-share.service';

describe('MeedShareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeedShareService = TestBed.get(MeedShareService);
    expect(service).toBeTruthy();
  });
});
