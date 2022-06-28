import { TestBed } from '@angular/core/testing';

import { BonusCodesService } from './bonus-codes.service';

describe('BonusCodesService', () => {
  let service: BonusCodesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonusCodesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
