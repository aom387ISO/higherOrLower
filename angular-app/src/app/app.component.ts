import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './landscape.component.html',
  styleUrl: './landscape.component.css'
})
export class AppComponent {
  title = 'Higher Or Lower';
}
