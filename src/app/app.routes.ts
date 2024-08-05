import { Routes } from '@angular/router';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {  UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { resolveUserName } from './users/resolve-user-name';
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
    loadChildren: ()=> import('./users/users.routes').then(module=> module.routes)
  },
  // si cuando ingresas una URL que no existe, tu aplicación redirige a la url base http://localhost:4200, es porque no tienes una ruta que maneje URLs no definidas. Debes agregar una ruta comodín (path: '**') al final de tu configuración de rutas para manejar estas URLs no definidas:
  {
    path: '**', //es una ruta comodín que se usa para capturar cualquier URL que no coincida con ninguna de las rutas definidas anteriormente en la configuración de rutas de Angular.
    component:NotFoundComponent //Angular necesita saber dónde en el DOM debe insertar este componente cuando la url sea invalida. Aquí es donde entra en juego router-outlet. En este caso lo vamos a insertar en el app.component.html para que se muestre en la pagina principal.
  }
];
