import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleFComponent } from './detalle-f.component';

describe('DetalleFComponent', () => {
  let component: DetalleFComponent;
  let fixture: ComponentFixture<DetalleFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleFComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
