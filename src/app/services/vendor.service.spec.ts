import { TestBed, inject } from '@angular/core/testing';

import { VendorService } from './vendor.service';

describe('KioskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VendorService]
    });
  });

  it('should be created', inject([VendorService], (service: VendorService) => {
    expect(service).toBeTruthy();
  }));
});