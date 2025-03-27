import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  profileImage: string = ''; 
  availablePictures: string[] = [];
  showPopup: boolean = false; 
  showPasswordPopup: boolean = false;
  user: any = null;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.user = history.state.user || JSON.parse(localStorage.getItem('user') || '{}');
    console.log('Usuario recibido:', this.user);
    const pictureName = this.user?.profilePicture || 'profile_1.png'; // Nombre base de la imagen
    this.profileImage = `assets/profilePictures/${pictureName}`;

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
    this.updateProfilePicture();
    this.closePictureSettings();
  }

  updateProfilePicture() {
    const pictureName = this.profileImage.split('/').pop();
    const updateData = {
      username: this.user.username,
      profileImage: pictureName
    };

    this.http.put('http://localhost:3000/api/changeIcon', updateData)
      .subscribe({
        next: (response: any) => {
          console.log('Foto de perfil actualizada:', response);
          alert('Foto de perfil actualizada con éxito');
          this.user.profilePicture = pictureName;

          this.router.navigate(['/settings'], { state: { user: this.user } });
        },
        error: (error) => {
          console.error('Error al actualizar la foto:', error);
          alert(error.error.message || 'Error al actualizar la foto de perfil');
        }
      });
  }

  openPasswordSettings() {
    this.showPasswordPopup = true;
  }

  closePasswordSettings() {
    this.showPasswordPopup = false;
  }

}
