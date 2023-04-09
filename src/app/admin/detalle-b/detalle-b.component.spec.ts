import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleBComponent } from './detalle-b.component';

describe('DetalleBComponent', () => {
  let component: DetalleBComponent;
  let fixture: ComponentFixture<DetalleBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
