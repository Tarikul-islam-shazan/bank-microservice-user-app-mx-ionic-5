import { TestBed } from '@angular/core/testing';

import { AppUpgradeService } from './app-upgrade.service';

describe('AppUpgradeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppUpgradeService = TestBed.get(AppUpgradeService);
    expect(service).toBeTruthy();
  });
});
