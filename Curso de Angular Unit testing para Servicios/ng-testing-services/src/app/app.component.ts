import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Calculator } from './calculator';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-testing-services';
  
  ngOnInit () {
    const calculator = new Calculator();
    const rta = calculator.multiply(3,3);
    console.log(rta);
    
  }
}
