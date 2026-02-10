import {FormControl, FormGroup} from "@angular/forms";
import {MyValidators} from "./validators";
import {UsersService} from "../services/user.service";
import {mockObservable} from "../testing";


describe('Tests for MyValidators', () => {
  describe('Test for validPassword', () => {
    it('should return null when password is right', () => {
        const control = new FormControl();
        control.setValue('nicolas123');
        const rta = MyValidators.validPassword(control);
        expect(rta).toBeNull();
    });

    it('should return true when password is wrong', () => {
      const control = new FormControl();
      control.setValue('aaabbbccc');
      const rta = MyValidators.validPassword(control);
      expect(rta?.invalid_password).toBeTrue();
    });
  });

  describe('Test for matchPasswords', () => {
    it('should return null', () => {
      const group = new FormGroup({
        password: new FormControl('123456'),
        confirmPassword: new FormControl('123456'),
      })

      const rta = MyValidators.matchPasswords(group);

      expect(rta).toBeNull();
    });

    it('should return object with error', () => {
      const group = new FormGroup({
        password: new FormControl('123456'),
        confirmPassword: new FormControl('123456242141'),
      })

      const rta = MyValidators.matchPasswords(group);

      expect(rta?.match_password).toBeTrue();
    });

    it('should return object with error', () => {
      const group = new FormGroup({
        other: new FormControl('123456'),
        other1: new FormControl('123456242141'),
      })

      const matchPasswordFunction = () => MyValidators.matchPasswords(group)
      expect(matchPasswordFunction).toThrow(new Error('matchPasswords: fields not found'))

    });
  })

  describe('Test for match passwords', () => {
    it('should return null with valid email', (doneFn) => {
      const userService: jasmine.SpyObj<UsersService> = jasmine.createSpyObj('UsersService', [ 'isAvailableByEmail']);
      const control = new FormControl('nico@email.com');

      userService.isAvailableByEmail.and.returnValue(mockObservable({
        isAvailable: true
      }))
      const validation = MyValidators.validateEmailAsync(userService);

      validation(control).subscribe(rta => {
        expect(rta).toBeNull();
        doneFn();
      })
    });

  });
})
