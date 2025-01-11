import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProcesarVentaComponent } from './modal-procesar-venta.component';

describe('ModalProcesarVentaComponent', () => {
  let component: ModalProcesarVentaComponent;
  let fixture: ComponentFixture<ModalProcesarVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalProcesarVentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalProcesarVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
