import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  constructor(private router: Router) {}
  profileImage: string = ''; 
  availablePictures: string[] = [];
  showPopup: boolean = false; 
  showPasswordPopup: boolean = false;

  ngOnInit(): void {
    this.profileImage = '../assets/profilePictures/profile_1.png';
    /*setTimeout(() => {
      this.profileImage = 'https://example.com/user-profile.jpg'
    }, 1000);*/
    this.availablePictures = [
      '../assets/profilePictures/profile_1.png',
      '../assets/profilePictures/profile_2.png',
      '../assets/profilePictures/profile_3.png',
      '../assets/profilePictures/profile_4.png',
      '../assets/profilePictures/profile_5.png',
      '../assets/profilePictures/profile_6.png'
    ];
  }

  openPictureSettings() {
    this.showPopup = true;
  }

  closePictureSettings() {
    this.showPopup = false;
  }

  selectProfilePicture(picture: string) {
    this.profileImage = picture;
    this.closePictureSettings();
  }

  openPasswordSettings() {
    this.showPasswordPopup = true;
  }

  closePasswordSettings() {
    this.showPasswordPopup = false;
  }

}
