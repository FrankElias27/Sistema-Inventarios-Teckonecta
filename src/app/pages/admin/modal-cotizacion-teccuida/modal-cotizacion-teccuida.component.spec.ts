import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCotizacionTeccuidaComponent } from './modal-cotizacion-teccuida.component';

describe('ModalCotizacionTeccuidaComponent', () => {
  let component: ModalCotizacionTeccuidaComponent;
  let fixture: ComponentFixture<ModalCotizacionTeccuidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCotizacionTeccuidaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCotizacionTeccuidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
