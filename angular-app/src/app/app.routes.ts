import { Routes } from '@angular/router';
import { LandscapeComponent } from './landscape.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';

export const routes: Routes = [
    { path: '', component: LandscapeComponent },
    { path: 'crear-cuenta', component: CrearCuentaComponent }
];
