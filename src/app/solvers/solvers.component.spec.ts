import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolversComponent } from './solvers.component';

describe('SolversComponent', () => {
  let component: SolversComponent;
  let fixture: ComponentFixture<SolversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolversComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
