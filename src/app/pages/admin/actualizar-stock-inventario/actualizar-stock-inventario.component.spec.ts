import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarStockInventarioComponent } from './actualizar-stock-inventario.component';

describe('ActualizarStockInventarioComponent', () => {
  let component: ActualizarStockInventarioComponent;
  let fixture: ComponentFixture<ActualizarStockInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarStockInventarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarStockInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
