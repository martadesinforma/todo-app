import { Component, input } from '@angular/core';
import {RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css'
})
export class UserTasksComponent {
  //la forma más sencilla de obtener el valor de un parámetro de ruta en un componente cargado para una ruta dinámica es añadir una entrada a ese componente que tenga el mismo nombre que el parámetro de ruta dinámico.
  userName = input.required<string>(); //Gracias a withComponentInputBinding() que está importado en los providers del app.config.ts, el parámetro dinamico userName  definido en el app.routes.ts, se enlaza automáticamente a la propiedad userName de este componente ya que tienen el mismo nombre.


}




