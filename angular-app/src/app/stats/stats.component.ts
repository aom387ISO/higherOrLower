import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {
  //constructor(private router: Router) {}
  content: string = "";
  count: number = 0;
  
  setMessage1 () {
    this.content = 'This is message # 1';
    console.log('Message # 1');
  }
  

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

  goToSettings() {
    console.log('Navegando a Settings');
    //this.router.navigate(['/settings']);
  }

  pepe(){
    console.log('Navegando a Settings');
    //this.router.navigate(['/settings']);
  }

  clickMe = function clickMe() {
    console.log('Navegando a Settings');
  }

  openPictureSettings(){
    console.log('Navegando a Settings');
  }

}