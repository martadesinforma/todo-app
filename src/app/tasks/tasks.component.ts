import { Component, computed, inject, input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, RouterLink],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  userId = input.required<string>(); //quiero recibir el userId (u1, u2...) de cada url http://localhost:52951/users/u1/tasks, http://localhost:52951/users/u2/tasks... Los parámetros de rutas principales no se pasan automáticamente a las rutas hijas. Por defecto, un componente solo puede obtener los parametros de ruta que pertenecen directamente a su ruta a traves de la vinculacion de entrada. Como la ruta hija quiere obtener los parametros de ruta de una ruta padre, tengo que agregar en el enrutador paramsInheritanceStrategy: 'always'. Esto asegura que los valores de los parametros de la ruta padre se inyecten en las rutas hijas. Los nombres de los parámetros  de la ruta padre y las propiedades del componente .ts deben coincidir.
  order = input<'asc'|'desc'>() //esta propiedad tiene el nombre de order pq la clave del queryParams que hemos definido en el .ts se llama order: [queryParams]="{order: 'asc'}". Estos dos nombres tienen que coincidir. Quiero recibir el valor de order de cada url http://localhost:4200/users/u1/tasks?order=asc
  private tasksService = inject(TasksService);

  userTasks = computed(()=> this.tasksService.allTasks()
    .filter((task)=> task.userId === this.userId()) //userTasks contiene una lista de tareas filtradas. Solo se incluyen las tareas cuyo userId coincide con el userId del usuario actual.
    .sort((a,b) => { //Ordena la lista de tareas filtradas por su id.
      if(this.order() === 'desc') {
        return a.id > b.id ? -1 : 1; //Si el orden es descendente y la id de la tarea a es mayor que la id de la tarea b, coloca a antes que b devolviendo -1. De lo contrario, coloca b antes que a devolviendo 1. El id de cada tarea es único basado en el timestamp actual
      } else {
        return a.id > b.id ? 1 : -1; //Si el orden no es descendente (por lo tanto, es ascendente), y la id de la tarea a es mayor que la id de la tarea b, coloca b antes que a devolviendo 1. De lo contrario, coloca a antes que b devolviendo -1.
      }
    })

  )
}
