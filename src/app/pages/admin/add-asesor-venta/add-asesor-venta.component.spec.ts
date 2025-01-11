import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAsesorVentaComponent } from './add-asesor-venta.component';

describe('AddAsesorVentaComponent', () => {
  let component: AddAsesorVentaComponent;
  let fixture: ComponentFixture<AddAsesorVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAsesorVentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAsesorVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
