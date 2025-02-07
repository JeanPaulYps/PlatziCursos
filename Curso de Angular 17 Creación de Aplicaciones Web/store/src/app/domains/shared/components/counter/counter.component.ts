import { Component, Input, signal, SimpleChange } from '@angular/core';


@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input({required: true}) duration: number = 0;
  @Input({required: true}) message: string = '';
  counter = signal(0);
  counterRef: number | undefined;

  constructor() {
    console.log('constructor');
    console.log('-'.repeat(10));
  }

  ngOnChanges (changes: SimpleChange) {
    console.log('ngOnChanges');
    console.log('-'.repeat(10));
    console.log(changes);
  }

  ngOnInit () {
    console.log('ngOnInit');
    console.log('-'.repeat(10));
    console.log('duration =>', this.duration);
    console.log('message =>', this.message);
    this.counterRef =  window.setInterval(() => {
      console.log('run interval');
      this.counter.update(counter => counter + 1);
    }, 1000)
  }

  ngAfterViewInit (){
    // After render
    // Hijos ya fueron pintados
    console.log('ngAfterViewInit');
    console.log('-'.repeat(10));
  }
  ngOnDestroy () {
    console.log('Destroy');
    console.log('-'.repeat(10));
    window.clearInterval(this.counterRef);
  }
}
