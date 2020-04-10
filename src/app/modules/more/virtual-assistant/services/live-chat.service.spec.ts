import { TestBed } from '@angular/core/testing';

import { LiveChatService } from './live-chat.service';

describe('LiveChatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LiveChatService = TestBed.get(LiveChatService);
    expect(service).toBeTruthy();
  });
});
