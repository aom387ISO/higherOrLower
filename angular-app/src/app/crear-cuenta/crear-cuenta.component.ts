import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-cuenta',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  password2: string = '';
  constructor(private http: HttpClient, private router: Router) {}

  register() {
    console.log('Datos:', this.username, this.email, this.password, this.password2);
    if (!this.username.trim() || !this.email.trim() || !this.password.trim() || !this.password2.trim()) {
      console.log('Todos los campos son obligatorios');
      alert('Todos los campos son obligatorios');
      return;
    }
    if (this.password !== this.password2) {
      console.log('Las contraseñas deben ser iguales');
      alert('Las contraseñas deben ser iguales');
      return;
    }
    
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:3000/api/register', userData)
      .subscribe({
        next: (response: any) => {
          console.log('Registro exitoso:', response);
          alert('Registro exitoso');
          this.username = '';
          this.email = '';
          this.password = '';
          this.password2 = '';
          this.router.navigate(['/home'], { state: { user: response.user } });
        },
        error: (error) => {
          console.error('Error en registro:', error);
          alert(error.error.message || 'Error al registrar');
        }
      });
    console.log('Registro exitoso:', this.username, this.email, this.password, this.password2);

  }
}
