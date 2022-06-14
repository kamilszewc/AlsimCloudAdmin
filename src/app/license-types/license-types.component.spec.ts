import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseTypesComponent } from './license-types.component';

describe('LicenseTypesComponent', () => {
  let component: LicenseTypesComponent;
  let fixture: ComponentFixture<LicenseTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenseTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
