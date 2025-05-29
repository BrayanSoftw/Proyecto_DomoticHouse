import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,

  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, 
    private router: Router,
    private authService : AuthService) {}

login() {
  this.http.post<any>('http://localhost:3000/api/auth/login', {
    email: this.email,
    contraseña: this.password // importante: usa "contraseña"
  }).subscribe({
    next: (response) => {
      if (response.token) {
        this.authService.setToken(response.token);

        // Opcional: guardar info del usuario
        localStorage.setItem('usuario', JSON.stringify(response.usuario));

        // Redirigir al dashboard
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Token no recibido';
      }
    },
    error: (err) => {
      console.error(err);
      this.errorMessage = 'Error al iniciar sesión';
    }
  });
}

}
