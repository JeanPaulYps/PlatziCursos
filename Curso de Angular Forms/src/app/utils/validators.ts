import {AbstractControl} from '@angular/forms';
import {CategoryService} from '../core/services/categories.service';
import {map} from 'rxjs/operators';

export class MyValidators {

  static isPriceValid(control: AbstractControl) {
    const value = control.value;
    console.log(value);
    if (value > 10000) {
      return {price_invalid: true};
    }
    return null;
  }

  static validatePassword(control: AbstractControl) {
    const value = control.value;
    console.log(value);
    const valueArray = [...value];
    const hasANumber = valueArray.some(character => MyValidators.isNumber(character));
    if (!hasANumber) {
      return {invalid_password: true};
      return null;
    }
  }

  static isNumber(value: string) {
    return !isNaN(parseInt(value, 10));
  }

  static matchPasswords(control: AbstractControl) {
    const password = control.get('password')?.value || '';
    const confirmPassword = control.get('confirmPassword')?.value || '';
    if (password === confirmPassword) {
      return null;
    }
    return {
      match_password: true
    };
  }

  static validateCategory(categoryService: CategoryService) {
    return (control: AbstractControl) => {
      const value = control.value;
      return categoryService.checkCategory(value).pipe(
        map(isAvailable => {
          if (isAvailable) {
            return null;
          }
          return { not_available: true };
        })
      );
    };
  }
}
