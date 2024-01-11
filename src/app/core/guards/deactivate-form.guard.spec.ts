import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { deactivateFormGuard } from './deactivate-form.guard';

describe('deactivateFormGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => deactivateFormGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
