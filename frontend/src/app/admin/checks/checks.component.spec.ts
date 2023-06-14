import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecksComponent } from './checks.component';

describe('ChecksComponent', () => {
  let component: ChecksComponent;
  let fixture: ComponentFixture<ChecksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChecksComponent]
    });
    fixture = TestBed.createComponent(ChecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
