import {ComponentFixture} from "@angular/core/testing";
import {query, queryById} from "./finders";
import {DebugElement} from "@angular/core";

export function setInputValue<T> (fixture: ComponentFixture<T>, selector: string,  value: string,  withTestId: boolean = false){
  let debugElement: DebugElement;
  if (withTestId) {
    debugElement = queryById(fixture, selector);
  } else {
    debugElement = query(fixture, selector);
  }
  const nativeElement: HTMLInputElement = debugElement.nativeElement;
  nativeElement.value = value;
  nativeElement.dispatchEvent(new Event('input'));
  nativeElement.dispatchEvent(new Event('blur'))
}

export function setCheckboxValue<T> (fixture: ComponentFixture<T>, selector: string,  value: boolean,  withTestId: boolean = false){
  let debugElement: DebugElement;
  if (withTestId) {
    debugElement = queryById(fixture, selector);
  } else {
    debugElement = query(fixture, selector);
  }
  const nativeElement: HTMLInputElement = debugElement.nativeElement;
  nativeElement.checked = value;
  nativeElement.dispatchEvent(new Event('change'));
  nativeElement.dispatchEvent(new Event('blur'))
}
