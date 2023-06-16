import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProductsCardComponent } from './all-products-card.component';

describe('AllProductsCardComponent', () => {
  let component: AllProductsCardComponent;
  let fixture: ComponentFixture<AllProductsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllProductsCardComponent]
    });
    fixture = TestBed.createComponent(AllProductsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
