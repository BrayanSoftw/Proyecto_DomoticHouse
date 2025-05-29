import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventoInterface } from '../interfaces/evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  API_URL: string = 'http://localhost:3000/api/evento';
  
  constructor(private httpClient : HttpClient) {
    
   }
  getEventos(): Observable<any> {
    return this.httpClient.get(this.API_URL);
  }

  deleteEvento(event_id: number): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}/${event_id}`);
  }

  addEvento(evento: EventoInterface): Observable<any> {
    return this.httpClient.post(this.API_URL, evento);
  }

  actualizarEvento(event_id: number, evento: EventoInterface): Observable<any> {
  return this.httpClient.put(`${this.API_URL}/${event_id}`, evento);
}
getEventoPorId(event_id: number): Observable<EventoInterface> {
  return this.httpClient.get<EventoInterface>(`${this.API_URL}/${event_id}`);
}

}