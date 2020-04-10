import { TestBed } from '@angular/core/testing';

import { VirtualAssistantService } from './virtual-assistant.service';

describe('VirtualAssistantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VirtualAssistantService = TestBed.get(VirtualAssistantService);
    expect(service).toBeTruthy();
  });
});
