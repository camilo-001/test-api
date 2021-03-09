--
-- Base de datos: `biblioteca`
CREATE DATABASE biblioteca;

-- Use biblioteca
USE biblioteca;
-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `libros`
--
CREATE TABLE `libros` (
  `libros_id` int(150) NOT NULL,
  `nombre_libro` varchar(150) NOT NULL,
  `cantidad_libro` int(150) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
--
-- Volcado de datos para la tabla `libros`
--
INSERT INTO `libros` (`libros_id`, `nombre_libro`, `cantidad_libro`)
VALUES (1, 'principito', 12),
  (3, 'cien años de soledad', 21);
-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `prestamos`
--
CREATE TABLE `prestamos` (
  `prestamos_id` int(11) NOT NULL,
  `libro_id` int(150) NOT NULL,
  `usuario_id` int(150) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `usuarios`
--
CREATE TABLE `usuarios` (
  `usuario_id` int(150) NOT NULL,
  `nombre_usuario` varchar(150) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
--
-- Volcado de datos para la tabla `usuarios`
--
INSERT INTO `usuarios` (`usuario_id`, `nombre_usuario`)
VALUES (2, 'luis');
--
-- Índices para tablas volcadas
--
--
-- Indices de la tabla `libros`
--
ALTER TABLE `libros`
ADD PRIMARY KEY (`libros_id`);
--
-- Indices de la tabla `prestamos`
--
ALTER TABLE `prestamos`
ADD PRIMARY KEY (`prestamos_id`);
--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
ADD PRIMARY KEY (`usuario_id`);
--
-- AUTO_INCREMENT de las tablas volcadas
--
--
-- AUTO_INCREMENT de la tabla `libros`
--
ALTER TABLE `libros`
MODIFY `libros_id` int(150) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 4;
--
-- AUTO_INCREMENT de la tabla `prestamos`
--
ALTER TABLE `prestamos`
MODIFY `prestamos_id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 13;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
MODIFY `usuario_id` int(150) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 3;
--
-- Restricciones para tablas volcadas
--
--
-- Filtros para la tabla `prestamos`
--
ALTER TABLE `prestamos`
ADD CONSTRAINT `libros_prestamos` FOREIGN KEY (`libro_id`) REFERENCES `libros` (`libros_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuarios_prestamos` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;