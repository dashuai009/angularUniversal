import { TestBed } from '@angular/core/testing';

import { GetMDService } from './get-md.service';

describe('GetMDService', () => {
  let service: GetMDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetMDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
