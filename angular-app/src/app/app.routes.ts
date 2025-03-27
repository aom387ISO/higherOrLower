import { Routes } from '@angular/router';
import { landingComponent } from './landing/landing.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { HomeComponent } from './home/home.component';
import { StatsComponent } from './stats/stats.component';
import { SettingsComponent } from './settings/settings.component';
import { provideHttpClient } from '@angular/common/http';


export const routes: Routes = [
    { path: '', component: landingComponent },
    { path: 'crear-cuenta', component: CrearCuentaComponent },
    { path: 'home', component : HomeComponent },
    { path: 'stats', component : StatsComponent },
    { path: 'settings', component : SettingsComponent },

];
