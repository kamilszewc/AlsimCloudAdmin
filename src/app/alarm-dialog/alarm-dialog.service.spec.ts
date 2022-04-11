import { TestBed } from '@angular/core/testing';

import { AlarmDialogService } from './alarm-dialog.service';

describe('AlarmDialogService', () => {
  let service: AlarmDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlarmDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
