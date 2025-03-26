import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './landscape.component.css', './crear-cuenta/crear-cuenta.component.css', './home/home.component.css', './settings/settings.component.css', './stats/stats.component.css']
  
})
export class AppComponent {
  title = 'Higher Or Lower';

  prueba(){
    console.log('prueba');
  }
}
