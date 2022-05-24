import { TestBed } from '@angular/core/testing';

import { SolversService } from './solvers.service';

describe('SolversService', () => {
  let service: SolversService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolversService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
