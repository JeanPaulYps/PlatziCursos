import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should display nam nicolas', () => {
    component.person = new Person('Nicolas', 'Molina', 28, 89, 1.4);
    expect(component.person.name).toBe('Nicolas');
  })

  it('Should have <h3> with "Hola, name of the person"', () => {
    const expectedMessage = 'Hola, Valentina'
    component.person = new Person('Valentina', 'Molina', 28, 89, 1.4);
    const debugElement: DebugElement = fixture.debugElement; 
    const header = debugElement.query(By.css('h3'));
    const nativeParagraph: HTMLElement = header.nativeElement;

    fixture.detectChanges();

    expect(nativeParagraph.textContent).toBe(expectedMessage);
  })
  it('Should have <p> with "Mi altura es:"', () => {
    component.person = new Person('Nicolas', 'Molina', 28, 89, 1.4);
    const debugElement: DebugElement = fixture.debugElement; 
    const paragraph = debugElement.query(By.css('p'));
    const nativeParagraph: HTMLElement = paragraph.nativeElement;
    
    fixture.detectChanges();

    expect(nativeParagraph.textContent).toBe('Mi altura es: 1.4');
  })

  it('Should display a text with IMC when clicked', () => {
    const expectedMessage = 'overweight level';
    component.person = new Person('Juan', 'Perez', 30, 120, 1.65);
    component.calcIMC();
    fixture.detectChanges();

    const button: HTMLElement = fixture.debugElement.query(By.css('button')).nativeElement;

    expect(button.textContent).toContain(expectedMessage);
  })
  it('Should display a text with IMC when clicked', () => {
    const expectedMessage = 'overweight level 3';
    component.person = new Person('Juan', 'Perez', 30, 120, 1.65);
    component.calcIMC();
    const button = fixture.debugElement.query(By.css('button'));
    const nativeButton: HTMLElement = button.nativeElement;
    button.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(nativeButton.textContent).toContain(expectedMessage);
  })

  it('Should raise selected event when clicked', () => {
    const expectedPerson =  new Person('Juan', 'Perez', 30, 120, 1.65);
    component.person = expectedPerson;
    const button = fixture.debugElement.query(By.css('button.btn-choose'));
    let selectedPerson: Person | undefined;
    component.onSelected.subscribe(person => {
      selectedPerson = person;
    })
    
    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(selectedPerson).toBe(selectedPerson);
  });
});

@Component({
  template: '<app-person [person]="person" (onSelected)="onSelected($event)"></app-person>'
})
class HostComponent {
  person = new Person('Santiago', 'Molina', 12, 40, 1.5);
  selectedPerson: Person | undefined;

  onSelected(newPerson: Person) {
    this.selectedPerson = newPerson;
  }

}

describe('Test the component from host Component', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostComponent, PersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should show the name of the person', () => {
    const expectedName = 'Santiago';
    const personDebug = fixture.debugElement.query(By.css('app-person h3'));
    const h3Element = personDebug.nativeElement;

    fixture.detectChanges();

    expect(h3Element.textContent).toContain(expectedName);
  })

    it('Should return selected Person when clicked', () => {

    const button = fixture.debugElement.query(By.css('.btn-choose'));
    
    fixture.detectChanges();
    button.triggerEventHandler('click', null);
    

    expect(component.selectedPerson).toEqual(component.person);
  })

});
