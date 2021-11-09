import { TestBed, inject } from '@angular/core/testing';

import { BudgetingService } from './budgeting.service';

describe('BudgetingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BudgetingService]
    });
  });

  it('should be created', inject([BudgetingService], (service: BudgetingService) => {
    expect(service).toBeTruthy();
  }));
});