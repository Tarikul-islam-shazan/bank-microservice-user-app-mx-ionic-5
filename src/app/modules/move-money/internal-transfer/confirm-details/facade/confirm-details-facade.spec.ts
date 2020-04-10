import { TestBed } from '@angular/core/testing';

import { ConfirmDetailsFacade } from './facade';

describe('ConfirmDetailsFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfirmDetailsFacade = TestBed.get(ConfirmDetailsFacade);
    expect(service).toBeTruthy();
  });
});
