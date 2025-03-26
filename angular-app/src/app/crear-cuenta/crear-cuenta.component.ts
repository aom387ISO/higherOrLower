import { Component } from '@angular/core';

@Component({
  selector: 'app-crear-cuenta',
  standalone: true,
  imports: [],
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  password2: string = '';

  register() {
    if (this.password !== this.password2) {
      alert('Las contraseñas deben ser iguales');
      return;
    }
  }
}
