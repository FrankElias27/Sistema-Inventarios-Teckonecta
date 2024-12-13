import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGenerarCotizacionComponent } from './modal-generar-cotizacion.component';

describe('ModalGenerarCotizacionComponent', () => {
  let component: ModalGenerarCotizacionComponent;
  let fixture: ComponentFixture<ModalGenerarCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalGenerarCotizacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalGenerarCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
