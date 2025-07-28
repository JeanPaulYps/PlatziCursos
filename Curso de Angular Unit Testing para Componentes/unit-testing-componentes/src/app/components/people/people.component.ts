import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  people: Person[] = [
    new Person('Nicolas', 'Molina', 28, 70, 1.4),
    new Person('Valentina', 'Molina', 20, 50, 1.5)
  ]
  selectedPerson: Person | null = null;

  constructor() { }

  ngOnInit(): void {}

  choose(person: Person) {
      this.selectedPerson = person;
  }

}
