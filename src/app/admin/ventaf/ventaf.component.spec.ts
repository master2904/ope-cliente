import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentafComponent } from './ventaf.component';

describe('VentafComponent', () => {
  let component: VentafComponent;
  let fixture: ComponentFixture<VentafComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentafComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
