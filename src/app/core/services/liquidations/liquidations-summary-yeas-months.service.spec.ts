import { TestBed } from '@angular/core/testing';

import { LiquidationsSummaryYeasMonthsService } from './liquidations-summary-yeas-months.service';

describe('LiquidationsSummaryYeasMonthsService', () => {
  let service: LiquidationsSummaryYeasMonthsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiquidationsSummaryYeasMonthsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
