import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiciosComponent } from './add-servicios.component';

describe('AddServiciosComponent', () => {
  let component: AddServiciosComponent;
  let fixture: ComponentFixture<AddServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddServiciosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
