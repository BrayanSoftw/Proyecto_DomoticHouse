import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' }) // 📌 Esto asegura una única instancia
export class HabitacionService {
  private apiUrl = 'http://localhost:3000/api/habitaciones';

  constructor(private http: HttpClient) {} // ✅ Aquí eliminamos cualquier referencia a otros servicios o componentes

  obtenerHabitaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearHabitacion(habitacion: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, habitacion);
  }

  actualizarHabitacion(id: number, habitacion: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, habitacion);
  }

  eliminarHabitacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}