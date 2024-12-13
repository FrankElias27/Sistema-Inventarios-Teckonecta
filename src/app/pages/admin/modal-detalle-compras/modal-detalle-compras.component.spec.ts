import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleComprasComponent } from './modal-detalle-compras.component';

describe('ModalDetalleComprasComponent', () => {
  let component: ModalDetalleComprasComponent;
  let fixture: ComponentFixture<ModalDetalleComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDetalleComprasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDetalleComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
