import { TestBed } from '@angular/core/testing';

import { BiometricAuthenticationService } from './biometric-authentication.service';

describe('BiometricAuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BiometricAuthenticationService = TestBed.get(BiometricAuthenticationService);
    expect(service).toBeTruthy();
  });
});
