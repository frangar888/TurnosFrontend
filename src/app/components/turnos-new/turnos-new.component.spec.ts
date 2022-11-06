import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosNewComponent } from './turnos-new.component';

describe('TurnosNewComponent', () => {
  let component: TurnosNewComponent;
  let fixture: ComponentFixture<TurnosNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
