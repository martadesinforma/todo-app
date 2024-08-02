import { Component, inject, input, signal } from '@angular/core';
import { TasksService } from '../tasks.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, RouterLink], //FormsModule: Módulo de Angular necesario para trabajar con formularios. Permite la vinculación de datos en formularios.
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  userId = input.required<string>(); //quiero recibir el userId (u1, u2...) de cada url http://localhost:52951/users/u1/tasks/new, http://localhost:52951/users/u2/tasks/new... Los parámetros de rutas principales no se pasan automáticamente a las rutas hijas. Por defecto, un componente solo puede obtener los parametros de ruta que pertenecen directamente a su ruta a traves de la vinculacion de entrada. Como la ruta hija quiere obtener los parametros de ruta de una ruta padre, tengo que agregar en el enrutador paramsInheritanceStrategy: 'always'. Esto asegura que los valores de los parametros de la ruta padre se inyecten en las rutas hijas. Los nombres de los parámetros  de la ruta padre y las propiedades del componente .ts deben coincidir.
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  submitted = false;
  private tasksService = inject(TasksService);
  private router = inject(Router)

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );
    this.submitted = true;
    //la navegación programática en Angular se refiere al proceso de cambiar la vista o ruta en tu aplicación mediante código, en lugar de hacerlo a través de enlaces estáticos o botones en la interfaz de usuario.
    this.router.navigate(['/users', this.userId(), 'tasks'], {
      replaceUrl: true, //Normalmente, cuando navegas a una nueva ruta sin replaceUrl, Angular agrega una nueva entrada en el historial. Esto permite que el usuario vuelva a la ruta anterior usando el botón de retroceso. Si el usuario navega a una nueva ruta con replaceUrl: true, la entrada actual en el historial del navegador se reemplaza con la nueva ruta. Esto implica que cuando el usuario usa el botón de retroceso del navegador, no volverá a la ruta anterior que fue reemplazada que en este caso era la ruta http://localhost:4200/users/u3/tasks/new
    })
  }
}
