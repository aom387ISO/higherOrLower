import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private apiService: ApiService) {}
  
  manga: any = null;
  manga2: any = null;
  gameStart: boolean = false;
  gameScore: number = 0;
  message: string = '';

  ngOnInit(): void {
  }

  startGame() {
    this.gameStart = true;
    this.gameScore = 0;
    this.loadMangas();
  }

  loadMangas() {
    this.apiService.getRandomManga().subscribe((response) => {
      const mangas = response.data;
      this.manga = mangas[Math.floor(Math.random() * mangas.length)];
      this.loadSecondManga();
    });
  }

  loadSecondManga() {
    this.apiService.getRandomManga().subscribe((response) => {
      const mangas = response.data;
      this.manga2 = mangas[Math.floor(Math.random() * mangas.length)];
      if (this.manga.mal_id === this.manga2.mal_id) {
        this.loadSecondManga();
      }
    });
  }

  chooseManga(selected: 'manga' | 'manga2') {
    const score1 = this.manga.score || 0;
    const score2 = this.manga2.score || 0;

    if ((selected === 'manga' && score1 >= score2) || 
        (selected === 'manga2' && score2 > score1)) {
      this.gameScore++;
      this.message = '¡Correcto!';
    } else {
      this.message = `Incorrecto. Fin del juego. Puntuación: ${this.gameScore}`;
      this.gameStart = false;
      return;
    }

    this.loadMangas();
  }
}
