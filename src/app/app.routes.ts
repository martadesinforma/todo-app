import { Routes } from '@angular/router';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {  UserTasksComponent } from './users/user-tasks/user-tasks.component';
import {  TasksComponent } from './tasks/tasks.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { resolveUserName } from './users/resolve-user-name';
import { resolveUserTasks } from './tasks/resolve-user-tasks';
import { resolveTitle } from './users/resolve-title';

export const routes: Routes = [
  {
    path: '',//esto significa que cuando la URL coincide con http://localhost, Angular debe mostrar el NoTasksComponent.
    component: NoTaskComponent,//Sin embargo, Angular necesita saber dónde en el DOM debe insertar este componente cuando la url sea http://localhost. Aquí es donde entra en juego router-outlet. En este caso lo vamos a insertar en el app.component.html para que se muestre en la pagina principal.
    data: { /*
      La propiedad data en las rutas de Angular se utiliza para proporcionar datos estáticos que pueden ser accesibles dentro de un componente cuando se navega a una ruta específica, en este caso, dentro del componente NoTaskComponent cuando se navega a la ruta vacia http://localhost */
      message: 'Select a user to see their tasks!'
    },
    title: 'No task selected' //titulo estático que aparecerá como título de la página cuando se navegue a la ruta http://localhost
  },
  {
    path: 'users/:userId', //esto significa que cuando la URL coincide con http://localhost:52951/users/u1/tasks, http://localhost:52951/users/u2/tasks... Angular debe mostrar el UserTasksComponent. :userId es un parámetro de ruta dinámico. El valor de userId se lo estoy estabeciendo en el user.component.html al escribir [routerLink]="['/users', user().id, 'tasks]".
    component: UserTasksComponent, //Sin embargo, Angular necesita saber dónde en el DOM debe insertar este componente cuando la url sea  http://localhost:52951/users/u1/tasks, http://localhost:52951/users/u2/tasks...  Aquí es donde entra en juego router-outlet. En este caso lo vamos a insertar en el app.component.html para que se muestre en la pagina principal.
    resolve: { //la propiedad resolve se utiliza para pre-cargar datos necesarios antes de que se active una ruta y se muestre el componente correspondiente. Esta propiedad se configura con resolvers, que son servicios o funciones que obtienen estos datos.
      userName: resolveUserName //el valor debe apuntar a la funcion de resolución pero sin ser llamada
    },
    title: resolveTitle, //ESte título se establecerá dinamicamente.
    children: [
      {
        path: '', //path: '' significa cuando no se especifica ninguna subruta, es decir,  cuando se accede a la ruta users/:userId sin ninguna ruta hija adicional
        redirectTo:'tasks',
        pathMatch: 'full' //asegura que la redirección a tasks solo ocurra si no hay ningún otro segmento en la URL después de users/:userId.
      },
      {
        path: 'tasks', //esto significa que cuando la URL coincide con http://localhost:52951/users/u1/tasks, http://localhost:52951/users/u2/tasks... Angular debe mostrar el TasksComponent
        component: TasksComponent, //Sin embargo, Angular necesita saber dónde en el DOM debe insertar este componente cuando la url sea  http://localhost:52951/users/u1/tasks, http://localhost:52951/users/u2/tasks...  Aquí es donde entra en juego router-outlet. En este caso lo vamos a insertar en el user-tasks.component.html para que se muestre en la pagina padre
        resolve: { //la propiedad resolve se utiliza para pre-cargar datos necesarios antes de que se active una ruta y se muestre el componente correspondiente. Esta propiedad se configura con resolvers, que son servicios o funciones que obtienen estos datos.
          userTasks :  resolveUserTasks, //el valor debe apuntar a la funcion de resolución pero sin ser llamada. Esta función de resolucion necesita parámetros de consulta (queryParams) para obtener las tareas del usuario seleccionado. El comportamiento por defecto de Angular es que las funciones de resolución solo se vuelven a ejecutar si cambia un parámetro de la ruta, pero no si cambia un queryParam (parámetro de consulta). Sin embargo, este comportamiento se puede cambiar añadiendo otra propiedad a la configuración de la ruta llamada runGuardsAndResolvers y asignándole como valor 'paramsOrQueryParamsChange'
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
      },
      {
        path: 'tasks/new', //esto significa que cuando la URL coincide con http://localhost:52951/users/u1/tasks/new, http://localhost:52951/users/u2/tasks/new... Angular debe mostrar el NewTaskComponent
        component: NewTaskComponent, //Sin embargo, Angular necesita saber dónde en el DOM debe insertar este componente cuando la url sea  http://localhost:52951/users/u1/tasks/new, http://localhost:52951/users/u2/tasks/new...  Aquí es donde entra en juego router-outlet. En este caso lo vamos a insertar en el user-tasks.component.html para que se muestre en la pagina padre
      }
    ],

  },
  // si cuando ingresas una URL que no existe, tu aplicación redirige a la url base http://localhost:4200, es porque no tienes una ruta que maneje URLs no definidas. Debes agregar una ruta comodín (path: '**') al final de tu configuración de rutas para manejar estas URLs no definidas:
  {
    path: '**', //es una ruta comodín que se usa para capturar cualquier URL que no coincida con ninguna de las rutas definidas anteriormente en la configuración de rutas de Angular.
    component:NotFoundComponent //Angular necesita saber dónde en el DOM debe insertar este componente cuando la url sea invalida. Aquí es donde entra en juego router-outlet. En este caso lo vamos a insertar en el app.component.html para que se muestre en la pagina principal.
  }
];
