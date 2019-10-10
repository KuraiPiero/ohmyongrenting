-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor:127.0.0.1
-- user: root
-- password: ''
-- Tiempo de generación: 04-10-2019 a las 05:19:49
-- Versión del servidor: 10.1.38-MariaDB
-- Versión de PHP: 7.1.28

CREATE TABLE usuarios
(
  id int(11) NOT NULL,
  id_usuario int(11) NOT NULL,
  nombre varchar(100) NOT NULL,
  apellido varchar(150) DEFAULT NULL,
  email varchar(255) NOT NULL,
  PASSWORD varchar(255) NOT NULL,
  rol int(11) DEFAULT 0,
  celular varchar(60) DEFAULT NULL,
  ciudad varchar(60) DEFAULT NULL,
  direccion varchar(100) DEFAULT NULL,
  fecha_creacion timestamp NOT NULL DEFAULT current_timestamp,
  ultima_sesion timestamp NOT NULL DEFAULT current_timestamp,
  estado int(11) DEFAULT 0,

)

ALTER TABLE usuarios
ADD PRIMARY KEY(id);


CREATE TABLE verificacionToken
(

  id int(11) NOT NULL,
  id_usuario int(11) NOT NULL,
  token varchar(100) NOT NULL


)

ALTER TABLE verificacionToken
ADD PRIMARY KEY(id);

