import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValueService {
  private value = 'my value';
  constructor() { 
    
  }

  getValue () {
    return this.value;
  }

  setValue(value: string) {
    this.value = value;
  }

  getPromisedValue() {
    return Promise.resolve(this.value);
  }

  getObservableValue () {
    return of(this.value);
  }


}
