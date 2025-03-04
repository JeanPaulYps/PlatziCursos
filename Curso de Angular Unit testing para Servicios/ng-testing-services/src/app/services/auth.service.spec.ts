import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { AuthService } from "./auth.service";
import { ProductsService } from "./products.service";
import { TokenService } from "./token.service";
import { TestBed } from "@angular/core/testing";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { TokenInterceptor } from "../interceptors/token.interceptor";
import { Auth } from "../models/auth.model";
import { environment } from "../../environments/environment";

fdescribe('Auth service', () => {
  let authService: AuthService;
  let httpController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsService,
        provideHttpClient(),
        provideHttpClientTesting(),
        TokenService,
        AuthService,
      ],
    });
    authService = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('Should create', () => {
    expect(authService).toBeTruthy();
  });

  describe('Test for login', () => {
    it('Should return a token',  (done) => {
      const mockData: Auth= {
        access_token: '1212121'
      };
      const email = 'example@example.com';
      const password = 'sadfasf21';

      spyOn(tokenService, 'saveToken').and.callThrough();

      authService.login(email, password).subscribe((data) => {
        expect(data).toBe(mockData);
        expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
        expect(tokenService.saveToken).toHaveBeenCalledOnceWith(mockData.access_token);
        done();
      })

      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpController.expectOne(url)
      req.flush(mockData);

    })
  });
});