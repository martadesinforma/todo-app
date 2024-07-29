import { Component, computed, inject, input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  userId = input.required<string>(); //quiero recibir el userId (u1, u2...) de cada url http://localhost:52951/users/u1/tasks, http://localhost:52951/users/u2/tasks... Los parámetros de rutas principales no se pasan automáticamente a las rutas hijas. Por defecto, un componente solo puede obtener los parametros de ruta que pertenecen directamente a su ruta a traves de la vinculacion de entrada. Como la ruta hija quiere obtener los parametros de ruta de una ruta padre, tengo que agregar en el enrutador paramsInheritanceStrategy: 'always'. Esto asegura que los valores de los parametros de la ruta padre se inyecten en las rutas hijas. Los nombres de los parámetros  de la ruta padre y las propiedades del componente .ts deben coincidir.
  private tasksService = inject(TasksService);

  userTasks = computed(()=> this.tasksService.allTasks().filter((task)=> task.userId === this.userId())) //userTasks contiene una lista de tareas filtradas. Solo se incluyen las tareas cuyo userId coincide con el userId del usuario actual.
}
