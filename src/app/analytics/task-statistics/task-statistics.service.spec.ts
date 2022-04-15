import { TestBed } from '@angular/core/testing';

import { TaskStatisticsService } from './task-statistics.service';

describe('TaskStatisticsService', () => {
  let service: TaskStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
