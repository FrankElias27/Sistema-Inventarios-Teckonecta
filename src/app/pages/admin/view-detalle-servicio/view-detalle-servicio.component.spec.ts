import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetalleServicioComponent } from './view-detalle-servicio.component';

describe('ViewDetalleServicioComponent', () => {
  let component: ViewDetalleServicioComponent;
  let fixture: ComponentFixture<ViewDetalleServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDetalleServicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDetalleServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
