import { TestBed } from '@angular/core/testing';

import { UserStatisticsService } from './user-statistics.service';

describe('AnalyticsService', () => {
  let service: UserStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
