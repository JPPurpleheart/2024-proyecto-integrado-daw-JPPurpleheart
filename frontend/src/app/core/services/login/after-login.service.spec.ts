import { TestBed } from '@angular/core/testing';

import { AfterLoginGuard } from './after-login.service';

describe('AfterLoginGuard', () => {
  let service: AfterLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AfterLoginGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
