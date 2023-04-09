import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDetalleComponent } from './crear-detalle.component';

describe('CrearDetalleComponent', () => {
  let component: CrearDetalleComponent;
  let fixture: ComponentFixture<CrearDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
