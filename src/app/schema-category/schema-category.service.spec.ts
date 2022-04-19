import { TestBed } from '@angular/core/testing';

import { SchemaCategoryService } from './schema-category.service';

describe('SchemaCategoryService', () => {
  let service: SchemaCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchemaCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
