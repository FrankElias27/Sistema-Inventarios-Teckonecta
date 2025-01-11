import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExistenciasComponent } from './view-existencias.component';

describe('ViewExistenciasComponent', () => {
  let component: ViewExistenciasComponent;
  let fixture: ComponentFixture<ViewExistenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewExistenciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewExistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
