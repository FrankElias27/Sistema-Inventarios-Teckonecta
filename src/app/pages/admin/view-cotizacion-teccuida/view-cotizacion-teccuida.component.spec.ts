import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCotizacionTeccuidaComponent } from './view-cotizacion-teccuida.component';

describe('ViewCotizacionTeccuidaComponent', () => {
  let component: ViewCotizacionTeccuidaComponent;
  let fixture: ComponentFixture<ViewCotizacionTeccuidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCotizacionTeccuidaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCotizacionTeccuidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
