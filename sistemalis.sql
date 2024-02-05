SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `sistemalis` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `sistemalis`;

CREATE TABLE IF NOT EXISTS `analisis` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_orden` int(10) UNSIGNED DEFAULT NULL,
  `id_examen` int(10) UNSIGNED DEFAULT NULL,
  `id_estado` int(10) UNSIGNED DEFAULT NULL,
  `descripcion` varchar(250) DEFAULT NULL,
  `id_muestra` int(10) UNSIGNED DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `estado` (`id_estado`) USING BTREE,
  KEY `examenAnalisis` (`id_examen`),
  KEY `ordenAnalisis` (`id_orden`),
  KEY `muestraAnalisis` (`id_muestra`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='tabla que une los examenes con las ordenes de trabajo';

CREATE TABLE IF NOT EXISTS `ciudad` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) DEFAULT NULL,
  `id_provincia` int(10) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `provincia` (`id_provincia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `determinacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `id_estado` int(11) UNSIGNED DEFAULT NULL,
  `id_valoresReferencia` int(10) DEFAULT NULL,
  `id_unidadMedida` int(10) UNSIGNED DEFAULT NULL,
  `observaciones` varchar(250) DEFAULT NULL,
  `id_usuario` int(10) UNSIGNED DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `estadoDeterminacion` (`id_estado`),
  KEY `unidadMedidaDeterminacion` (`id_unidadMedida`),
  KEY `usuarioDeterminacion` (`id_usuario`),
  KEY `valoresReferenciaDeterminacion` (`id_valoresReferencia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='tabla para las determinaciones';

CREATE TABLE IF NOT EXISTS `diagnostico` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) DEFAULT NULL,
  `detalle` varchar(300) DEFAULT NULL,
  `codigo` varchar(20) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `estados` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `examendeterminacion` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_examen` int(10) UNSIGNED DEFAULT NULL,
  `id_determinacion` int(10) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `examenExamen` (`id_examen`),
  KEY `examenDeterminacion` (`id_determinacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `examenes` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) DEFAULT NULL,
  `codigo` varchar(10) DEFAULT NULL,
  `id_estado` int(10) UNSIGNED DEFAULT NULL,
  `tiempo` int(10) UNSIGNED DEFAULT NULL,
  `id_usuario` int(10) UNSIGNED DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `estadoExamen` (`id_estado`),
  KEY `usuarioExamen` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='tabla de examenes';

CREATE TABLE IF NOT EXISTS `examentipomuestra` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_examen` int(10) UNSIGNED DEFAULT NULL,
  `id_tipoMuestra` int(10) UNSIGNED DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `examenes` (`id_examen`),
  KEY `examenTipoMuestra` (`id_tipoMuestra`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `mensaje` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(10) UNSIGNED DEFAULT NULL,
  `mensaje` text DEFAULT NULL,
  `timestamp` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `usuarioMensaje` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `muestras` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_tipoMuestra` int(10) UNSIGNED DEFAULT NULL,
  `id_paciente` int(10) UNSIGNED DEFAULT NULL,
  `id_orden` int(10) UNSIGNED DEFAULT NULL,
  `id_usuario` int(10) UNSIGNED DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `tipoMuestra` (`id_tipoMuestra`),
  KEY `pacienteMuestra` (`id_paciente`),
  KEY `ordenMuestra` (`id_orden`),
  KEY `usuarioMuestra` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='tabla para cargar las muestras solicitadas para un examen';

CREATE TABLE IF NOT EXISTS `orden` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_paciente` int(10) UNSIGNED DEFAULT NULL,
  `id_diagnostico` int(10) UNSIGNED DEFAULT NULL,
  `id_estado` int(10) UNSIGNED DEFAULT NULL,
  `fechaResultados` date DEFAULT NULL,
  `observaciones` varchar(200) DEFAULT NULL,
  `id_usuario` int(11) UNSIGNED DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `diagnostico` (`id_diagnostico`),
  KEY `pacienteOrden` (`id_paciente`),
  KEY `usuarioOrden` (`id_usuario`),
  KEY `ordenEstado` (`id_estado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='tabla para las ordenes de trabajo';

CREATE TABLE IF NOT EXISTS `paciente` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) DEFAULT NULL,
  `apellido` varchar(250) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `dni` int(50) DEFAULT NULL,
  `telefono` int(50) DEFAULT NULL,
  `direccion` varchar(250) DEFAULT NULL,
  `ciudadId` int(10) UNSIGNED DEFAULT NULL,
  `nacimiento` date DEFAULT NULL,
  `embarazo` tinyint(1) DEFAULT 0 COMMENT '0 para no - 1 para si',
  `usuarioId` int(10) UNSIGNED DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `emailPaciente` (`email`),
  KEY `ciudadPaciente` (`ciudadId`),
  KEY `usuarioPaciente` (`usuarioId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='tabla de pacientes';

CREATE TABLE IF NOT EXISTS `provincia` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `resultados` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_determinacion` int(10) DEFAULT NULL,
  `resultado` float UNSIGNED DEFAULT NULL,
  `id_usuario` int(10) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `resultadosUsuario` (`id_usuario`),
  KEY `resultadoDeterminacion` (`id_determinacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `tipomuestra` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `id_usuario` int(10) UNSIGNED DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `tipoMuestraUsuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='tabla para agregar los distintos tipos de muestras';

CREATE TABLE IF NOT EXISTS `unidadmedida` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `abreviatura` varchar(20) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `dni` int(50) DEFAULT NULL,
  `telefono` int(50) UNSIGNED DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `rol` varchar(50) DEFAULT NULL,
  `permiso` int(10) UNSIGNED DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `id_ciudad` int(10) UNSIGNED DEFAULT NULL,
  `nacimiento` date DEFAULT NULL,
  `id_estado` int(10) UNSIGNED DEFAULT NULL,
  `imagenPerfil` varchar(100) DEFAULT NULL,
  `id_usuario` int(10) UNSIGNED DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `ciudadUsuario` (`id_ciudad`),
  KEY `estadoUsuario` (`id_estado`),
  KEY `usuarioCreadoPor` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='tabla de usuarios de la app';

CREATE TABLE IF NOT EXISTS `valoresreferencia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `genero` varchar(10) DEFAULT 'ambos',
  `edadMin` int(10) UNSIGNED DEFAULT NULL,
  `edadMax` int(10) UNSIGNED DEFAULT NULL,
  `valorMin` double DEFAULT NULL,
  `valorMax` float DEFAULT NULL,
  `embarazo` tinyint(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


ALTER TABLE `analisis`
  ADD CONSTRAINT `estadoAnalisis` FOREIGN KEY (`id_estado`) REFERENCES `estados` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `examenAnalisis` FOREIGN KEY (`id_examen`) REFERENCES `examenes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `muestraAnalisis` FOREIGN KEY (`id_muestra`) REFERENCES `muestras` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ordenAnalisis` FOREIGN KEY (`id_orden`) REFERENCES `orden` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `ciudad`
  ADD CONSTRAINT `provincia` FOREIGN KEY (`id_provincia`) REFERENCES `provincia` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `determinacion`
  ADD CONSTRAINT `estadoDeterminacion` FOREIGN KEY (`id_estado`) REFERENCES `estados` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `unidadMedidaDeterminacion` FOREIGN KEY (`id_unidadMedida`) REFERENCES `unidadmedida` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuarioDeterminacion` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `valoresReferenciaDeterminacion` FOREIGN KEY (`id_valoresReferencia`) REFERENCES `valoresreferencia` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `examendeterminacion`
  ADD CONSTRAINT `examenDeterminacion` FOREIGN KEY (`id_determinacion`) REFERENCES `determinacion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `examenExamen` FOREIGN KEY (`id_examen`) REFERENCES `examenes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `examenes`
  ADD CONSTRAINT `estadoExamen` FOREIGN KEY (`id_estado`) REFERENCES `estados` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuarioExamen` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `examentipomuestra`
  ADD CONSTRAINT `examenTipoMuestra` FOREIGN KEY (`id_tipoMuestra`) REFERENCES `tipomuestra` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `examenes` FOREIGN KEY (`id_examen`) REFERENCES `examenes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `mensaje`
  ADD CONSTRAINT `usuarioMensaje` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `muestras`
  ADD CONSTRAINT `ordenMuestra` FOREIGN KEY (`id_orden`) REFERENCES `orden` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pacienteMuestra` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tipoMuestra` FOREIGN KEY (`id_tipoMuestra`) REFERENCES `tipomuestra` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuarioMuestra` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `orden`
  ADD CONSTRAINT `diagnostico` FOREIGN KEY (`id_diagnostico`) REFERENCES `diagnostico` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ordenEstado` FOREIGN KEY (`id_estado`) REFERENCES `estados` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pacienteOrden` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuarioOrden` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `paciente`
  ADD CONSTRAINT `ciudadPaciente` FOREIGN KEY (`ciudadId`) REFERENCES `ciudad` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuarioPaciente` FOREIGN KEY (`usuarioId`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `resultados`
  ADD CONSTRAINT `resultadoDeterminacion` FOREIGN KEY (`id_determinacion`) REFERENCES `determinacion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `resultadosUsuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `tipomuestra`
  ADD CONSTRAINT `tipoMuestraUsuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `usuario`
  ADD CONSTRAINT `ciudadUsuario` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudad` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `estadoUsuario` FOREIGN KEY (`id_estado`) REFERENCES `estados` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuarioCreadoPor` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
