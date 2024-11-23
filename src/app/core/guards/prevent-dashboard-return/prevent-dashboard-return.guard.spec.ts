import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { preventDashboardReturnGuard } from './prevent-dashboard-return.guard';

describe('preventDashboardReturnGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => preventDashboardReturnGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
