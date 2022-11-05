import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearProblemaComponent } from './crear-problema.component';

describe('CrearProblemaComponent', () => {
  let component: CrearProblemaComponent;
  let fixture: ComponentFixture<CrearProblemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearProblemaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearProblemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
