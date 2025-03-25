import { Routes } from '@angular/router';
import { LandscapeComponent } from './landscape/landscape.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { HomeComponent } from './home/home.component';
import { StatsComponent } from './stats/stats.component';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [
    { path: '', component: LandscapeComponent },
    { path: 'crear-cuenta', component: CrearCuentaComponent },
    { path: 'home', component : HomeComponent },
    { path: 'stats', component : StatsComponent },
    { path: 'settings', component : SettingsComponent }
];
