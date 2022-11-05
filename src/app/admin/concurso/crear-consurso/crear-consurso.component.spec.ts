import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearConsursoComponent } from './crear-consurso.component';

describe('CrearConsursoComponent', () => {
  let component: CrearConsursoComponent;
  let fixture: ComponentFixture<CrearConsursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearConsursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearConsursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
