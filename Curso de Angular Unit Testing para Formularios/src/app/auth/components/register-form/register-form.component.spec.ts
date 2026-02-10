import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { RegisterFormComponent } from './register-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {UsersService} from "../../../services/user.service";
import {
  asyncData, asyncError,
  clickElement,
  clickEvent,
  getText,
  mockObservable,
  query,
  queryById, setCheckboxValue,
  setInputValue
} from "../../../testing";
import {generateOneUser} from "../../../models/user.mock";

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let userService: jasmine.SpyObj<UsersService>;

  beforeEach(async () => {
    userService = jasmine.createSpyObj('userService', ['create', 'isAvailableByEmail'])
    await TestBed.configureTestingModule({
      declarations: [ RegisterFormComponent ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: UsersService,
          useValue: userService
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    userService = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
    userService.isAvailableByEmail.and.returnValue(mockObservable({isAvailable: true}));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the emailField to be invalid', () => {
    const emailField = component.form.get('email');
    emailField?.setValue('Esto no es un correo');
    expect(emailField?.invalid).withContext('Wrong email').toBeTruthy();

    emailField?.setValue('');
    expect(emailField?.invalid).withContext('Empty').toBeTruthy();
  })

  it('should the passwordField to be invalid', () => {
    const passwordField = component.form.get('password');
    passwordField?.setValue('12345');
    expect(passwordField?.invalid).withContext('12345').toBeTruthy();

    passwordField?.setValue('assdaasasasa');
    expect(passwordField?.invalid).withContext('assdaasasasa').toBeTruthy();

    passwordField?.setValue('');
    expect(passwordField?.invalid).withContext('Empty').toBeTruthy();

    passwordField?.setValue('asadfads1sfas');
    expect(passwordField?.valid).withContext('Correct').toBeTruthy();
  })

  it('should the form invalid', () => {
    component.form.patchValue({
      name: 'Nico',
      email: 'nico@gmail.com',
      password: '122112121',
      confirmPassword: '122112121',
      checkTerms: false
    });

    expect(component.form.invalid).toBeTruthy();
  });

  it('should the email be invalid from UI', () => {
    setInputValue(fixture, 'input#email', 'esto no es un correo');

    fixture.detectChanges();

    const textError = getText(fixture, 'emailField-email');
    expect(textError).toContain("It's not a email");
  });

  it('should send the form successfully', () => {
    component.form.patchValue({
      name: 'Nico',
      email: 'nico@gmail.com',
      password: '12121212',
      confirmPassword: '12121212',
      checkTerms: true
    });
    const mockUser = generateOneUser();
    userService.create.and.returnValue(mockObservable(mockUser));

    component.register(new Event('submit'));

    expect(component.form.valid).toBeTruthy();
    expect(userService.create).toHaveBeenCalled();
  });

  it('should send the form successfully and status "loading" => "success"', fakeAsync(() => {
    component.form.patchValue({
      name: 'Nico',
      email: 'nico@gmail.com',
      password: '12121212',
      confirmPassword: '12121212',
      checkTerms: true
    });
    const mockUser = generateOneUser();
    userService.create.and.returnValue(asyncData(mockUser));

    component.register(new Event('submit'));
    expect(component.status).toBe('loading');

    tick();
    fixture.detectChanges();

    expect(component.status).toBe('success')
    expect(component.form.valid).toBeTruthy();
    expect(userService.create).toHaveBeenCalled();
  }));

  it('should send form successfully when user enter the data', fakeAsync( () => {
    setInputValue(fixture, 'input#name', 'Nico');
    setInputValue(fixture, 'input#email', 'nico@gmail.com');
    setInputValue(fixture, 'input#password', '12121212');
    setInputValue(fixture, 'input#confirmPassword', '12121212');
    setCheckboxValue(fixture, 'input#terms', true);

    const mockUser = generateOneUser();
    userService.create.and.returnValue(asyncData(mockUser));

    clickElement(fixture, 'btn-submit', true);

    tick();
    fixture.detectChanges();

    expect(component.status).toBe('success')
    expect(component.form.valid).toBeTruthy();
    expect(userService.create).toHaveBeenCalled();
  }));

  it('should detect error when user enter the data', fakeAsync( () => {
    setInputValue(fixture, 'input#name', 'Nico');
    setInputValue(fixture, 'input#email', 'nico@gmail.com');
    setInputValue(fixture, 'input#password', '12121212');
    setInputValue(fixture, 'input#confirmPassword', '12121212');
    setCheckboxValue(fixture, 'input#terms', true);

    const mockUser = generateOneUser();
    userService.create.and.returnValue(asyncError(mockUser));

    clickElement(fixture, 'btn-submit', true);

    tick();
    fixture.detectChanges();

    expect(component.status).toBe('error')
    expect(component.form.valid).toBeTruthy();
    expect(userService.create).toHaveBeenCalled();
  }));

  it('should show error when email is duplicated', () => {
    userService.isAvailableByEmail.and.returnValue(mockObservable({isAvailable: false}));
    setInputValue(fixture, 'input#email', 'nico@gmail.com');
    fixture.detectChanges();
    expect(component.emailField?.invalid).toBeTrue();
    expect(userService.isAvailableByEmail).toHaveBeenCalledWith('nico@gmail.com');

    expect(getText(fixture, 'emailField-duplicated', ) ).toBe('This email is already registered');
  });


});
