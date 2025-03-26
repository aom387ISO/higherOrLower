import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Router } from '@angular/router';

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
  constructor(private apiService: ApiService, private router: Router) {}

  manga: any = null;
  manga2: any = null;
  gameStart: boolean = false;
  gameScore: number = 0;
  message: string = '';
  gameType: 'manga' | 'anime' = 'manga';
  gameOver: boolean = false;
  revealScore: boolean = false;

  ngOnInit(): void {
    console.log('Home Component');
  }

  startGame(gameType: 'manga' | 'anime') {
    this.gameType = gameType;
    this.message = '';
    this.gameStart = true;
    this.gameScore = 0;
    this.gameOver = false;
    this.revealScore = false;
    this.loadContent();
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
      this.message = '¡Correcto!';
      this.manga = this.manga2;
      this.manga2 = null;
      this.loadSecondContent();
    } else {
      this.message = `Incorrecto. Fin del juego.`;
      this.gameStart = false;
      this.gameOver = true;
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