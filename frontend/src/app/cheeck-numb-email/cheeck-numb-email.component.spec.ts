import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheeckNumbEmailComponent } from './cheeck-numb-email.component';

describe('CheeckNumbEmailComponent', () => {
  let component: CheeckNumbEmailComponent;
  let fixture: ComponentFixture<CheeckNumbEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheeckNumbEmailComponent]
    });
    fixture = TestBed.createComponent(CheeckNumbEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
