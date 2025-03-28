import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HttpClient } from '@angular/common/http';

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

  user : any = null;
  selectedMode: 'Manga' | 'Anime' = 'Manga';
  mangaLeaderboard: LeaderboardEntry[] = [];
  animeLeaderboard: LeaderboardEntry[] = [];

  constructor(private router: Router, private http : HttpClient) {}

  ngOnInit(): void {
    this.user = history.state.user || JSON.parse(localStorage.getItem('user') || '{}');
    this.getMangaLeaderboard();
    this.getAnimeLeaderboard();
  }

  getMangaLeaderboard() {
    this.http.get('http://localhost:3000/api/getMangaLeaderboard')
      .subscribe({
        next: (response: any) => {
          console.log('Leaderboard de manga obtenido:', response);
          this.mangaLeaderboard = response.leaderboard;
        },
        error: (error) => {
          console.error('Error al obtener el leaderboard de manga:', error);
        }
      });
  }

  getAnimeLeaderboard() {
    this.http.get('http://localhost:3000/api/getAnimeLeaderboard')
      .subscribe({
        next: (response: any) => {
          console.log('Leaderboard de anime obtenido:', response);
          this.animeLeaderboard = response.leaderboard;
        },
        error: (error) => {
          console.error('Error al obtener el leaderboard de anime:', error);
        }
      });
  }

  selectMode(mode: 'Manga' | 'Anime') {
    this.selectedMode = mode;
  }

  getCurrentLeaderboard(): LeaderboardEntry[] {
    return this.selectedMode === 'Manga' ? this.mangaLeaderboard : this.animeLeaderboard;
  }
}