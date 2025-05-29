import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  isLoggedIn(): boolean {
    // Verifica si hay un token en el localStorage
    return !!localStorage.getItem('token');
  }

  // Opcional: método para guardar el token
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Opcional: método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
  }
}
