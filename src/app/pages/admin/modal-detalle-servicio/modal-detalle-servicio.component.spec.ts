import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleServicioComponent } from './modal-detalle-servicio.component';

describe('ModalDetalleServicioComponent', () => {
  let component: ModalDetalleServicioComponent;
  let fixture: ComponentFixture<ModalDetalleServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDetalleServicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDetalleServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
