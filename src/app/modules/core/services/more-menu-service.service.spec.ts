import { TestBed } from '@angular/core/testing';

import { MoreMenuService } from './more-menu-service.service';

describe('MoreMenuServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoreMenuService = TestBed.get(MoreMenuService);
    expect(service).toBeTruthy();
  });
});
