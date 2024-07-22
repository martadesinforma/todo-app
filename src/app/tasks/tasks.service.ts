import { Injectable, signal } from '@angular/core';

import { type NewTaskData } from './task/task.model'; //Importa una interfaz

@Injectable({ providedIn: 'root' }) // servicio que está disponible en toda la aplicación
export class TasksService {
  private tasks = signal([
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary:
        'Learn all the basic and advanced features of Angular & how to apply them.',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2024-05-31',
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Prepare issue template',
      summary:
        'Prepare and describe an issue template which will help with project management',
      dueDate: '2024-06-15',
    },
  ]);

  allTasks = this.tasks.asReadonly(); //allTasks es una propiedad pública que expone una versión de solo lectura de la señal tasks


  //Inicializa el servicio y carga datos desde localStorage si están disponibles.
  constructor() {
    const tasks = localStorage.getItem('tasks'); //Obtiene el valor almacenado en localStorage bajo la clave 'tasks'

    if (tasks) { //Verifica si se encontraron tareas en localStorage
      this.tasks.set(JSON.parse(tasks)); //Si hay tareas, las parsea desde JSON y las establece en la señal tasks. Esto actualiza el estado interno del servicio con los datos almacenados.
    }
  }


  //Agrega una nueva tarea a la lista de tareas
  addTask(taskData: NewTaskData, userId: string) {
    this.tasks.update((prevTasks) => [ // La función de actualización recibe el estado anterior (prevTasks) y devuelve una nueva lista de tareas que incluye la nueva tarea al principio de la lista.
      {
        id: new Date().getTime().toString(), //La nueva tarea se crea con un id único basado en el timestamp actual
        userId: userId,
        title: taskData.title,
        summary: taskData.summary,
        dueDate: taskData.date,
      },
      ...prevTasks,
    ]);
    this.saveTasks(); //Llama al método saveTasks para guardar las tareas en localStorage.
  }



  //Elimina una tarea de la lista basándose en el id
  removeTask(id: string) {
    this.tasks.update((prevTasks) => //Usa update para filtrar la lista de tareas y eliminar la tarea cuyo id coincida con el proporcionado.
      prevTasks.filter((task) => task.id !== id)
    );
    this.saveTasks(); //Llama al método saveTasks para actualizar localStorage con la lista de tareas actualizada.
  }



  //Guarda el estado actual de las tareas en localStorage.
  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks())); //Convierte el estado actual de tasks a JSON y lo almacena en localStorage bajo la clave 'tasks'
  }
}
