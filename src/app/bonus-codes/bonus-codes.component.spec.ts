import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusCodesComponent } from './bonus-codes.component';

describe('BonusCodesComponent', () => {
  let component: BonusCodesComponent;
  let fixture: ComponentFixture<BonusCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonusCodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
