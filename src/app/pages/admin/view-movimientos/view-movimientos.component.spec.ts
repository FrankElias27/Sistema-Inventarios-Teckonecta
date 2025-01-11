import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMovimientosComponent } from './view-movimientos.component';

describe('ViewMovimientosComponent', () => {
  let component: ViewMovimientosComponent;
  let fixture: ComponentFixture<ViewMovimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMovimientosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMovimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
