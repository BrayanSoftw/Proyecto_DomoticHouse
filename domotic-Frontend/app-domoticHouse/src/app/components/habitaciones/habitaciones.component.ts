import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HabitacionService } from '../../services/habitacion.service';

@Component({
  selector: 'app-habitaciones',
  standalone: true,
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.scss']
})
export class HabitacionesComponent implements OnInit {
  habitaciones: any[] = [];
  formulario: FormGroup;
  habitacionEdit: any | null = null;

  constructor(private fb: FormBuilder, private habitacionService: HabitacionService) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      piso: [0, Validators.required],
      area: [0, Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarHabitaciones();
  }

  cargarHabitaciones(): void {
    this.habitacionService.obtenerHabitaciones().subscribe(data => {
      console.log("Habitaciones recibidas:", data);
      this.habitaciones = data;
    });
  }
}