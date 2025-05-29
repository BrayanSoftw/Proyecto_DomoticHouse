// usuario.ts
export interface Usuario {
  id?:number;
  user_id?: number;
  nombre: string;
  apellido: string;
  email: string;
  contraseña_hash: string;
  telefono?: string;
  fecha_registro?: Date;
  ultimo_acceso?: Date;
  rol: 'admin' | 'residente' | 'invitado';
}
