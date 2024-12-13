import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVentasComponent } from './add-ventas.component';

describe('AddVentasComponent', () => {
  let component: AddVentasComponent;
  let fixture: ComponentFixture<AddVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVentasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
