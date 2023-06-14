import { TestBed } from '@angular/core/testing';

import { RestPasswordService } from './rest-password.service';

describe('RestPasswordService', () => {
  let service: RestPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
