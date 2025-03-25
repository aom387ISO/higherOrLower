
import { Routes } from '@angular/router';
import { CrearCuentaComponent } from './app/crear-cuenta/crear-cuenta.component';
import { LandscapeComponent } from './app/landscape/landscape.component';
import { HomeComponent } from './app/home/home.component';
import { StatsComponent } from './app/stats/stats.component';
import { SettingsComponent } from './app/settings/settings.component';

export const routes: Routes = [
  { path: '', component: LandscapeComponent }, 
  { path: 'crear-cuenta', component: CrearCuentaComponent },
  { path: 'home', component : HomeComponent },
  { path: 'stats', component : StatsComponent },
  { path: 'settings', component : SettingsComponent }
];
/*
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
}).catch(err => console.error(err));
*/