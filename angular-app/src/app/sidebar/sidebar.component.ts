import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() user: any = null;
  
  profilePicture: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const pictureName = this.user?.profilePicture || 'profile_1.png'; // Nombre base de la imagen
    this.profilePicture = `assets/profilePictures/${pictureName}`;
  }
  
  goToHome() {
    console.log('user', this.user);
    this.router.navigate(['/home'], { state: { user: this.user } });
    }

  goToStats() {
    console.log('user', this.user);
    this.router.navigate(['/stats'], { state: { user: this.user } });
  }

  goToSettings() {
    console.log('user', this.user);
    this.router.navigate(['/settings'], { state: { user: this.user } });
  }
}
