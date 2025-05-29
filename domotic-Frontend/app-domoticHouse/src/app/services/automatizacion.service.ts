import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' }) // 📌 Permite la inyección automática
export class AutomatizacionService {
  private apiUrl = 'http://localhost:3000/api/automatizaciones';

  constructor(private http: HttpClient) {}

  obtenerAutomatizaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearAutomatizacion(automatizacion: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, automatizacion);
  }

  actualizarAutomatizacion(id: number, automatizacion: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, automatizacion);
  }

  eliminarAutomatizacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}