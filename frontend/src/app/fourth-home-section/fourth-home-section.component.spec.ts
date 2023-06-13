import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourthHomeSectionComponent } from './fourth-home-section.component';

describe('FourthHomeSectionComponent', () => {
  let component: FourthHomeSectionComponent;
  let fixture: ComponentFixture<FourthHomeSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FourthHomeSectionComponent]
    });
    fixture = TestBed.createComponent(FourthHomeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
