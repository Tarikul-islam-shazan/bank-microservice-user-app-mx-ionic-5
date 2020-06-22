import { TestBed } from '@angular/core/testing';

import { P2PService } from './p2-p.service';

describe('P2PService', () => {
  let service: P2PService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(P2PService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
