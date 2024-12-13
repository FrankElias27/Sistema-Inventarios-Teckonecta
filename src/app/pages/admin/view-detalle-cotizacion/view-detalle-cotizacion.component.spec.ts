import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetalleCotizacionComponent } from './view-detalle-cotizacion.component';

describe('ViewDetalleCotizacionComponent', () => {
  let component: ViewDetalleCotizacionComponent;
  let fixture: ComponentFixture<ViewDetalleCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDetalleCotizacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDetalleCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
