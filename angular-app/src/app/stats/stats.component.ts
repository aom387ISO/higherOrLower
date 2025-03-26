import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  constructor(private router: Router) {}
  profileImage: string = ''; 

  ngOnInit(): void{
    this.profileImage = '../assets/profilePictures/profile_1.png';

  }
  goToHome() {
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