import { TestBed } from '@angular/core/testing';

import { MeedExtraService } from './meed-extra.service';

describe('MeedExtraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeedExtraService = TestBed.get(MeedExtraService);
    expect(service).toBeTruthy();
  });
});
