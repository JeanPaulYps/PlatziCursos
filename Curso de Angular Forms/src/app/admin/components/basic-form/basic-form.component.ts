import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {
  form !: FormGroup; 

  constructor(
    private formBuilder: FormBuilder
  ) { 
    this.buildForm();
  }

  private buildForm () {
    this.form = this.formBuilder.group({
        fullName: this.formBuilder.group({
          name: ['', [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]+$')]],
          lastName: ['', [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]+$')]]
        }),
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required]],
        color: ['#fff'],
        date: [''],
        age: [18, [Validators.required, Validators.min(18), Validators.max(100)]],
        category: [''],
        tag: [''],
        agree: [false, [Validators.requiredTrue]],
        gender: [''],
        zone: ['']
      })
  }

  ngOnInit(): void {
    this.nameField?.valueChanges.subscribe(value => console.log(value))
  }

  save(event) {
    if (this.form.valid) {
      console.log(this.form.value)
    } else {
      this.form.markAllAsTouched();
    }
  }

  logNameValue () {
    console.log(this.nameField?.value);
  }

  isNameFieldValid () {
    return this.nameField?.touched && this.nameField?.valid;
  }
  
  isNameFieldInvalid () {
    return this.nameField?.touched && this.nameField?.invalid;
  }
  
  get nameField () {
    return this.form.get('fullName.name');
  }

  get lastNameField() {
    return this.form.get('fullName.lastName');
  }

  get emailField () {
    return this.form.get('email');
  }

  get phoneField () {
    return this.form.get('phone');
  }

  get colorField () {
    return this.form.get('color');
  }

  get dateField () {
    return this.form.get('date');
  }

  get ageField () {
    return this.form.get('age');
  }

  get categoryField () {
    return this.form.get('category');
  }

  get tagField () {
    return this.form.get('tag');
  }

  get agreeField () {
    return this.form.get('agree');
  }

  get genderField () {
    return this.form.get('gender');
  }

  get zoneField () {
    return this.form.get('zone');
  } 
}
