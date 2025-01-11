import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProcesarCompraComponent } from './modal-procesar-compra.component';

describe('ModalProcesarCompraComponent', () => {
  let component: ModalProcesarCompraComponent;
  let fixture: ComponentFixture<ModalProcesarCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalProcesarCompraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalProcesarCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
