import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarAsesorVentaComponent } from './actualizar-asesor-venta.component';

describe('ActualizarAsesorVentaComponent', () => {
  let component: ActualizarAsesorVentaComponent;
  let fixture: ComponentFixture<ActualizarAsesorVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarAsesorVentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarAsesorVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
