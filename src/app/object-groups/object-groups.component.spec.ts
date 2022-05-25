import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectGroupsComponent } from './object-groups.component';

describe('ObjectsComponent', () => {
  let component: ObjectGroupsComponent;
  let fixture: ComponentFixture<ObjectGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
