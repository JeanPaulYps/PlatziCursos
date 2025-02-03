import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  Injector,
  signal,
} from '@angular/core';
import { Task } from '../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Instalar angular CLI',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'Crear proyecto',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'Crear componentes',
      completed: true,
    },
  ]);

  taskControl = new FormControl('', {
    nonNullable: true,

    validators: [
      Validators.required,
      // Validators.pattern(/^(?!\s*$).+/)
    ],
  });

  filter = signal('all');
  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'pending') {
      return tasks.filter((task) => !task.completed);
    } else if (filter === 'completed') {
      return tasks.filter((task) => task.completed);
    } else {
      return tasks;
    }
  });

  constructor() {
    effect(() => {
      const tasks = this.tasks();
      localStorage.setItem('tasks', JSON.stringify(tasks));
      console.log('Run effect');
    });
  }

  ngOnInit() {
    const localStorageTasks = localStorage.getItem('tasks');
    const tasks = localStorageTasks ? JSON.parse(localStorageTasks) : [];
    this.tasks.set(tasks);
  }

  changeHandler(event: Event) {
    if (
      this.taskControl.value.trim().length === 0 ||
      this.taskControl.invalid
    ) {
      return;
    }

    this.addTask(this.taskControl.value);
    this.taskControl.reset();
  }

  addTask(title: string) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  updateTask(index: number) {
    this.tasks.update((tasks) =>
      tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      })
    );
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) =>
      tasks.filter((_, position) => position != index)
    );
  }

  updateTaskEditingMode(index: number) {
    this.tasks.update((tasks) =>
      tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            editing: task.editing === undefined ? true : !task.editing,
          };
        }
        return {
          ...task,
          editing: false,
        };
      })
    );
  }

  updateTaskText(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    this.tasks.update((tasks) =>
      tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            title: input.value,
            editing: false,
          };
        }
        return {
          ...task,
          editing: false,
        };
      })
    );
  }

  changeFilter(filter: string) {
    this.filter.set(filter);
  }
}
