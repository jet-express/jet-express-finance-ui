import { TestBed, inject } from '@angular/core/testing';

import { CashInService } from './cash-in.service';

describe('BudgetingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CashInService]
    });
  });

  it('should be created', inject([CashInService], (service: CashInService) => {
    expect(service).toBeTruthy();
  }));
});