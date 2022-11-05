import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarConsursoComponent } from './editar-consurso.component';

describe('EditarConsursoComponent', () => {
  let component: EditarConsursoComponent;
  let fixture: ComponentFixture<EditarConsursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarConsursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarConsursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
