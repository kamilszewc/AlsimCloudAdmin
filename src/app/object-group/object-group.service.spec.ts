import { TestBed } from '@angular/core/testing';

import { ObjectGroupService } from './object-group.service';

describe('ObjectGroupService', () => {
  let service: ObjectGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
