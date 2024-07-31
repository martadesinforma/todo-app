import { Component, input } from '@angular/core';

@Component({
  selector: 'app-no-task',
  standalone: true,
  imports: [],
  templateUrl: './no-task.component.html',
  styleUrl: './no-task.component.css'
})
export class NoTaskComponent {
  message = input.required<string>(); //esta propiedad tiene el nombre de message pq la clave de la propiedad data  que hemos definido en el app.routes.ts para la ruta vacia '',  se llama message: data: { message: 'Select a user to see their tasks!'}. Estos dos nombres tienen que coincidir.  Para conseguir esto, en el app.config.ts hemos importado withComponentInputBinding(). Esta función habilita la vinculación automática de los parámetros  de la ruta a las propiedades del componente usando decoradores de entrada (input binding).

}

