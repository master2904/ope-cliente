import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProblemaComponent } from './editar-problema.component';

describe('EditarProblemaComponent', () => {
  let component: EditarProblemaComponent;
  let fixture: ComponentFixture<EditarProblemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarProblemaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarProblemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
