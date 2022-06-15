import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseOptionComponent } from './license-option.component';

describe('LicenseOptionComponent', () => {
  let component: LicenseOptionComponent;
  let fixture: ComponentFixture<LicenseOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenseOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
