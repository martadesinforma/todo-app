import { Component, inject, input, signal } from '@angular/core';
import { TasksService } from '../tasks.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule], //FormsModule: Módulo de Angular necesario para trabajar con formularios. Permite la vinculación de datos en formularios.
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  userId = input.required<string>(); //Propiedad de entrada del componente, marcada con el decorador input para indicar que se espera recibir un valor de tipo string. La propiedad es obligatoria (required).
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  private tasksService = inject(TasksService);

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );
  }
}
