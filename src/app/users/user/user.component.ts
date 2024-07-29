import { Component, computed, input } from '@angular/core';
import { User } from './user.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  user = input.required<User>(); //se declara una propiedad de entrada (input) que es requerida en la señal user.
  imagePath = computed(() => 'users/' + this.user().avatar); //imagePath será una señal computada que siempre tendrá el valor actualizado de 'users/' + this.user().avatar.
}
