import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosVerComponent } from './turnos-ver.component';

describe('TurnosVerComponent', () => {
  let component: TurnosVerComponent;
  let fixture: ComponentFixture<TurnosVerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosVerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
