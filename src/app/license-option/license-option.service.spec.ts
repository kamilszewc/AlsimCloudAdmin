import { TestBed } from '@angular/core/testing';

import { LicenseOptionService } from './license-option.service';

describe('LicenseOptionService', () => {
  let service: LicenseOptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LicenseOptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
