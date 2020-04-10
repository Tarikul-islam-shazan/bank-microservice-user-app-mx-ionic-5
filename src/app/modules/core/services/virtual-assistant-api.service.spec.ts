import { TestBed } from '@angular/core/testing';

import { VirtualAssistantApiService } from './virtual-assistant-api.service';

describe('VirtualAssistantApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VirtualAssistantApiService = TestBed.get(VirtualAssistantApiService);
    expect(service).toBeTruthy();
  });
});
