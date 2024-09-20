-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-09-2024 a las 22:54:16
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `veterinaria2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adopciones`
--

CREATE TABLE `adopciones` (
  `id` int(11) NOT NULL,
  `id_adoptante` int(11) DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `id_mascota` int(11) DEFAULT NULL,
  `estado` enum('Adoptado','Por Adoptar','Pendiente') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_roman_ci;

--
-- Volcado de datos para la tabla `adopciones`
--

INSERT INTO `adopciones` (`id`, `id_adoptante`, `edad`, `id_mascota`, `estado`) VALUES
(135, 117, 19, 216, 'Adoptado'),
(138, 117, 19, 217, 'Pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(67) NOT NULL,
  `estado` enum('Activo','Desactivo') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_roman_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`, `estado`) VALUES
(29, 'koko', 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamento`
--

CREATE TABLE `departamento` (
  `id` int(11) NOT NULL,
  `nombre` varchar(56) DEFAULT NULL,
  `codigo_dane` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `departamento`
--

INSERT INTO `departamento` (`id`, `nombre`, `codigo_dane`) VALUES
(27, 'Huila', 159);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genero`
--

CREATE TABLE `genero` (
  `id` int(11) NOT NULL,
  `nombre` varchar(67) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_roman_ci;

--
-- Volcado de datos para la tabla `genero`
--

INSERT INTO `genero` (`id`, `nombre`) VALUES
(1, 'Macho'),
(2, 'Hembra');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascotas`
--

CREATE TABLE `mascotas` (
  `id` int(11) NOT NULL,
  `raza` int(11) NOT NULL,
  `categoria_id` int(11) NOT NULL,
  `foto` varchar(56) DEFAULT NULL,
  `genero_id` int(11) NOT NULL,
  `nombre_mas` varchar(34) DEFAULT NULL,
  `id_vacuna` enum('Vacunado','No Vacunado') DEFAULT NULL,
  `descripcion` varchar(87) DEFAULT NULL,
  `fecha_nacimiento` varchar(45) DEFAULT NULL,
  `usuario` int(11) DEFAULT NULL,
  `estado` enum('Por adoptar','Adoptado','En proceso') DEFAULT 'Por adoptar',
  `historial_medico` varchar(200) DEFAULT NULL,
  `municipio` int(11) DEFAULT NULL,
  `departamento` int(11) DEFAULT NULL,
  `vacunas` int(11) DEFAULT NULL,
  `edad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_roman_ci;

--
-- Volcado de datos para la tabla `mascotas`
--

INSERT INTO `mascotas` (`id`, `raza`, `categoria_id`, `foto`, `genero_id`, `nombre_mas`, `id_vacuna`, `descripcion`, `fecha_nacimiento`, `usuario`, `estado`, `historial_medico`, `municipio`, `departamento`, `vacunas`, `edad`) VALUES
(216, 11, 29, 'descarga.jfif', 1, 'mascara', 'Vacunado', 'es jugueton', '2020-11-30T17:04:44.000Z', 117, 'Adoptado', 'lkkljkljk', 54, 27, 81, 3),
(217, 11, 29, 'perfil.jfif', 1, 'rufo', 'Vacunado', 'jhkjh', '2024-09-02T19:18:25.000Z', 117, 'En proceso', 'lkkljkljk', 54, 27, 81, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `municipio`
--

CREATE TABLE `municipio` (
  `id` int(11) NOT NULL,
  `nombre` varchar(56) DEFAULT NULL,
  `codigo_dane` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `municipio`
--

INSERT INTO `municipio` (`id`, `nombre`, `codigo_dane`) VALUES
(54, 'Pitalito', 456);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `razas`
--

CREATE TABLE `razas` (
  `id` int(11) NOT NULL,
  `nombre_r` varchar(23) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_roman_ci;

--
-- Volcado de datos para la tabla `razas`
--

INSERT INTO `razas` (`id`, `nombre_r`) VALUES
(11, 'koko');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(54) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(213) DEFAULT NULL,
  `tipo` enum('Invitado','Administrador','Usuario','SuperUsuario') DEFAULT NULL,
  `foto` varchar(768) DEFAULT NULL,
  `direccion` varchar(67) DEFAULT NULL,
  `documento` int(11) DEFAULT NULL,
  `tipo_de_documento` enum('Cedula','Cedula Extranjera') DEFAULT NULL,
  `telefono` varchar(19) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_roman_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password`, `tipo`, `foto`, `direccion`, `documento`, `tipo_de_documento`, `telefono`) VALUES
(53, 'darwin', 'darwin@gmail.com', '$2a$10$uI9ss3G2RZptYbQzSq0byOscsuSBx92RDossZ6mX167KcptlyvCAS', 'SuperUsuario', 'Vainilla.JPG', 'calle 2 barrio   jasmin', 100426678, 'Cedula', '3026460489'),
(83, 'victor', 'victor@gmail.com', '$2a$10$9XBYpTOa9.vtqW4n12IGb.mtmgEn8nvrG7dMxDk4qomUNc86bd/sG', 'Administrador', 'perfil.jfif', 'calle 4', 2147483647, 'Cedula', '3144796742'),
(117, 'maria', 'maria@gmail.com', '$2a$10$Ylbovwp5RemIJPKVaC4mEeq6LUIWa0bDDfHl/K0/x0qBswsYImova', 'Usuario', 'perfil.jfif', 'calle 9', 100987634, 'Cedula', '3165766564'),
(119, 'invitado', 'invitado@gmail.com', '$2a$10$08SVHNK1g2DuWr98Ng0KKeiRH3suC6xTNX3wdili9Jg3VoKnzPAOi', 'Invitado', 'perfil.jfif', NULL, NULL, NULL, NULL),
(124, 'oscar', 'oscar@gmail.com', '$2a$10$Yi4Q8mNUTg06ZcGet/GbdevQ5/0xscqddZDqOflTM3KIXOGz4NZ1y', 'Administrador', 'descarga.jfif', 'lpl klpp', 1234566975, 'Cedula', '3213410842');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vacunas`
--

CREATE TABLE `vacunas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vacunas`
--

INSERT INTO `vacunas` (`id`, `nombre`) VALUES
(81, 'rabia');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `adopciones`
--
ALTER TABLE `adopciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_adoptante` (`id_adoptante`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `departamento`
--
ALTER TABLE `departamento`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `genero`
--
ALTER TABLE `genero`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `raza` (`raza`),
  ADD KEY `categoria_id` (`categoria_id`),
  ADD KEY `genero_id` (`genero_id`),
  ADD KEY `adopcion` (`usuario`),
  ADD KEY `id_vacuna` (`id_vacuna`),
  ADD KEY `municipio` (`municipio`),
  ADD KEY `departamento` (`departamento`);

--
-- Indices de la tabla `municipio`
--
ALTER TABLE `municipio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indices de la tabla `razas`
--
ALTER TABLE `razas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `vacunas`
--
ALTER TABLE `vacunas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `adopciones`
--
ALTER TABLE `adopciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=139;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `departamento`
--
ALTER TABLE `departamento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `genero`
--
ALTER TABLE `genero`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=218;

--
-- AUTO_INCREMENT de la tabla `municipio`
--
ALTER TABLE `municipio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de la tabla `razas`
--
ALTER TABLE `razas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;

--
-- AUTO_INCREMENT de la tabla `vacunas`
--
ALTER TABLE `vacunas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `adopciones`
--
ALTER TABLE `adopciones`
  ADD CONSTRAINT `adopciones_ibfk_1` FOREIGN KEY (`id_adoptante`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD CONSTRAINT `adopcion` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `mascotas_ibfk_1` FOREIGN KEY (`raza`) REFERENCES `razas` (`id`),
  ADD CONSTRAINT `mascotas_ibfk_2` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`),
  ADD CONSTRAINT `mascotas_ibfk_3` FOREIGN KEY (`genero_id`) REFERENCES `genero` (`id`),
  ADD CONSTRAINT `mascotas_ibfk_4` FOREIGN KEY (`municipio`) REFERENCES `municipio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `mascotas_ibfk_5` FOREIGN KEY (`departamento`) REFERENCES `departamento` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `vacunas`
--
ALTER TABLE `vacunas`
  ADD CONSTRAINT `vacunas_ibfk_1` FOREIGN KEY (`id`) REFERENCES `vacunas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
