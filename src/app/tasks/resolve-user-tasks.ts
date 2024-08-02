
import {  inject } from '@angular/core';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterState } from '@angular/router';

export const resolveUserTasks: ResolveFn<Task[]> = (ActivatedRouteSnapshot, RouterState) => {

  const order = ActivatedRouteSnapshot.queryParams['order']

  const tasksService = inject(TasksService);

  const tasks = tasksService
    .allTasks()
    .filter((task) => task.userId === ActivatedRouteSnapshot.paramMap.get('userId')) //resolveUserTasks contiene una lista de tareas filtradas. Solo se incluyen las tareas cuyo userId coincide con el userId del usuario actual.
  if (order && order === 'asc') {
    tasks.sort((a, b) => (a.id > b.id ? 1 : -1)) //Si el orden no es descendente (por lo tanto, es ascendente), y la id de la tarea a es mayor que la id de la tarea b, coloca b antes que a devolviendo 1. De lo contrario, coloca a antes que b devolviendo -1.
  } else {
    tasks.sort((a, b) => (a.id > b.id ? -1 : 1)) //Si el orden es descendente y la id de la tarea a es mayor que la id de la tarea b, coloca a antes que b devolviendo -1. De lo contrario, coloca b antes que a devolviendo 1. El id de cada tarea es único basado en el timestamp actual
  }
  return tasks.length ? tasks : [];
}
