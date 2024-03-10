import { TestBed } from '@angular/core/testing';

import { RetroServiceService } from './retro-service.service';

describe('RetroServiceService', () => {
  let service: RetroServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetroServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
