import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router) {}
  profileImage: string = '';

  ngOnInit(): void {
    this.profileImage = '../assets/profilePictures/profile_1.png';
    /*setTimeout(() => {
      this.profileImage = 'https://example.com/user-profile.jpg'
    }, 1000);*/
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToStats() {
    this.router.navigate(['/stats']);
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }
}
