import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaModalComprasComponent } from './ventana-modal-compras.component';

describe('VentanaModalComprasComponent', () => {
  let component: VentanaModalComprasComponent;
  let fixture: ComponentFixture<VentanaModalComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentanaModalComprasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentanaModalComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
