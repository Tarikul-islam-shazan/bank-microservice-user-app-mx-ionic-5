import { TestBed } from '@angular/core/testing';

import { OrchestrationService } from './orchestration.service';

describe('OrchestrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrchestrationService = TestBed.get(OrchestrationService);
    expect(service).toBeTruthy();
  });
});
