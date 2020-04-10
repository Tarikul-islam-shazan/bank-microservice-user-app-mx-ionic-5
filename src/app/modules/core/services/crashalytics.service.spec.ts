import { TestBed } from '@angular/core/testing';

import { CrashalyticsService } from './crashalytics.service';

describe('CrashalyticsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrashalyticsService = TestBed.get(CrashalyticsService);
    expect(service).toBeTruthy();
  });
});
