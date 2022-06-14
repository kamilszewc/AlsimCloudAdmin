import { TestBed } from '@angular/core/testing';

import { LicenseTypesService } from './license-types.service';

describe('LicenseTypesService', () => {
  let service: LicenseTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LicenseTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
