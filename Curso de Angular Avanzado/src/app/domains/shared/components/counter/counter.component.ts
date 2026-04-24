import {
  Component,
  signal,
  OnInit,
  AfterViewInit,
  OnDestroy,
  input,
  effect,
  computed,
  model, afterNextRender,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  standalone: true,
})
export class CounterComponent implements OnInit, AfterViewInit, OnDestroy {
  /*@Input({ required: true }) duration = 0;
  @Input({ required: true }) message = '';*/
  duration = input.required<number>();
  doubleDuration = computed(() => this.duration() * 2);
  $message = model.required<string>();
  counter = signal(0);
  counterRef: number | null = null;

  constructor() {
    // NO ASYNC
    // before render
    // una vez
    console.log('constructor');
    console.log('-'.repeat(10));
    effect(() => {
      if (this.duration()) {
        this.doSomething();
      }
    });

    afterNextRender(() => {
      this.counterRef = window.setInterval(() => {
        console.log('run interval');
        this.counter.update((statePrev) => statePrev + 1);
      }, 1000);
    })
  }

  ngOnInit() {
    // after render
    // una vez
    // async, then, subs
    console.log('ngOnInit');
    console.log('-'.repeat(10));
    console.log('duration =>', this.duration());
    console.log('message =>', this.$message());
  }

  ngAfterViewInit() {
    // after render
    // hijos ya fueron pintandos
    console.log('ngAfterViewInit');
    console.log('-'.repeat(10));
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    console.log('-'.repeat(10));
    if (this.counterRef) {
      window.clearInterval(this.counterRef);
    }
  }

  doSomething() {
    console.log('change duration');
    // async
  }

  setMessage() {
    this.$message.set('change');
  }
}
