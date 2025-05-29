import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario';

// Importaciones de Angular Material
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule, // 📌 IMPORTANTE para `mat-toolbar`
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
  ],
  providers: [UsuarioService]
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = ['user_id', 'nombre', 'apellido', 'email', 'telefono', 'fecha_registro', 'ultimo_acceso', 'rol', 'acciones'];
  usuarios: Usuario[] = [];
  formulario: FormGroup;
  mostrarFormulario = false;
  editando: boolean = false;
  usuarioEditandoId: number | null = null;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.formulario = this.fb.group({
      user_id: [null], // 📌 Campo opcional, lo asigna la BD
      nombre: ['', Validators.required],
      apellido: ['', Validators.required], // 📌 Agregado
      email: ['', [Validators.required, Validators.email]], // 📌 Cambiado de "correo" a "email"
      telefono: ['', Validators.required], // 📌 Agregado
      contraseña_hash: ['', Validators.required], // 📌 Agregado
      fecha_registro: [''], // 📌 Agregado (puede venir de la BD)
      ultimo_acceso: [''], // 📌 Agregado (puede venir de la BD)
      rol: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe((data: Usuario[]) => {
      console.log("Usuarios recibidos:", data);
      this.usuarios = data;
    });
  }

  mostrarFormularioCrear(): void {
    this.mostrarFormulario = true;
    this.editando = false;
    this.formulario.reset();
  }

  editarUsuario(usuario: Usuario): void {
    this.mostrarFormulario = true;
    this.editando = true;
    this.usuarioEditandoId = usuario.user_id ?? usuario.id ?? null; // 📌 Ajustado para que reconozca `user_id`
    this.formulario.patchValue(usuario);
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.usuarioService.eliminarUsuario(id).subscribe(() => {
        this.cargarUsuarios();
      });
    }
  }

  guardar(): void {
    if (this.formulario.invalid) {
      console.log("Formulario inválido:", this.formulario.value);
      return;
    }

    const usuario = this.formulario.value;
    console.log("Intentando guardar usuario:", usuario); // 📌 Depuración

    if (this.editando && this.usuarioEditandoId !== null) {
      console.log("Actualizando usuario con ID:", this.usuarioEditandoId);
      this.usuarioService.actualizarUsuario(this.usuarioEditandoId, usuario).subscribe(() => {
        console.log("Usuario actualizado correctamente");
        this.cargarUsuarios();
        this.mostrarFormulario = false;
      });
    } else {
      console.log("Creando nuevo usuario...");
      this.usuarioService.crearUsuario(usuario).subscribe(() => {
        console.log("Usuario creado correctamente");
        this.cargarUsuarios();
        this.mostrarFormulario = false;
      });
    }
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.formulario.reset();
  }
}