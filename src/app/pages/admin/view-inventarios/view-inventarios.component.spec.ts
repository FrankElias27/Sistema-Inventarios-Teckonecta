import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInventariosComponent } from './view-inventarios.component';

describe('ViewInventariosComponent', () => {
  let component: ViewInventariosComponent;
  let fixture: ComponentFixture<ViewInventariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInventariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewInventariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
