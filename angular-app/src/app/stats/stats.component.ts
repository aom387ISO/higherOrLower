import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {
  //constructor(private router: Router) {}

  

  ngOnInit(): void{
    console.log("Hola");
  }
  goToHome(event: Event) {
    event.preventDefault();
    console.log('Navegando a Home');
    //this.router.navigate(['/home']);
  }

  goToStats() {
    console.log('Navegando a Stats');
    //this.router.navigate(['/stats']);
  }

  pepe(){
    console.log('Navegando a Settings');
    //this.router.navigate(['/settings']);
  }
}