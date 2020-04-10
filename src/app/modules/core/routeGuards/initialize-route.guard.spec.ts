import { TestBed, async, inject } from '@angular/core/testing';

import { InitializeRouteGuard } from './initialize-route.guard';

describe('InitializeRouteGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InitializeRouteGuard]
    });
  });

  it('should ...', inject([InitializeRouteGuard], (guard: InitializeRouteGuard) => {
    expect(guard).toBeTruthy();
  }));
});
