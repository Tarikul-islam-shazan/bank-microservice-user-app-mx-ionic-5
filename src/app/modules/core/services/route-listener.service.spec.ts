import { TestBed } from '@angular/core/testing';

import { RouteListenerService } from './route-listener.service';

describe('RouteListenerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouteListenerService = TestBed.get(RouteListenerService);
    expect(service).toBeTruthy();
  });
});
