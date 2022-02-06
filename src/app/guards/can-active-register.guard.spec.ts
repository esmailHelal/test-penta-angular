import { TestBed } from '@angular/core/testing';

import { CanActiveRegisterGuard } from './can-active-register.guard';

describe('CanActiveRegisterGuard', () => {
  let guard: CanActiveRegisterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanActiveRegisterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
