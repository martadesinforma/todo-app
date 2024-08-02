import { Component, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { type Task } from './task.model';
import { CardComponent } from '../../shared/card/card.component';
import { TasksService } from '../tasks.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);


  // Esta función elimina la tarea de la lista y navega a la misma ruta para recargar la página o actualizar la vista.
  onComplete() {
    this.tasksService.removeTask(this.task().id); //removeTask elimina una tarea de la lista basándose en el id
    this.router.navigate(['./'], {//esta navegando a la misma ruta.
      relativeTo: this.activatedRoute, // Indica que la navegación debe ser relativa a la ruta actualmente activada (activatedRoute).
      onSameUrlNavigation: 'reload', //Indica que si la navegación es a la misma URL, la página debe recargarse (reload).
      queryParamsHandling: 'preserve', //Indica que se deben conservar los parámetros de consulta actuales durante la navegación. Esto significa que cualquier parámetro de consulta en la URL actual se mantendrá después de la navegación.
    })
  }
}
