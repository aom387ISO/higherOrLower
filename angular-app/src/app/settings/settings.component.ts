import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  profileImage: string = ''; 
  availablePictures: string[] = [];
  showPopup: boolean = false; 
  showPasswordPopup: boolean = false;
  user: any = null;
  bestMangaScore: number = 0;
  bestAnimeScore: number = 0;
  currentPassword: string = '';
  newPassword: string = '';
  repeatPassword: string = '';

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
      '../assets/profilePictures/profile_7.png',
      '../assets/profilePictures/profile_8.png',
      '../assets/profilePictures/profile_4.png',
      '../assets/profilePictures/profile_5.png',
      '../assets/profilePictures/profile_6.png',
      '../assets/profilePictures/profile_11.png',
      '../assets/profilePictures/profile_12.png',
      '../assets/profilePictures/profile_9.png',
      '../assets/profilePictures/profile_10.png',
    ];
  
    this.getUserScore();
  }

  getUserScore() {
    const username = this.user?.username;

    if (!username) {
      console.error('No se encontró el nombre de usuario');
      return;
    }

    this.http.get(`http://localhost:3000/api/getUserScore?username=${username}`)
      .subscribe({
        next: (response: any) => {
          console.log('Puntuaciones obtenidas:', response);
          this.bestMangaScore = response.scores.bestMangaScore ?? 0;
          this.bestAnimeScore = response.scores.bestAnimeScore ?? 0;
        },
        error: (error) => {
          console.error('Error al obtener las puntuaciones:', error);
          alert(error.error.message || 'Error al obtener las puntuaciones');
        }
      });
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
          this.user.profilePicture = pictureName;

          this.router.navigate(['/home'], { state: { user: this.user } }).then(() => {
              this.router.navigate(['/settings'], { state: { user: this.user } });
          });
        },
        error: (error) => {
          console.error('Error al actualizar la foto:', error);
          alert(error.error.message || 'Error al actualizar la foto de perfil');
        }
      });
  }

  updatePassword() {
    if (!this.currentPassword || !this.newPassword || !this.repeatPassword) {
      alert('Por favor, completa todos los campos.');
      return;
    }
  
    if (this.newPassword !== this.repeatPassword) {
      alert('La nueva contraseña y la repetición no coinciden.');
      return;
    }
  
    const updateData = {
      username: this.user.username,
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    };
  
    this.http.put('http://localhost:3000/api/changePassword', updateData)
      .subscribe({
        next: (response: any) => {
          console.log('Contraseña actualizada:', response);
          alert('Contraseña actualizada con éxito.');
          this.closePasswordSettings();
        },
        error: (error) => {
          console.error('Error al actualizar la contraseña:', error);
          alert(error.error.message || 'Error al actualizar la contraseña.');
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
