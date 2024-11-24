import { TestBed } from '@angular/core/testing';

import { LiquidationsExportService } from './liquidations-export.service';

describe('LiquidationsExportService', () => {
  let service: LiquidationsExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiquidationsExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
