import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAsesorVentaComponent } from './modal-asesor-venta.component';

describe('ModalAsesorVentaComponent', () => {
  let component: ModalAsesorVentaComponent;
  let fixture: ComponentFixture<ModalAsesorVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAsesorVentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAsesorVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
