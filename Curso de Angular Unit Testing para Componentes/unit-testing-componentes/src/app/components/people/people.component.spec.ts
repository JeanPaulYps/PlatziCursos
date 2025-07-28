import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleComponent } from './people.component';
import { PersonComponent } from '../person/person.component';
import { Person } from 'src/app/models/person.model';
import { By } from '@angular/platform-browser';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleComponent, PersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have a list app-person components', () => {
    component.people = [
      new Person('Nicolas', 'Molina', 28, 70, 1.4),
      new Person('Valentina', 'Molina', 20, 50, 1.5),
      new Person('Sanitago', 'Molina', 12, 2, 1.5)
    ];

    fixture.detectChanges();

    const debugElement = fixture.debugElement.queryAll(By.css('app-person'));
    expect(debugElement.length).toBe(3)
  });

  it('Should show the selected person', () => {
    component.people = [
      new Person('Nicolas', 'Molina', 28, 70, 1.4),
      new Person('Valentina', 'Molina', 20, 50, 1.5),
      new Person('Sanitago', 'Molina', 12, 2, 1.5)
    ];

     const [chooseButton] = fixture.debugElement.queryAll(By.css('button.btn-choose'));
     chooseButton.triggerEventHandler('click', null);
     fixture.detectChanges();

     const [name, age] = fixture.debugElement.queryAll(By.css('li'));
     expect(name.nativeElement.textContent).toContain('Nicolas');
     expect(age.nativeElement.textContent).toContain('28')

  });
});
