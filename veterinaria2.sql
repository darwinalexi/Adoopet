-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-09-2024 a las 00:39:45
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
(117, 53, 34, 80, 'Adoptado'),
(119, 53, 25, 82, 'Adoptado'),
(123, 53, 78, 91, 'Adoptado'),
(124, 53, 45, 119, 'Adoptado'),
(125, 53, 18, 120, 'Adoptado'),
(126, 53, 28, 150, 'Adoptado'),
(127, 53, 78, 151, 'Pendiente');

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
(1, 'grande', 'Activo'),
(2, 'Pequeño', 'Activo');

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
(17, 'casanare', 990),
(19, 'Cundinamarca', 345),
(21, 'Huila', 7867);

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
  `edad` int(11) NOT NULL,
  `usuario` int(11) DEFAULT NULL,
  `estado` enum('Por adoptar','Adoptado','En proceso') DEFAULT 'Por adoptar',
  `historial_medico` varchar(200) DEFAULT NULL,
  `municipio` int(11) DEFAULT NULL,
  `departamento` int(11) DEFAULT NULL,
  `vacunas` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_roman_ci;

--
-- Volcado de datos para la tabla `mascotas`
--

INSERT INTO `mascotas` (`id`, `raza`, `categoria_id`, `foto`, `genero_id`, `nombre_mas`, `id_vacuna`, `descripcion`, `edad`, `usuario`, `estado`, `historial_medico`, `municipio`, `departamento`, `vacunas`) VALUES
(91, 1, 2, NULL, 2, 'koko', 'Vacunado', 'fghfhgf', 6, 53, 'Adoptado', 'ghjghgjg', 30, 17, 1),
(92, 1, 1, '0', 2, 'luna ', 'Vacunado', 'es jugueton', 678, 53, 'Por adoptar', 'koko', NULL, NULL, NULL),
(98, 1, 2, '0', 1, 'chispas', 'No Vacunado', 'es jugueton', 7, 53, 'Adoptado', 'koko', 32, 17, NULL),
(105, 1, 1, '0', 1, 'chispas', 'No Vacunado', 'es lklk', 5, 53, '', 'koko', 30, 17, NULL),
(107, 1, 1, 'rufo.JPG', 1, 'kokoko', 'No Vacunado', 'es jugueton', 6, 53, '', 'lkkljkljk', 30, 21, NULL),
(108, 1, 1, 'solovino.JPG', 1, 'gggfghfhg', 'No Vacunado', 'es jugueton', 6, 53, '', 'lkkljkljk', 30, 21, NULL),
(119, 1, 2, 'Chillon.JPG', 1, 'chispas', 'Vacunado', 'jhkjh', 6, 53, 'Adoptado', 'hjkhk', 31, 17, NULL),
(120, 2, 2, 'solovino.JPG', 1, 'luna', 'Vacunado', '668768', 9, 53, 'Adoptado', 'koko', 31, 17, NULL),
(126, 1, 1, 'rufo.JPG,solovino.JPG,Vainilla.JPG,Zuricata.jpeg', 1, 'chispas', 'Vacunado', 'hkjhkjh', 7, 53, '', 'lkkljkljk', 30, 17, NULL),
(146, 1, 1, 'nena.JPG,nuche.JPG,princesa.JPG,rifle.JPG', 1, 'hghjhk', 'Vacunado', 'jhkjh', 7, 53, '', 'hjhkj', 30, 19, NULL),
(147, 1, 1, 'rufo.JPG,solovino.JPG,Vainilla.JPG,Zuricata.jpeg', 1, 'miguel', 'Vacunado', 'jhkjh', 7, 53, '', 'hjhkj', 30, 19, NULL),
(149, 1, 1, 'chispitas.JPG,Dante.JPG,Fox.jpeg,mascara.JPG', 1, 'hghjhk', 'Vacunado', 'jhkjh', 7, 53, '', 'hjhkj', 30, 19, NULL),
(150, 1, 1, 'Chillon.JPG,chiribico.jpeg,chispitas.jpeg,chispitas.JPG,', 1, 'darwin', 'Vacunado', 'mbmbn', 6, 53, 'Adoptado', 'koko', 30, 17, NULL),
(151, 1, 1, 'rufo.JPG,solovino.JPG,Vainilla.JPG,Zuricata.jpeg', 2, 'chispas', 'Vacunado', 'lhgjhgj', 9, 53, 'En proceso', 'koko', 31, 17, NULL);

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
(30, 'Pitalito', 8908),
(31, 'algeciras', 3453),
(32, 'koko', 787);

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
(1, 'criollo '),
(2, 'Pincher');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(54) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(213) DEFAULT NULL,
  `tipo` enum('Administrador','Usuario','Invitado') DEFAULT NULL,
  `foto` varchar(768) DEFAULT NULL,
  `direccion` varchar(67) DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  `documento` int(11) DEFAULT NULL,
  `tipo_de_documento` enum('Cedula','Cedula Extranjera') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_roman_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password`, `tipo`, `foto`, `direccion`, `telefono`, `documento`, `tipo_de_documento`) VALUES
(44, 'victor', 'victor@gmail.com', '$2a$10$Hz/FSP3isdjQG0IU28clq.Q2hIkEQm2u7Fl49hzZHgth8oJ8Q4AVG', 'Administrador', 'rifle.JPG', 'calle 3', 2147483647, 2387654, 'Cedula'),
(45, 'victor', 'victor@gmail.com', '$2a$10$mle0X1hMr1/S4BPUYbf5F.JezZkhrv7oiWo36kw7AvlUrZmOI8zLu', 'Administrador', 'chiribico.jpeg', 'yughhj', 44654654, 123, 'Cedula'),
(47, 'kko', 'kpkp@gmail.com', '$2a$10$BlQ4CRXJRX.ynjf6QlunYOhy7KTtr0SA8M5QOtosV03vSA5JdYuhy', 'Administrador', 'nuche.JPG', 'ghfghf', 456456, 465465, 'Cedula'),
(49, 'kko', 'kpkp@gmail.com', '$2a$10$woiLTBcQvNthfDcT6dOvSeEA9WjsBn8BggGrtiGi2eYkFVupduXEa', 'Administrador', 'nuche.JPG', 'ghfghf', 456456, 465465, 'Cedula'),
(50, 'kko', 'kpkp@gmail.com', '$2a$10$/mWIayHoeFeEJompQ9xuHOzE6Ilp32f9NSpGN2CkIhtTyXRw4.l9u', 'Administrador', 'nuche.JPG', 'ghfghf', 456456, 465465, 'Cedula'),
(51, 'kko', 'kpkp@gmail.com', '$2a$10$IeAhwxyfu0ueCQ1j0J8Pu.5m7Bl.dP5eQPv10uXFlwhMZX2StA3/G', 'Administrador', 'nuche.JPG', 'ghfghf', 456456, 465465, 'Cedula'),
(53, 'manuel', 'darwin@gmail.com', '$2a$10$sq0RRxCCW634A..pUNSgG.hIBzwzCH05iTJO2o6SN601/KxZiWaL2', 'Usuario', 'Fox.jpeg', 'calle 2 barrio   jasmin', 2147483647, 2147483647, 'Cedula'),
(82, 'invitado', 'invitado@gmail.com', '$2a$10$J/GzyB9pngIMkISeQpvVqu0bh4jAvIszW.VapNZzTCsjN9eQCYF/u', 'Invitado', 'chispitas.jpeg', NULL, 0, 0, NULL);

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
(1, 'Parvo'),
(39, 'parva'),
(65, 'Ninguna');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=128;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `departamento`
--
ALTER TABLE `departamento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `genero`
--
ALTER TABLE `genero`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=153;

--
-- AUTO_INCREMENT de la tabla `municipio`
--
ALTER TABLE `municipio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `razas`
--
ALTER TABLE `razas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT de la tabla `vacunas`
--
ALTER TABLE `vacunas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

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
