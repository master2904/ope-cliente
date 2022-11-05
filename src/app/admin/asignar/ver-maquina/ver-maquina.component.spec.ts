import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMaquinaComponent } from './ver-maquina.component';

describe('VerMaquinaComponent', () => {
  let component: VerMaquinaComponent;
  let fixture: ComponentFixture<VerMaquinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerMaquinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerMaquinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
