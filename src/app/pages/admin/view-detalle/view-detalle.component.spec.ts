import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetalleComponent } from './view-detalle.component';

describe('ViewDetalleComponent', () => {
  let component: ViewDetalleComponent;
  let fixture: ComponentFixture<ViewDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
