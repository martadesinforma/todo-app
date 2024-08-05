import { Routes } from '@angular/router';

import { TasksComponent } from '../tasks/tasks.component';
import { NewTaskComponent } from '../tasks/new-task/new-task.component';
import { resolveUserTasks } from '../tasks/resolve-user-tasks';
import { canLeaveEditPage } from '../tasks/tasks.guard';

export const routes: Routes = [
  {
    path: '', //path: '' significa cuando no se especifica ninguna subruta, es decir,  cuando se accede a la ruta users/:userId sin ninguna ruta hija adicional
    redirectTo:'tasks',
    pathMatch: 'full' //asegura que la redirección a tasks solo ocurra si no hay ningún otro segmento en la URL después de users/:userId.
  },
  {
    path: 'tasks', //esto significa que cuando la URL coincide con http://localhost:52951/users/u1/tasks, http://localhost:52951/users/u2/tasks... Angular debe mostrar el TasksComponent
    component: TasksComponent, //Sin embargo, Angular necesita saber dónde en el DOM debe insertar este componente cuando la url sea  http://localhost:52951/users/u1/tasks, http://localhost:52951/users/u2/tasks...  Aquí es donde entra en juego router-outlet. En este caso lo vamos a insertar en el user-tasks.component.html para que se muestre en la pagina padre
    resolve: { //la propiedad resolve se utiliza para pre-cargar datos necesarios antes de que se active una ruta y se muestre el componente correspondiente. Esta propiedad se configura con resolvers, que son servicios o funciones que obtienen estos datos.
      userTasks :  resolveUserTasks, //el valor debe apuntar a la funcion de resolución pero sin ser llamada. Esta función de resolucion necesita parámetros de consulta (queryParams) para obtener las tareas del usuario seleccionado. El comportamiento por defecto de Angular es que las funciones de resolución solo se vuelven a ejecutar si cambia un parámetro de la ruta, pero no si cambia un queryParam (parámetro de consulta). Sin embargo, este comportamiento se puede cambiar añadiendo otra propiedad a la configuración de la ruta llamada runGuardsAndResolvers y asignándole como valor 'paramsOrQueryParamsChange' o 'always
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'tasks/new', //esto significa que cuando la URL coincide con http://localhost:52951/users/u1/tasks/new, http://localhost:52951/users/u2/tasks/new... Angular debe mostrar el NewTaskComponent
    component: NewTaskComponent, //Sin embargo, Angular necesita saber dónde en el DOM debe insertar este componente cuando la url sea  http://localhost:52951/users/u1/tasks/new, http://localhost:52951/users/u2/tasks/new...  Aquí es donde entra en juego router-outlet. En este caso lo vamos a insertar en el user-tasks.component.html para que se muestre en la pagina padre
    canDeactivate: [canLeaveEditPage]//Es un guard. La idea detrás de poder desactivar una ruta es que podemos controlar si a un usuario se le permite salir de una página o no
  }
];
