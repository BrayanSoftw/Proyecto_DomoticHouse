import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('authGuard', () => {
  let mockAuthService: jasmine.SpyObj<AuthService>;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    mockAuthService.isLoggedIn.and.returnValue(true); // o false según el caso

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    });
  });

  it('should allow access when logged in', () => {
    mockAuthService.isLoggedIn.and.returnValue(true);
    const result = executeGuard({} as any, {} as any);
    expect(result).toBeTrue();
  });

  it('should deny access when not logged in', () => {
    mockAuthService.isLoggedIn.and.returnValue(false);
    const result = executeGuard({} as any, {} as any);
    expect(result).toBeFalse();
  });
});
