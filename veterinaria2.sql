-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 15-07-2024 a las 22:06:07
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.1.10

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
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int NOT NULL,
  `nombre` varchar(67) COLLATE  utf8mb4_roman_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE= utf8mb4_roman_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`) VALUES
(1, 'Pequeña'),
(2, 'Grande'),
(3, 'Mediano');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genero`
--

CREATE TABLE `genero` (
  `id` int NOT NULL,
  `nombre` varchar(67) COLLATE  utf8mb4_roman_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE= utf8mb4_roman_ci;

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
  `id` int NOT NULL,
  `raza` int NOT NULL,
  `categoria_id` int NOT NULL,
  `foto` varchar(45) COLLATE  utf8mb4_roman_ci NOT NULL,
  `genero_id` int NOT NULL,
  `nombre_mas` varchar(34) COLLATE  utf8mb4_roman_ci DEFAULT NULL,
  `id_vacuna` int NOT NULL,
  `descripcion` varchar(87) COLLATE  utf8mb4_roman_ci DEFAULT NULL,
  `estado` enum('Por Adoptar','Adoptado','Pendiente') COLLATE  utf8mb4_roman_ci DEFAULT NULL,
  `edad` int NOT NULL,
  `usuario` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE= utf8mb4_roman_ci;

--
-- Volcado de datos para la tabla `mascotas`
--

INSERT INTO `mascotas` (`id`, `raza`, `categoria_id`, `foto`, `genero_id`, `nombre_mas`, `id_vacuna`, `descripcion`, `estado`, `edad`, `usuario`) VALUES
(25, 1, 1, 'IMG-20220810-WA0004.jpg', 1, 'too', 1, 'esta al pelo', 'Pendiente', 12, NULL),
(26, 1, 1, 'IMG-20220810-WA0004.jpg', 1, 'too', 1, 'esta al pelo', 'Pendiente', 12, NULL),
(27, 1, 1, 'IMG-20220810-WA0004.jpg', 1, 'too', 1, 'esta al pelo', 'Pendiente', 12, NULL),
(30, 1, 1, 'IMG-20220810-WA0004.jpg', 1, 'too', 1, 'esta al pelo', 'Adoptado', 12, NULL),
(33, 1, 1, 'IMG-20220810-WA0004.jpg', 1, 'too', 1, 'esta al pelo', 'Pendiente', 12, NULL),
(44, 1, 2, 'logo_original.png', 2, 'lola', 2, 'juegueton', 'Adoptado', 3, NULL),
(46, 1, 2, 'logo_original.png', 2, 'lola', 2, 'juegueton', 'Por Adoptar', 3, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `razas`
--

CREATE TABLE `razas` (
  `id` int NOT NULL,
  `nombre_r` varchar(23) COLLATE  utf8mb4_roman_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE= utf8mb4_roman_ci;

--
-- Volcado de datos para la tabla `razas`
--

INSERT INTO `razas` (`id`, `nombre_r`) VALUES
(1, 'Pincher'),
(2, 'Criollo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int NOT NULL,
  `nombre` varchar(54) COLLATE  utf8mb4_roman_ci NOT NULL,
  `email` varchar(64) COLLATE  utf8mb4_roman_ci NOT NULL,
  `password` varchar(45) COLLATE  utf8mb4_roman_ci NOT NULL,
  `tipo` enum('Administrador','Usuario') COLLATE  utf8mb4_roman_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE= utf8mb4_roman_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password`, `tipo`) VALUES
(1, 'migule london', 'jose@gmail.com', '1243', NULL),
(2, 'Darwin Alexis Guerrero', 'darwin@gmail.com', '1324', 'Administrador'),
(3, ' Alexis Guerrero', 'darwin@gmail.com', '1324', 'Administrador'),
(4, 'alejandro', 'mdbaos0@misena.edu.co', '465', 'Administrador'),
(5, 'alejandro', 'mdbaos0@misena.edu.co', '123', 'Administrador'),
(6, 'alejandro', 'mdbaos0@misena.edu.co', '123', 'Administrador'),
(7, 'alejandro', 'mdbaos0@misena.edu.co', '67', 'Administrador'),
(8, ' Alexis Guerrero', 'darwin@gmail.com', '1324', 'Administrador'),
(9, 'alejandro', 'mdbaos0@misena.edu.co', '98', 'Administrador'),
(10, 'luis', 'mdbaos0@misena.edu.co', '9876', 'Usuario'),
(11, 'alejandro', 'mdbaos0@misena.edu.co', '234567', 'Administrador'),
(12, 'maria', 'mdbaos0@misena.edu.co', '123456', 'Usuario'),
(13, 'alejandro', 'mdbaos0@misena.edu.co', '98754', 'Administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vacunas`
--

CREATE TABLE `vacunas` (
  `id` int NOT NULL,
  `nombre` varchar(78) DEFAULT NULL,
  `id_mascota` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_roman_ci;

--
-- Volcado de datos para la tabla `vacunas`
--

INSERT INTO `vacunas` (`id`, `nombre`, `id_mascota`) VALUES
(2, 'Rabia', 7);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
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
  ADD KEY `id_vacuna` (`id_vacuna`);

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
  ADD KEY `vacuna` (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `genero`
--
ALTER TABLE `genero`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT de la tabla `razas`
--
ALTER TABLE `razas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `vacunas`
--
ALTER TABLE `vacunas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD CONSTRAINT `adopcion` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `mascotas_ibfk_1` FOREIGN KEY (`raza`) REFERENCES `razas` (`id`),
  ADD CONSTRAINT `mascotas_ibfk_2` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`),
  ADD CONSTRAINT `mascotas_ibfk_3` FOREIGN KEY (`genero_id`) REFERENCES `genero` (`id`);

--
-- Filtros para la tabla `vacunas`
--
ALTER TABLE `vacunas`
  ADD CONSTRAINT `vacunas_ibfk_1` FOREIGN KEY (`id`) REFERENCES `mascotas` (`id_vacuna`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
