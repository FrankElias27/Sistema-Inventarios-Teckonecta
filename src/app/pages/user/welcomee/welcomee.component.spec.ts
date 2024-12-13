import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeeComponent } from './welcomee.component';

describe('WelcomeeComponent', () => {
  let component: WelcomeeComponent;
  let fixture: ComponentFixture<WelcomeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
