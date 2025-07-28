import { Component } from '@angular/core';
import { ReversePipe } from './reverse.pipe';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });
  it('Should transform roma to amor', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
    const result = pipe.transform('roma');
    expect(result).toBe('amor');
  });
});

@Component({
  template: `
    <h5>{{ 'amor' | reverse }}</h5>
    <input [(ngModel)]="text" />
    <p>{{ text | reverse }}</p>
  `,
})
class HostComponent {
  text = '';
}

describe('Tests from host component', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, ReversePipe],
      imports: [FormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  it('Should h5 to be "roma"', () => {
    const h5Element = fixture.debugElement.query(By.css('h5'));
    expect(h5Element.nativeElement.textContent).toBe('roma');
  });

  it('Should apply reverse pipe when typing the input', () => {
    const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const paragraph: HTMLParagraphElement = fixture.debugElement.query(By.css('p')).nativeElement;
    
    expect(input.textContent).toBe('');

    input.value = 'roma';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    expect(paragraph.textContent).toBe('amor')

  });
});
