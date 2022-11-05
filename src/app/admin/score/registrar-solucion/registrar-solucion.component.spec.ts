import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarSolucionComponent } from './registrar-solucion.component';

describe('RegistrarSolucionComponent', () => {
  let component: RegistrarSolucionComponent;
  let fixture: ComponentFixture<RegistrarSolucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarSolucionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarSolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
