import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdHomeSectionComponent } from './third-home-section.component';

describe('ThirdHomeSectionComponent', () => {
  let component: ThirdHomeSectionComponent;
  let fixture: ComponentFixture<ThirdHomeSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThirdHomeSectionComponent]
    });
    fixture = TestBed.createComponent(ThirdHomeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
