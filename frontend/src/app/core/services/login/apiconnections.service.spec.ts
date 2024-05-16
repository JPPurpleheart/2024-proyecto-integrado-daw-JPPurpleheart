import { TestBed } from '@angular/core/testing';

import { APIConnectionsService } from './apiconnections.service';

describe('APIConnectionsService', () => {
  let service: APIConnectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIConnectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
