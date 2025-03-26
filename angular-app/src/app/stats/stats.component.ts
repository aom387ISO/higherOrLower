import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

interface LeaderboardEntry {
  position: number;
  username: string;
  score: number;
  profileImage: string;
}

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [SidebarComponent, CommonModule], 
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  constructor(private router: Router) {}

  selectedMode: 'Manga' | 'Anime' = 'Manga';
  profileImage: string = '../assets/profilePictures/profile_1.png';

  mangaLeaderboard: LeaderboardEntry[] = [
    { position: 1, username: 'UserName1', score: 1000, profileImage: this.profileImage },
    { position: 2, username: 'UserName2', score: 999, profileImage: this.profileImage },
    { position: 3, username: 'UserName3', score: 900, profileImage: this.profileImage },
    { position: 4, username: 'UserName4', score: 800, profileImage: this.profileImage },
    { position: 5, username: 'UserName5', score: 700, profileImage: this.profileImage }
  ];

  // Lista de mejores jugadores para Anime
  animeLeaderboard: LeaderboardEntry[] = [
    { position: 1, username: 'Pepé', score: 1000, profileImage: this.profileImage },
    { position: 2, username: 'Manolo', score: 999, profileImage: this.profileImage },
    { position: 3, username: 'Ramona', score: 900, profileImage: this.profileImage },
    { position: 4, username: 'Antonio', score: 800, profileImage: this.profileImage },
    { position: 5, username: 'Jesús', score: 700, profileImage: this.profileImage }
  ];

  ngOnInit(): void {
    this.profileImage = '../assets/profilePictures/profile_1.png';
  }

  selectMode(mode: 'Manga' | 'Anime') {
    this.selectedMode = mode;
  }

  getCurrentLeaderboard(): LeaderboardEntry[] {
    return this.selectedMode === 'Manga' ? this.mangaLeaderboard : this.animeLeaderboard;
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