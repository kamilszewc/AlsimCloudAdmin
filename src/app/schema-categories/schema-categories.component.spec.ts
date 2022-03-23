import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaCategoriesComponent } from './schema-categories.component';

describe('SchemaCategoriesComponent', () => {
  let component: SchemaCategoriesComponent;
  let fixture: ComponentFixture<SchemaCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemaCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
