///////////////////////////////////////////////////////
import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { EventoInterface } from '../../interfaces/evento';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-domoticHouse',
   imports: [FormsModule],
  templateUrl: './eventos.component.html',
  styleUrls:[ './eventos.component.scss']
})
  export class EventoComponent implements OnInit{
  eventoList: EventoInterface[] = [];

  nuevoEvento: EventoInterface = {
    event_id: 0,
    tipo_evento: '',
    fecha_hora: 0
  };
  idBusqueda: number = 0;
  modoEditar: boolean = false;
  eventoSeleccionado: EventoInterface | null = null;

constructor(private eventoService: EventoService) { 
  console.log("EventoService instanciado");
}

  ngOnInit(): void {
    this.getEventos();
  }

  getEventos(){
    this.eventoService.getEventos().subscribe({
        next: (result: EventoInterface[]) =>{
          console.log('Respuesta de la API:', result);
          this.eventoList = result;
        },
        error:(err: any) =>{
          console.log(err);
        }
     
  });
  };
  eliminarEvento(event_id: number) {
  if (confirm('¿Estás seguro de eliminar esta habitacion?')) {
    this.eventoService.deleteEvento(event_id).subscribe({
      next: () => {
        this.getEventos();
      },
      error: (err: any) => {
        console.error('Error al eliminar el habitacion:', err);
      }
    });
  }
};

 agregarEvento(): void {
    if (this.nuevoEvento.event_id && this.nuevoEvento.tipo_evento && this.nuevoEvento.fecha_hora) {
      this.eventoService.addEvento(this.nuevoEvento).subscribe({
        next: () => {
          this.getEventos();
          this.nuevoEvento = { event_id: 0, tipo_evento: '', fecha_hora: 0 }; // Reinicia el formulario
        },
        error: (err: any) => {
          console.error('Error al agregar la evento:', err);
        }
      });
    }
  }

  buscarEventoPorId() {
  this.eventoService.getEventoPorId(this.idBusqueda).subscribe({
    next: (evento: EventoInterface) => {
      this.nuevoEvento = { ...evento };
    },
    error: (err: any) => {
      console.error('Evento no encontrado', err);
        alert('Evento no encontrado');
    }
  });
}

seleccionarEvento(evento: EventoInterface) {
  this.eventoSeleccionado = { ...evento };
}
cancelarEdicion() {
  this.eventoSeleccionado = null;
}
actualizarEvento() {
  this.eventoService.actualizarEvento(this.nuevoEvento.event_id, this.nuevoEvento).subscribe(() => {
    this.getEventos(); 
    this.limpiarFormulario();
  });
}

limpiarFormulario() {
  this.nuevoEvento = { event_id: 0, tipo_evento: '', fecha_hora: 0 };
}
}