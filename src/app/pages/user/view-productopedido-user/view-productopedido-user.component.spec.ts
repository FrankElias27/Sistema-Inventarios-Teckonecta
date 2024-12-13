import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductopedidoUserComponent } from './view-productopedido-user.component';

describe('ViewProductopedidoUserComponent', () => {
  let component: ViewProductopedidoUserComponent;
  let fixture: ComponentFixture<ViewProductopedidoUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProductopedidoUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProductopedidoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
