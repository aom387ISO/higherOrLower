import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class landingComponent {
  username: string = '';
  password: string = '';
  constructor(private http: HttpClient, private router: Router) {}

  login() {
    console.log('Datos:', this.username, this.password);

    if (!this.username.trim()|| !this.password.trim()) {
      console.log('Todos los campos son obligatorios');
      alert('Todos los campos son obligatorios');
      return;
    }

    const userData = {
      username: this.username,
      password: this.password
    };

    this.http.post('http://localhost:3000/api/login', userData)
      .subscribe({
        next: (response: any) => {
          console.log('Login exitoso:', response);
          this.username = '';
          this.password = '';
          this.router.navigate(['/home'], { state: { user: response.user } });
        },
        error: (error) => {
          console.error('Error en login:', error);
          alert(error.error.message || 'Error al loguear');
        }
      });
    
  }

}
