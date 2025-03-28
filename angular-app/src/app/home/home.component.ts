import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('mangaAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(100%)' }),
          stagger(100, [
            animate('2000ms ease-in-out', style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true }),
        query(':leave', [
          style({ opacity: 1, transform: 'translateX(0)' }),
          animate('2000ms ease-in-out', style({ opacity: 0, transform: 'translateX(-100%)' }))
        ], { optional: true })
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router, private http: HttpClient) {}
  
  user: any = null;

  manga: any = null;
  manga2: any = null;
  gameStart: boolean = false;
  gameScore: number = 0;
  message: string = '';
  gameType: 'manga' | 'anime' = 'manga';
  gameOver: boolean = false;
  revealScore: boolean = false;
  bestScore: number = 0;

  private successMessages: string[] = [
    '¡Correcto!',
    '¡Bien hecho!',
    '¡Sigue así!',
    '¡Genial!',
    '¡Buen ojo!',
    '¡Perfecto!',
    '¡Estás en racha!',
    '¡Impresionante!'
  ];

  ngOnInit(): void {
    console.log('Home Component');
    this.user = history.state.user || JSON.parse(localStorage.getItem('user') || '{}');
    console.log('Usuario recibido:', this.user);
  }

  startGame(gameType: 'manga' | 'anime') {
    this.gameType = gameType;
    this.message = '';
    this.gameStart = true;
    this.gameScore = 0;
    this.gameOver = false;
    this.revealScore = false;
    this.loadContent();

    if (this.user.username) {
      this.http.get(`http://localhost:3000/api/getUserScore?username=${this.user.username}`)
      .subscribe({
        next: (response: any) => {
          const scores = response.scores;
          this.bestScore = this.gameType === 'manga' ? scores.bestMangaScore : scores.bestAnimeScore;
          console.log(`Mejor puntuación en ${this.gameType}: ${this.bestScore}`);
        },
        error: (error) => {
          console.error('Error al obtener la mejor puntuación:', error);
          this.bestScore = 0;
        }
      });
    }
  }

  loadContent() {
    if (this.gameType === 'manga') {
      this.apiService.getRandomManga().subscribe((response) => {
        const mangas = response.data;
        this.manga = mangas[Math.floor(Math.random() * mangas.length)];
        this.loadSecondContent();
      });
    } else {
      this.apiService.getRandomAnime().subscribe((response) => {
        const animes = response.data;
        this.manga = animes[Math.floor(Math.random() * animes.length)];
        this.loadSecondContent();
      });
    }
  }

  loadSecondContent() {
    if (this.gameType === 'manga') {
      this.apiService.getRandomManga().subscribe((response) => {
        const mangas = response.data;
        this.manga2 = mangas[Math.floor(Math.random() * mangas.length)];
        if (this.manga && (this.manga.mal_id === this.manga2.mal_id || this.manga.score === this.manga2.score)) {
          this.loadSecondContent();
        }
      });
    } else {
      this.apiService.getRandomAnime().subscribe((response) => {
        const animes = response.data;
        this.manga2 = animes[Math.floor(Math.random() * animes.length)];
        if (this.manga && (this.manga.mal_id === this.manga2.mal_id || this.manga.score === this.manga2.score)) {
          this.loadSecondContent();
        }
      });
    }
  }

  chooseManga(selected: 'manga' | 'manga2') {
    const score1 = this.manga?.score || 0;
    const score2 = this.manga2?.score || 0;

    if ((selected === 'manga' && score1 >= score2) || 
        (selected === 'manga2' && score2 > score1)) {
      this.gameScore++;
        
      this.message = this.successMessages[Math.floor(Math.random() * this.successMessages.length)];
          
      if (this.gameScore > this.bestScore) {
        this.bestScore = this.gameScore;
        console.log(`Nuevo mejor puntaje en ${this.gameType}: ${this.bestScore}`);
      }

      this.manga = this.manga2;
      this.manga2 = null;
      this.loadSecondContent();
    } else {
      this.message = `Incorrecto. Fin del juego.`;
      this.gameStart = false;
      this.gameOver = true;

      const endpoint = this.gameType === 'manga' ? '/updateMangaScore' : '/updateAnimeScore';
      const updateData = {
        username: this.user.username,
        score: this.gameScore
      };
  
      if(this.user.username) {
        this.http.put(`http://localhost:3000/api${endpoint}`, updateData)
        .subscribe({
          next: (response: any) => {
            console.log('Puntuación actualizada:', response);
          },
          error: (error) => {
            console.error('Error al actualizar la puntuación:', error);
            alert(error.error.message || 'Error al actualizar la puntuación');
          }
        });
      }
      setTimeout(() => {
        this.revealScore = true;
      }, 1000);
    }
  }

  restartGame() {
    this.startGame(this.gameType);
  }

  exitGame() {
    this.gameStart = false;
    this.gameOver = false;
  }
}