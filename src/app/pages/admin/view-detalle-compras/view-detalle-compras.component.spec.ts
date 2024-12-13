import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetalleComprasComponent } from './view-detalle-compras.component';

describe('ViewDetalleComprasComponent', () => {
  let component: ViewDetalleComprasComponent;
  let fixture: ComponentFixture<ViewDetalleComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDetalleComprasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDetalleComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
