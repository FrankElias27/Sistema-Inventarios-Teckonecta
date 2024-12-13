import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProveedoresComponent } from './view-proveedores.component';

describe('ViewProveedoresComponent', () => {
  let component: ViewProveedoresComponent;
  let fixture: ComponentFixture<ViewProveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProveedoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
