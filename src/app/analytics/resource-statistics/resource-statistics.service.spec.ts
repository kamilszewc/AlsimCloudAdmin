import { TestBed } from '@angular/core/testing';

import { ResourceStatisticsService } from './resource-statistics.service';

describe('ResourceStatisticsService', () => {
  let service: ResourceStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
