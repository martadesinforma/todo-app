import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { UsersComponent } from "./users/users.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, UsersComponent], //Si planeas tener múltiples vistas y deseas navegar entre ellas, necesitas RouterOutlet.
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
