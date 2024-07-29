import { Routes } from '@angular/router';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { TasksComponent } from './tasks/tasks.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',//esto significa que cuando la URL coincide con http://localhost, Angular debe mostrar el NoTasksComponent.
    component: NoTaskComponent //Sin embargo, Angular necesita saber dónde en el DOM debe insertar este componente cuando la url sea http://localhost. Aquí es donde entra en juego router-outlet. En este caso lo vamos a insertar en el app.component.html para que se muestre en la pagina principal.
  },
  {
    path: 'users/:userId', //esto significa que cuando la URL coincide con http://localhost:52951/users/u1/tasks, http://localhost:52951/users/u2/tasks... Angular debe mostrar el UserTasksComponent. :userId es un parámetro de ruta dinámico. El valor de userId se lo estoy estabeciendo en el user.component.html al escribir [routerLink]="['/users', user().id, 'tasks]".
    component: UserTasksComponent, //Sin embargo, Angular necesita saber dónde en el DOM debe insertar este componente cuando la url sea  http://localhost:52951/users/u1/tasks, http://localhost:52951/users/u2/tasks...  Aquí es donde entra en juego router-outlet. En este caso lo vamos a insertar en el app.component.html para que se muestre en la pagina principal.
    children: [
      {
        path: 'tasks', //esto significa que cuando la URL coincide con http://localhost:52951/users/u1/tasks, http://localhost:52951/users/u2/tasks... Angular debe mostrar el TasksComponent
        component: TasksComponent //Sin embargo, Angular necesita saber dónde en el DOM debe insertar este componente cuando la url sea  http://localhost:52951/users/u1/tasks, http://localhost:52951/users/u2/tasks...  Aquí es donde entra en juego router-outlet. En este caso lo vamos a insertar en el user-tasks.component.html para que se muestre en la pagina padre
      },
      {
        path: 'tasks/new', //esto significa que cuando la URL coincide con http://localhost:52951/users/u1/tasks/new, http://localhost:52951/users/u2/tasks/new... Angular debe mostrar el NewTaskComponent
        component: NewTaskComponent, //Sin embargo, Angular necesita saber dónde en el DOM debe insertar este componente cuando la url sea  http://localhost:52951/users/u1/tasks/new, http://localhost:52951/users/u2/tasks/new...  Aquí es donde entra en juego router-outlet. En este caso lo vamos a insertar en el user-tasks.component.html para que se muestre en la pagina padre
      }
    ]
  },
  // si cuando ingresas una URL que no existe, tu aplicación redirige a la url base http://localhost:4200, es porque no tienes una ruta que maneje URLs no definidas. Debes agregar una ruta comodín (path: '**') al final de tu configuración de rutas para manejar estas URLs no definidas:
  {
    path: '**', //es una ruta comodín que se usa para capturar cualquier URL que no coincida con ninguna de las rutas definidas anteriormente en la configuración de rutas de Angular.
    component:NotFoundComponent
  }
];
