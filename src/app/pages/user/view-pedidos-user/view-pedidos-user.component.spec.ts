import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPedidosUserComponent } from './view-pedidos-user.component';

describe('ViewPedidosUserComponent', () => {
  let component: ViewPedidosUserComponent;
  let fixture: ComponentFixture<ViewPedidosUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPedidosUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPedidosUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
