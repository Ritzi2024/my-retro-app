import { TestBed } from '@angular/core/testing';


describe('RetroServiceService', () => {
  let service: RetroServiceServic;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetroServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
