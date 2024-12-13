import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProcesarCotizacionComponent } from './modal-procesar-cotizacion.component';

describe('ModalProcesarCotizacionComponent', () => {
  let component: ModalProcesarCotizacionComponent;
  let fixture: ComponentFixture<ModalProcesarCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalProcesarCotizacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalProcesarCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
