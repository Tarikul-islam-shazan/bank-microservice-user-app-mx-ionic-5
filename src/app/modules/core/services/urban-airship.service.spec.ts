import { TestBed } from '@angular/core/testing';

import { UrbanAirshipService } from './urban-airship.service';

describe('UrbanAirshipService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UrbanAirshipService = TestBed.get(UrbanAirshipService);
    expect(service).toBeTruthy();
  });
});
