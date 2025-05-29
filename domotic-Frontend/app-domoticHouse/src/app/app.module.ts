import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { CommonModule } from '@angular/common';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { DispositivosComponent } from './components/dispositivos/dispositivos.component';
import { EventoComponent } from './components/eventos/eventos.component';
import { AutomatizacionesComponent } from './components/automatizaciones/automatizaciones.component';
import { HabitacionesComponent } from './components/habitaciones/habitaciones.component';

import { UsuarioService } from './services/usuario.service';
//import { HabitacionService } from './services/habitacion.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UsuariosComponent,
    HabitacionesComponent,
    DispositivosComponent,
    EventoComponent,
    AutomatizacionesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule.forRoot(appRoutes),

    // Angular Material Modules
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatToolbarModule,
    MatSelectModule,
    MatIconModule
  ],
  providers: [UsuarioService,],
  bootstrap: [AppComponent]
})
export class AppModule {}