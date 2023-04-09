import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoBComponent } from './tipo-b.component';

describe('TipoBComponent', () => {
  let component: TipoBComponent;
  let fixture: ComponentFixture<TipoBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
