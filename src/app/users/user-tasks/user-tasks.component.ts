import { Component, computed, inject, input } from '@angular/core';
import { UsersService } from '../users.service';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css'
})
export class UserTasksComponent {
  //la forma más sencilla de obtener el valor de un parámetro de ruta en un componente cargado para una ruta dinámica es añadir una entrada a ese componente que tenga el mismo nombre que el parámetro de ruta dinámico.
  userId = input.required<string>(); //Gracias a withComponentInputBinding() que está importado en los providers del app.config.ts, el parámetro dinamico userId del path 'users/:userId' definido en el app.routes.ts, se enlaza automáticamente a la propiedad userId de este componente ya que tienen el mismo nombre.

  private usersService = inject(UsersService);



  userName = computed(()=> this.usersService.users.find(user=>user.id === this.userId())?.name); //al usar computed(), cuando el valor de la señal userId cambie, también va a cambiar userName. find(user => user.id === this.userId()): Busca en la lista de usuarios un usuario cuyo id coincida con el userId actual y lo devuelve y si no lo encuentra devuelve undefined. Quiero el nombre del usuario encontrado.
}
