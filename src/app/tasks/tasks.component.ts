import { Component, computed, inject, input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterState } from '@angular/router';


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, RouterLink],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})

export class TasksComponent {

  userId = input.required<string>(); //quiero recibir el userId (u1, u2...) de cada url http://localhost:52951/users/u1/tasks, http://localhost:52951/users/u2/tasks... Los parámetros de rutas principales no se pasan automáticamente a las rutas hijas. Por defecto, un componente solo puede obtener los parametros de ruta que pertenecen directamente a su ruta a traves de la vinculacion de entrada. Como la ruta hija quiere obtener los parametros de ruta de una ruta padre, tengo que agregar en el enrutador paramsInheritanceStrategy: 'always'. Esto asegura que los valores de los parametros de la ruta padre se inyecten en las rutas hijas. Los nombres de los parámetros  de la ruta padre y las propiedades del componente .ts deben coincidir.

  order = input<'asc' | 'desc' | undefined>() //esta propiedad tiene el nombre de order pq la clave del queryParams que hemos definido en el .html se llama order: [queryParams]="{order: 'asc'}". Estos dos nombres tienen que coincidir. Quiero recibir el valor de order de cada url http://localhost:4200/users/u1/tasks?order=asc, http://localhost:4200/users/u2/tasks?order=desc. Para conseguir esto, en el app.config.ts hemos importado withComponentInputBinding(). Esta función habilita la vinculación automática de los parámetros dinámicos de la ruta a las propiedades del componente usando decoradores de entrada (input binding).



  userTasks = input.required<Task[]>(); //Gracias a withComponentInputBinding() que está importado en los providers del app.config.ts, el parámetro dinamico userTasks definido en el app.routes.ts, se enlaza automáticamente a la propiedad  userTasks de este componente ya que tienen el mismo nombre.

}


