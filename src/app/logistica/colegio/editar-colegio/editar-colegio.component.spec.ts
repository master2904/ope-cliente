import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarColegioComponent } from './editar-colegio.component';

describe('EditarColegioComponent', () => {
  let component: EditarColegioComponent;
  let fixture: ComponentFixture<EditarColegioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarColegioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarColegioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
