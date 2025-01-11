import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExistenciaComponent } from './add-existencia.component';

describe('AddExistenciaComponent', () => {
  let component: AddExistenciaComponent;
  let fixture: ComponentFixture<AddExistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExistenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
