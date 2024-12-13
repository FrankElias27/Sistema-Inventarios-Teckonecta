import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSalidasComponent } from './view-salidas.component';

describe('ViewSalidasComponent', () => {
  let component: ViewSalidasComponent;
  let fixture: ComponentFixture<ViewSalidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSalidasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSalidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
