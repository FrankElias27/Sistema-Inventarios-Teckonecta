import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCotizacionesComponent } from './view-cotizaciones.component';

describe('ViewCotizacionesComponent', () => {
  let component: ViewCotizacionesComponent;
  let fixture: ComponentFixture<ViewCotizacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCotizacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCotizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
