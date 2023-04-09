import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoFComponent } from './tipo-f.component';

describe('TipoFComponent', () => {
  let component: TipoFComponent;
  let fixture: ComponentFixture<TipoFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoFComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
