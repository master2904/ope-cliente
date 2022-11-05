import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavOutComponent } from './nav-out.component';

describe('NavOutComponent', () => {
  let component: NavOutComponent;
  let fixture: ComponentFixture<NavOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
