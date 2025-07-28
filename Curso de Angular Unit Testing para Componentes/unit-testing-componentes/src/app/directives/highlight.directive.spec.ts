import { Component } from '@angular/core';
import { HighlightDirective } from './highlight.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  template: `
    <h5 id="title" highlight>Hay un valor</h5>
    <h5 highlight="yellow">yellow</h5>
    <p highlight="blue">Parrafo</p>
    <p>Otro parrafo</p>
    <input [(ngModel)]="color" [highlight]="color" />
  `,
})
class HostComponent {
  color = 'pink';
}

describe('HighlightDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, HighlightDirective],
      imports: [FormsModule]
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should have three highlight elements', () => {
    const debug = fixture.debugElement;
    const highlightedElements = debug.queryAll(By.directive(HighlightDirective));
    const notHighlighted = debug.queryAll(By.css('*:not([highlight])'));
    expect(highlightedElements.length).toBe(4);
    expect(notHighlighted.length).toBe(2);
  });
  
  it('Should match background color', () => {
    const debug = fixture.debugElement;
    const highlightedElements = debug.queryAll(By.directive(HighlightDirective));
    expect(highlightedElements[0].nativeElement.style.backgroundColor).toBe('gray');
    expect(highlightedElements[1].nativeElement.style.backgroundColor).toBe('yellow');
    expect(highlightedElements[2].nativeElement.style.backgroundColor).toBe('blue');
  });

  it('Should h5.title to be default color', () => {
    const debug = fixture.debugElement;
    const title = debug.query(By.css('#title'));
    const directive = title.injector.get(HighlightDirective);
    expect(title.nativeElement.style.backgroundColor).toBe(directive.defaultColor);
  });

  it('should bind <input> and change the background color', () => {
    const debug = fixture.debugElement;
    const input = debug.query(By.css('input'));
    const inputElement: HTMLInputElement = input.nativeElement;
    expect(inputElement.style.backgroundColor).toEqual('pink');
    
    inputElement.value = 'red';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(inputElement.style.backgroundColor).toEqual('red');
    expect(component.color).toBe('red');

  });

});
