import { Component, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { type Task } from './task.model';
import { CardComponent } from '../../shared/card/card.component';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  imports: [DatePipe, CardComponent], //DatePipe: Utilizado para formatear fechas en el componente
})
export class TaskComponent {
  task = input.required<Task>(); //Se marca con el decorador input para indicar que es una propiedad de entrada del componente. Esto significa que este componente espera recibir un objeto de tipo Task como entrada desde su componente padre.
  private tasksService = inject(TasksService);

  onComplete() {
    this.tasksService.removeTask(this.task().id); //removeTask elimina una tarea de la lista basándose en el id
  }
}
