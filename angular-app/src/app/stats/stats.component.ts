import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {
  constructor(private router: Router) {}

  goToHome(event: Event) {
    event.preventDefault();
    console.log('Navegando a Home');
    this.router.navigate(['/home']);
  }

  goToStats() {
    console.log('Navegando a Stats');
    this.router.navigate(['/stats']);
  }

  goToSettings() {
    console.log('Navegando a Settings');
    this.router.navigate(['/settings']);
  }
}