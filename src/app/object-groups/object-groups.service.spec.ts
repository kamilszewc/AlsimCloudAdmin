import { TestBed } from '@angular/core/testing';

import { ObjectGroupsService } from './object-groups.service';

describe('ObjectsService', () => {
  let service: ObjectGroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectGroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
