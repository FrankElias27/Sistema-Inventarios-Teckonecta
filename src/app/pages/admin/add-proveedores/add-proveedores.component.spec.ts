import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProveedoresComponent } from './add-proveedores.component';

describe('AddProveedoresComponent', () => {
  let component: AddProveedoresComponent;
  let fixture: ComponentFixture<AddProveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProveedoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
