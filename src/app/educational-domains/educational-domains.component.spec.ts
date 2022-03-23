import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalDomainsComponent } from './educational-domains.component';

describe('EducationalDomainsComponent', () => {
  let component: EducationalDomainsComponent;
  let fixture: ComponentFixture<EducationalDomainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationalDomainsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalDomainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
