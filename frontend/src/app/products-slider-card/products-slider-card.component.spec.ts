import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSliderCardComponent } from './products-slider-card.component';

describe('ProductsSliderCardComponent', () => {
  let component: ProductsSliderCardComponent;
  let fixture: ComponentFixture<ProductsSliderCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsSliderCardComponent]
    });
    fixture = TestBed.createComponent(ProductsSliderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
