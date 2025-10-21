import { TestBed } from "@angular/core/testing";
import { AuthGuard } from "./auth.guard";
import { TokenService } from "../services/token.service";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { fakeActivatedRouteSnapshot, fakeRouterStateSnapshot, mockObservable } from "src/testing";
import { generateOneUser } from "../models/user.mock";
import { of } from "rxjs";

fdescribe('Test for AuthGuard', () => {
  let guard: AuthGuard;
  let tokenService: jasmine.SpyObj<TokenService>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  
  beforeEach(() => {

    const tokenServiceSpy = jasmine.createSpyObj('TokenService', ['getToken']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getUser']);
    const routerServiceSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [ 
        AuthGuard,
        {
          provide: TokenService,
          useValue: tokenServiceSpy
        },
        {
          provide: AuthService,
          useValue: authServiceSpy
        },
        {
          provide: Router,
          useValue: routerServiceSpy
        }
      ]
    })
    guard = TestBed.inject(AuthGuard);
    // tokenService = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
    tokenService = tokenServiceSpy;
    // authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    authService = authServiceSpy;
    // router  = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    router = routerServiceSpy;
  })

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });


  it('should return true with session', (done) => {
    const activatedRoute = fakeActivatedRouteSnapshot({});
    const routerSnapshot = fakeRouterStateSnapshot({});
    
    const mockUser = generateOneUser();
    authService.getUser.and.returnValue(of(mockUser));

    guard.canActivate(activatedRoute, routerSnapshot).subscribe((data) => {
      expect(data).toBeTrue();
      done();
    });
  })

  it('should return false to user without session', (done) => {
    const activatedRoute = fakeActivatedRouteSnapshot({});
    const routerSnapshot = fakeRouterStateSnapshot({});
    
    authService.getUser.and.returnValue(of(null));

    guard.canActivate(activatedRoute, routerSnapshot).subscribe((data) => {
      expect(data).toBeFalse();
      expect(router.navigate).toHaveBeenCalled();
      done();
    });
  })
});