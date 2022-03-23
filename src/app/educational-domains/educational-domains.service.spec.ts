import { TestBed } from '@angular/core/testing';

import { EducationalDomainsService } from './educational-domains.service';

describe('EducationalDomainsService', () => {
  let service: EducationalDomainsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducationalDomainsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
