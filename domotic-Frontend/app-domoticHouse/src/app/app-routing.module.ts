// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { HabitacionesComponent } from './components/habitaciones/habitaciones.component';
import { DispositivosComponent } from './components/dispositivos/dispositivos.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { AutomatizacionesComponent } from './components/automatizaciones/automatizaciones.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'habitaciones', component: HabitacionesComponent },
  { path: 'dispositivos', component: DispositivosComponent },
  { path: 'eventos', component: EventosComponent },
  { path: 'automatizaciones', component: AutomatizacionesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
