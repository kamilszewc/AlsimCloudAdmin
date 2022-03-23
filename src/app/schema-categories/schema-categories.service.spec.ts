import { TestBed } from '@angular/core/testing';

import { SchemaCategoriesService } from './schema-categories.service';

describe('SchemaCategoriesService', () => {
  let service: SchemaCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchemaCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
