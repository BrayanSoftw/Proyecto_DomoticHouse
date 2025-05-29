import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard'
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { HabitacionesComponent } from './components/habitaciones/habitaciones.component';
import { DispositivosComponent } from './components/dispositivos/dispositivos.component';
import { EventoComponent } from './components/eventos/eventos.component';
import { AutomatizacionesComponent } from './components/automatizaciones/automatizaciones.component';


export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'habitaciones', component: HabitacionesComponent },
  { path: 'dispositivos', component: DispositivosComponent },
  { path: 'eventos', component: EventoComponent },
  { path: 'automatizaciones', component: AutomatizacionesComponent }
];
