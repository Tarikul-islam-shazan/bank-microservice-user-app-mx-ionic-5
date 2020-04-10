import { TestBed } from '@angular/core/testing';

import { SavingGoalService } from './saving-goal.service';

describe('SavingGoalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SavingGoalService = TestBed.get(SavingGoalService);
    expect(service).toBeTruthy();
  });
});
