import { TestBed } from '@angular/core/testing';

import { PreferenceSettingsService } from './preference-settings.service';

describe('PreferenceSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreferenceSettingsService = TestBed.get(PreferenceSettingsService);
    expect(service).toBeTruthy();
  });
});
