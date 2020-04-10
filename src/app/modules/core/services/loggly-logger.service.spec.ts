import { TestBed } from '@angular/core/testing';

import { LogglyLoggerService } from './loggly-logger.service';

describe('LogglyLoggerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogglyLoggerService = TestBed.get(LogglyLoggerService);
    expect(service).toBeTruthy();
  });
});
