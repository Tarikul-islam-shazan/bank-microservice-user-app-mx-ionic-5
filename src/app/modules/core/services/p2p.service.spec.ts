import { TestBed } from '@angular/core/testing';

import { P2pService } from './p2p.service';

describe('P2pService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: P2pService = TestBed.get(P2pService);
    expect(service).toBeTruthy();
  });
});
