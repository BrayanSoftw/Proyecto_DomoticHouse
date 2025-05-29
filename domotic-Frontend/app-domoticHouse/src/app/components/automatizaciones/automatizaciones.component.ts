import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { AutomatizacionService } from '../../services/automatizacion.service';

@Component({
  selector: 'app-automatizaciones',
  standalone: true,
  templateUrl: './automatizaciones.component.html',
  styleUrls: ['./automatizaciones.component.scss'],
  providers: [AutomatizacionService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule
  ],
})
export class AutomatizacionesComponent {
  automatizaciones: any[] = [];
  formulario: FormGroup;
  mostrarFormulario = false;
  editando = false;
  indexEditando: number | null = null;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      condicion: ['', Validators.required],
      accion: ['', Validators.required],
      estado: ['activo', Validators.required]
    });
  }

  mostrarFormularioCrear(): void {
    this.mostrarFormulario = true;
    this.editando = false;
    this.formulario.reset();
  }

  guardar(): void {
    if (this.formulario.invalid) return;

    const automatizacion = this.formulario.value;

    if (this.editando && this.indexEditando !== null) {
      this.automatizaciones[this.indexEditando] = automatizacion;
    } else {
      this.automatizaciones.push(automatizacion);
    }

    this.mostrarFormulario = false;
    this.indexEditando = null;
  }

  editar(index: number): void {
    this.mostrarFormulario = true;
    this.editando = true;
    this.indexEditando = index;
    this.formulario.patchValue(this.automatizaciones[index]);
  }

  eliminar(index: number): void {
    if (confirm("¿Estás seguro de eliminar esta automatización?")) {
      this.automatizaciones.splice(index, 1);
    }
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.formulario.reset();
    this.indexEditando = null;
  }
}