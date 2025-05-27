show tables;
drop table evento;
drop table config_automatizacion;

# creareé tabla usuario
create table usuario(
user_id int primary key auto_increment, nombre varchar(50)not null,apellido varchar(50)not null,
email varchar(100)unique not null,contraseña_hash varchar(255)not null,telefono varchar(20),
fecha_registro datetime default current_timestamp,ultimo_acceso datetime,
rol enum('admin','residente','invitado')not null);
#creamos tabla habitación
create table habitacion(room_id int primary key auto_increment, nombre varchar(50)not null,
piso int,area decimal (5,2),descripcion text);
# creamos tabla dispositivo
create table dispositivo(device_id int primary key auto_increment,nombre varchar(50)not null,
tipo enum('sensor_temperatura','luz','camara','cerradura','otros')not null,ubicacion varchar(100),
estado_actual varchar(100),fecha_instalacion date,ultimo_mantenimiento date,
room_id int,foreign key(room_id)references habitacion(room_id));

describe table usuario;
#creamos tabla evento
create table evento
(event_id int primary key auto_increment,tipo_evento enum('cambio_temperatura','encendido','movimiento'),
fecha_hora datetime,valor_anterior int null,valor_nuevo int null,descripcion text);
#creamos tabla config_automatizacion
create table config_automatizacion(
config_id int primary key auto_increment,nombre varchar(50)not null,condicion varchar(50)not null,
accion varchar(50)not null,estado enum('activo','inactivo')default 'activo');
