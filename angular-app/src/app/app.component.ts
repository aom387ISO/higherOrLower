import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './landscape.component.css', './crear-cuenta/crear-cuenta.component.css', './home/home.component.css', './settings/settings.component.css', './stats/stats.component.css']
  
})
export class AppComponent {
  title = 'Higher Or Lower';
}
