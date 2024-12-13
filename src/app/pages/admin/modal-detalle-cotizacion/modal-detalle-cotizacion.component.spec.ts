import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleCotizacionComponent } from './modal-detalle-cotizacion.component';

describe('ModalDetalleCotizacionComponent', () => {
  let component: ModalDetalleCotizacionComponent;
  let fixture: ComponentFixture<ModalDetalleCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDetalleCotizacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDetalleCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
