-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql-leotoloza.alwaysdata.net
-- Generation Time: Jul 03, 2024 at 04:05 AM
-- Server version: 10.6.16-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `leotoloza_sistemalis`
--
CREATE DATABASE IF NOT EXISTS `leotoloza_sistemalis` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `leotoloza_sistemalis`;

-- --------------------------------------------------------

--
-- Table structure for table `analisis`
--

CREATE TABLE `analisis` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_orden` int(10) UNSIGNED DEFAULT NULL,
  `id_examen` int(10) UNSIGNED DEFAULT NULL,
  `id_estado` int(10) UNSIGNED DEFAULT NULL,
  `descripcion` varchar(250) DEFAULT NULL,
  `id_muestra` int(10) UNSIGNED DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='tabla que une los examenes con las ordenes de trabajo';

--
-- Dumping data for table `analisis`
--

INSERT INTO `analisis` (`id`, `id_orden`, `id_examen`, `id_estado`, `descripcion`, `id_muestra`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 2, 'Presion alta', 12, '2024-01-09 16:42:02', '2024-01-09 16:46:31'),
(2, 2, 1, 3, 'El paciente no respira bien', 13, '2024-01-09 17:48:38', '2024-02-15 20:12:12'),
(3, 3, 3, 4, 'El paciente no respira bien', 13, '2024-01-09 17:50:41', '2024-02-10 16:14:48'),
(4, 4, 1, 2, '', 12, '2024-01-15 18:46:24', '2024-02-10 12:01:26'),
(5, 5, 3, 6, '', 14, '2024-01-15 18:56:20', '2024-01-15 18:56:20'),
(8, 6, 1, 2, 'Presion alta', NULL, '2024-02-10 16:14:20', '2024-02-10 16:14:20'),
(9, 6, 2, 2, 'Presion alta', NULL, '2024-02-10 16:14:20', '2024-02-10 16:14:20'),
(10, 7, 1, 3, 'El paciente no respira bien', 13, '2024-02-11 16:49:35', '2024-02-11 16:49:35'),
(11, 7, 2, 3, 'El paciente no respira bien', 13, '2024-02-11 16:49:35', '2024-02-11 16:49:35'),
(12, 7, 3, 3, 'El paciente no respira bien', 13, '2024-02-11 16:49:35', '2024-02-11 16:49:35'),
(13, 8, 2, 2, '', 12, '2024-02-15 20:23:51', '2024-02-15 20:23:51');

-- --------------------------------------------------------

--
-- Table structure for table `ciudad`
--

CREATE TABLE `ciudad` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(200) DEFAULT NULL,
  `id_provincia` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ciudad`
--

INSERT INTO `ciudad` (`id`, `nombre`, `id_provincia`) VALUES
(1, 'Aguada de las Ánimas', 18),
(2, 'Alto Pelado', 18),
(3, 'Alto Pencoso', 18),
(4, 'Anchorena', 18),
(5, 'Árbol Solo', 18),
(6, 'Arizona', 18),
(7, 'Bagual', 18),
(8, 'Bajada Nueva', 18),
(9, 'Bajo de Véliz', 18),
(10, 'Balcarce', 18),
(11, 'Balde', 18),
(12, 'Balde de Azcurra', 18),
(13, 'Balde de Escudero', 18),
(14, 'Balde de La Isla', 18),
(15, 'Balde de Los Torres', 18),
(16, 'Balde de Quines', 18),
(17, 'Balde de Retamo', 18),
(18, 'Balde del Carmen', 18),
(19, 'Baldecito', 18),
(20, 'Baldecito de la Pampa', 18),
(21, 'Baldecito de los Torres', 18),
(22, 'Bañadito Viejo', 18),
(23, 'Bañado de Cautana', 18),
(24, 'Barrancas Altas', 18),
(25, 'Batavia', 18),
(26, 'Beazley', 18),
(27, 'Bella Estancia', 18),
(28, 'Boca del Tigre', 18),
(29, 'Buen Orden', 18),
(30, 'Buena Esperanza', 18),
(31, 'Buenos Aires', 18),
(32, 'Cabeza de Novillo', 18),
(33, 'Cabeza de Vaca', 18),
(34, 'Cafferata - Varela', 18),
(35, 'Canal Norte', 18),
(36, 'Candelaria', 18),
(37, 'Cañada de la Negra', 18),
(38, 'Cañada Honda', 18),
(39, 'Cañada Honda de Guzman', 18),
(40, 'Carolina', 18),
(41, 'Carpintería', 18),
(42, 'Casa de los Tigres', 18),
(43, 'Casa de San Luis', 18),
(44, 'Casimiro Gómez', 18),
(45, 'Cazador', 18),
(46, 'Cerrito Blanco', 18),
(47, 'Cerro de Oro', 18),
(48, 'Cerros Largos', 18),
(49, 'Charlone', 18),
(50, 'Chischaca', 18),
(51, 'Chosmes', 18),
(52, 'Colonia Don Antonio', 18),
(53, 'Colonia Zubelzu', 18),
(54, 'Comunidad Huarpe', 18),
(55, 'Comunidad Ranquel', 18),
(56, 'Concarán', 18),
(57, 'Córdoba', 18),
(58, 'Coronel Alzogaray', 18),
(59, 'Cortaderas', 18),
(60, 'Cruz de Piedra', 18),
(61, 'Desaguadero', 18),
(62, 'Dónovan', 18),
(63, 'El  Fortin', 18),
(64, 'El Algarrobal (Ayacucho)', 18),
(65, 'El Algarrobal (Chacabuco)', 18),
(66, 'El Arenal', 18),
(67, 'El Baldecito-Cerros Largos', 18),
(68, 'El Barrial', 18),
(69, 'El Cadillo', 18),
(70, 'El Calden', 18),
(71, 'El Chañar', 18),
(72, 'El Charabón', 18),
(73, 'El Chorrillo', 18),
(74, 'El Datilero', 18),
(75, 'El Duraznito', 18),
(76, 'El Durazno', 18),
(77, 'El Durazno Bajo', 18),
(78, 'El Estanquito', 18),
(79, 'El Fortín', 18),
(80, 'El Gigante - La Calera', 18),
(81, 'El Guanaco', 18),
(82, 'El Injerto', 18),
(83, 'El Milagro', 18),
(84, 'El Molino', 18),
(85, 'El Morro', 18),
(86, 'El Paraguay', 18),
(87, 'El Paraíso', 18),
(88, 'El Puesto', 18),
(89, 'El Ramblón', 18),
(90, 'El Recodo', 18),
(91, 'El Recuerdo', 18),
(92, 'El Retamo', 18),
(93, 'El Rincón', 18),
(94, 'El Saladillo', 18),
(95, 'El Sauce', 18),
(96, 'El Señuelo', 18),
(97, 'El Sifón', 18),
(98, 'El Tala', 18),
(99, 'El Trapiche', 18),
(100, 'El Vinagrillo', 18),
(101, 'El Volcán', 18),
(102, 'El Zapallar', 18),
(103, 'Eleodoro Lobos', 18),
(104, 'Embalse San Felipe', 18),
(105, 'Estancia de Amieva', 18),
(106, 'Estancia Grande', 18),
(107, 'Estancia las Lagunitas', 18),
(108, 'Fortín El Patria', 18),
(109, 'Fortuna', 18),
(110, 'Foster', 18),
(111, 'Fraga', 18),
(112, 'Gral. Urquiza', 18),
(113, 'Hualtarán', 18),
(114, 'Huertas', 18),
(115, 'Inti Huasi', 18),
(116, 'Jarilla', 18),
(117, 'Juan Jorba', 18),
(118, 'Juan Llerena', 18),
(119, 'Juan W. Gez', 18),
(120, 'Juana Koslay', 18),
(121, 'Justo Daract', 18),
(122, 'La Aguada', 18),
(123, 'La Aguada de Belgrano', 18),
(124, 'La Aguada de Junin', 18),
(125, 'La Aguada de Pedernera', 18),
(126, 'La Angelina', 18),
(127, 'La Aveniencia', 18),
(128, 'La Bajada (Ayacucho)', 18),
(129, 'La Bajada (Pringles)', 18),
(130, 'La Botija', 18),
(131, 'La Brea', 18),
(132, 'La Cañada', 18),
(133, 'La Celestina', 18),
(134, 'La Cocha', 18),
(135, 'La Cumbre', 18),
(136, 'La Esquina', 18),
(137, 'La Florida', 18),
(138, 'La Lomita', 18),
(139, 'La Majada', 18),
(140, 'La Maroma', 18),
(141, 'La Médula', 18),
(142, 'La Paz - Córdoba', 18),
(143, 'La Petra', 18),
(144, 'La Punilla', 18),
(145, 'La Punta', 18),
(146, 'La Ramada', 18),
(147, 'La Represita', 18),
(148, 'La Salvadora', 18),
(149, 'La Sirena', 18),
(150, 'La Toma', 18),
(151, 'La Totora', 18),
(152, 'La tranca', 18),
(153, 'La Verde', 18),
(154, 'La Vertiente', 18),
(155, 'La Vertiente de Belgrano', 18),
(156, 'Lafinur', 18),
(157, 'Laguna Larga', 18),
(158, 'Las Aguadas', 18),
(159, 'Las Barrancas', 18),
(160, 'Las Barranquitas', 18),
(161, 'Las Caldenadas', 18),
(162, 'Las Cañas', 18),
(163, 'Las Chacras', 18),
(164, 'Las Chacras Juana Koslay', 18),
(165, 'Las Chilcas', 18),
(166, 'Las Huertas', 18),
(167, 'Las Isletas', 18),
(168, 'Las Lagunas', 18),
(169, 'Las Lagunitas', 18),
(170, 'Las Lagunitas de Ayacucho', 18),
(171, 'Las Palomas', 18),
(172, 'Las Pircas (Virorco)', 18),
(173, 'Las Rosas', 18),
(174, 'Las Vertientes de Belgrano', 18),
(175, 'Las Vertientes de San Martin', 18),
(176, 'Las Vizcacheras', 18),
(177, 'Lavaisse', 18),
(178, 'Leandro N Alem', 18),
(179, 'Liborio Luna', 18),
(180, 'Loma Alta', 18),
(181, 'Lomas Blancas', 18),
(182, 'Los Algarrobos Blancos', 18),
(183, 'Los Cajones', 18),
(184, 'Los Chañares', 18),
(185, 'Los Chañares', 18),
(186, 'Los Comederos', 18),
(187, 'Los Lobos', 18),
(188, 'Los Molles', 18),
(189, 'Los Overos', 18),
(190, 'Los Pejes', 18),
(191, 'Los Piquillines', 18),
(192, 'Los Puquios', 18),
(193, 'Los Quebrachos', 18),
(194, 'Los Quemados', 18),
(195, 'Los Ramblones', 18),
(196, 'Luján', 18),
(197, 'Mármol Verde', 18),
(198, 'Martín de Loyola', 18),
(199, 'Masmota', 18),
(200, 'Merlo', 18),
(201, 'Mesilla del Cura', 18),
(202, 'Nahuel Mapá', 18),
(203, 'Naranjo Esquino', 18),
(204, 'Naschel', 18),
(205, 'Navia', 18),
(206, 'Nogolí', 18),
(207, 'Nueva Escocia', 18),
(208, 'Nueva Galia', 18),
(209, 'Ojo Del Río', 18),
(210, 'Pampa del Tamborero', 18),
(211, 'Pampa Grande', 18),
(212, 'Papagayos', 18),
(213, 'Paraje el Churrasco', 18),
(214, 'Paso del Rey', 18),
(215, 'Paso Grande', 18),
(216, 'Piedra Blanca', 18),
(217, 'Piedra Bola', 18),
(218, 'Piedras Anchas', 18),
(219, 'Pioneros Siglo XXI', 18),
(220, 'Poste de Hierro', 18),
(221, 'Potrerillos', 18),
(222, 'Potrero de los Funes', 18),
(223, 'Pozo Cavado', 18),
(224, 'Pozo del Carril', 18),
(225, 'Pozo del Molle', 18),
(226, 'Pozo del Tala', 18),
(227, 'Puente la Horqueta', 18),
(228, 'Puerta Colorada', 18),
(229, 'Puesto Balzora', 18),
(230, 'Punta de la Loma', 18),
(231, 'Punta Del Agua', 18),
(232, 'Quebrada de San Vicente', 18),
(233, 'Quines', 18),
(234, 'Renca', 18),
(235, 'Represa del Carmen', 18),
(236, 'Represa del Chañar', 18),
(237, 'Rincón del Carmen', 18),
(238, 'Río Grande', 18),
(239, 'Río Juan Gómez', 18),
(240, 'Río Quinto', 18),
(241, 'Rodeo de Cadenas', 18),
(242, 'Ruta Nac. 148 y Prov. 5', 18),
(243, 'Ruta Nac. 7 Prov. 14', 18),
(244, 'Saladillo', 18),
(245, 'Salinas del Bebedero', 18),
(246, 'San Antonio', 18),
(247, 'San Felipe', 18),
(248, 'San Fernando', 18),
(249, 'San Francisco', 18),
(250, 'San Ignacio', 18),
(251, 'San Isidro', 18),
(252, 'San Jerónimo', 18),
(253, 'San José de los Chañares', 18),
(254, 'San José del Morro', 18),
(255, 'San Luis', 18),
(256, 'San Martín', 18),
(257, 'San Martín del Alto Negro', 18),
(258, 'San Miguel', 18),
(259, 'San Miguel - Candelaria', 18),
(260, 'San Pablo', 18),
(261, 'San Pedro', 18),
(262, 'San Roque', 18),
(263, 'San Roque de Chipiscú', 18),
(264, 'Santa  Isabel', 18),
(265, 'Santa Ana', 18),
(266, 'Santa Bárbara', 18),
(267, 'Santa Isabel', 18),
(268, 'Santa Martina', 18),
(269, 'Santa Rosa', 18),
(270, 'Santa Rosa del Cantantal', 18),
(271, 'Santa Rosa del Conlara', 18),
(272, 'Santa Rosa del Gigante', 18),
(273, 'Santa Teresita', 18),
(274, 'Santo Domingo', 18),
(275, 'Suyuque Nuevo', 18),
(276, 'Tala Verde', 18),
(277, 'Talita', 18),
(278, 'Tilisarao', 18),
(279, 'Toro Negro', 18),
(280, 'Travesía', 18),
(281, 'Unión', 18),
(282, 'Valle de Pancanta', 18),
(283, 'Villa de la Quebrada', 18),
(284, 'Villa del Carmen', 18),
(285, 'Villa Gral Roca - Los Manantiales', 18),
(286, 'Villa Larca', 18),
(287, 'Villa Mercedes', 18),
(288, 'Villa Praga', 18),
(289, 'Villa Reynolds', 18),
(290, 'Villa Salles', 18),
(291, 'Zanjitas', 18),
(292, 'Córdoba (capital de la provincia)', 5),
(293, 'Villa Carlos Paz', 5),
(294, 'Río Cuarto', 5),
(295, 'Alta Gracia', 5),
(296, 'Villa María', 5),
(297, 'Jesús María', 5),
(298, 'La Falda', 5),
(299, 'Cosquín', 5),
(300, 'Villa Allende', 5),
(301, 'San Francisco', 5),
(302, 'Bell Ville', 5),
(303, 'Villa General Belgrano', 5),
(304, 'San Marcos Sierras', 5),
(305, 'Capilla del Monte', 5),
(306, 'Villa Giardino', 5),
(307, 'Colonia Caroya', 5),
(308, 'Rio Tercero', 5),
(309, 'Unquillo', 5),
(310, 'Mina Clavero', 5),
(311, 'Rio Ceballos', 5),
(312, 'Santa Rosa (capital de la provincia)', 10),
(313, 'General Pico', 10),
(314, 'Toay', 10),
(315, 'Eduardo Castex', 10),
(316, 'General Acha', 10),
(317, 'Victorica', 10),
(318, 'Macachín', 10),
(319, 'Quemú Quemú', 10),
(320, 'Guatraché', 10),
(321, 'Realicó', 10),
(322, 'Santa Isabel', 10),
(323, 'Parera', 10),
(324, 'Bernasconi', 10),
(325, 'Trenel', 10),
(326, 'Jacinto Arauz', 10),
(327, 'Winifreda', 10),
(328, 'Catriló', 10),
(329, 'Anguil', 10),
(330, 'Intendente Alvear', 10),
(331, 'Doblas', 10),
(332, 'Mendoza (capital de la provincia)', 12),
(333, 'Godoy Cruz', 12),
(334, 'Guaymallén', 12),
(335, 'Las Heras', 12),
(336, 'Maipú', 12),
(337, 'San Rafael', 12),
(338, 'Luján de Cuyo', 12),
(339, 'Malargüe', 12),
(340, 'San Martín', 12),
(341, 'Tunuyán', 12),
(342, 'Rivadavia', 12),
(343, 'General Alvear', 12),
(344, 'Junín', 12),
(345, 'La Paz', 12),
(346, 'Tupungato', 12),
(347, 'Lavalle', 12),
(348, 'General San Martín', 12),
(349, 'San Carlos', 12),
(350, 'Santa Rosa', 12),
(351, 'Las Heras', 12),
(352, 'San Juan (capital de la provincia)', 17),
(353, 'Rawson', 17),
(354, 'Pocito', 17),
(355, 'Rivadavia', 17),
(356, 'Chimbas', 17),
(357, 'Santa Lucía', 17),
(358, 'Caucete', 17),
(359, 'Albardón', 17),
(360, '9 de Julio', 17),
(361, '25 de Mayo', 17),
(362, 'Sarmiento', 17),
(363, 'Valle Fértil', 17),
(364, 'Iglesia', 17),
(365, 'Jáchal', 17),
(366, 'Calingasta', 17),
(367, 'Ullum', 17),
(368, 'Zonda', 17),
(369, 'San Martín', 17);

-- --------------------------------------------------------

--
-- Table structure for table `determinacion`
--

CREATE TABLE `determinacion` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `id_estado` int(11) UNSIGNED DEFAULT NULL,
  `id_valoresReferencia` int(10) DEFAULT NULL,
  `id_unidadMedida` int(10) UNSIGNED DEFAULT NULL,
  `observaciones` varchar(250) DEFAULT NULL,
  `id_usuario` int(10) UNSIGNED DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='tabla para las determinaciones';

--
-- Dumping data for table `determinacion`
--

INSERT INTO `determinacion` (`id`, `nombre`, `id_estado`, `id_valoresReferencia`, `id_unidadMedida`, `observaciones`, `id_usuario`, `createdAt`, `updatedAt`) VALUES
(1, 'Glóbulos rojos', 2, 1, 38, 'Los valores son para un paciente sano', 1, '2023-11-26 18:22:20', '2024-02-11 14:54:19'),
(2, 'Glóbulos blancos  ', 2, 2, 38, 'Los valores son para un paciente sano', 3, '2023-12-01 22:21:00', '2024-02-11 14:54:27'),
(3, 'Conteo de Plaquetas', 2, 3, 38, 'Los valores son para un paciente sano', 3, '2023-12-03 21:27:15', '2024-02-15 20:16:55');

-- --------------------------------------------------------

--
-- Table structure for table `diagnostico`
--

CREATE TABLE `diagnostico` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(250) DEFAULT NULL,
  `detalle` varchar(300) DEFAULT NULL,
  `codigo` varchar(20) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `diagnostico`
--

INSERT INTO `diagnostico` (`id`, `nombre`, `detalle`, `codigo`, `createdAt`, `updatedAt`) VALUES
(1, 'Diabetes', 'Es una enfermedad en la que hay un desequilibrio en los niveles de azúcar en la sangre y de hormona insulina en el organismo.', 'D1', '2023-12-11 20:46:53', NULL),
(2, 'Hipertensión', 'Es un trastorno médico grave que puede incrementar el riesgo de enfermedades cardiovasculares, cerebrales, renales y otras.', 'H1', '2023-12-11 20:46:53', NULL),
(3, 'Asma', 'Es una enfermedad caracterizada por el estrechamiento de las vías respiratorias, por lo general reversible, en respuesta a ciertos estímulos.', 'A1', '2023-12-11 20:46:53', NULL),
(4, 'Depresión', 'Es un trastorno del estado de ánimo que se puede describir como sentimientos de tristeza, pérdida o ira que interfieren con las actividades de la vida diaria de una persona.', 'DP1', '2023-12-11 20:46:53', NULL),
(5, 'Ansiedad', 'Es una emoción normal y a menudo saludable. Sin embargo, cuando una persona siente niveles desproporcionados de ansiedad con frecuencia, podría convertirse en un trastorno médico.', 'AN1', '2023-12-11 20:46:53', NULL),
(6, 'Infección del tracto urinario', 'Es una afección frecuente, y a menudo dolorosa, que sufren muchas personas, sobre todo mujeres, en algún momento de sus vidas.', 'ITU1', '2023-12-11 20:46:53', NULL),
(7, 'Infección respiratoria', 'Es una infección que surge en cualquier región del tracto respiratorio, alcanzando desde las vías aéreas superiores o altas, como las narinas, garganta o senos paranasales, hasta las vías aéreas inferiores o bajas como bronquios y pulmones.', 'IR1', '2023-12-11 20:46:53', NULL),
(8, 'Artritis', 'La artritis reumatoide (AR) provoca inflamación y dolor articular. Se produce cuando el sistema inmunitario no funciona adecuadamente y ataca el recubrimiento de las articulaciones, llamado sinovio', 'AR1', '2023-12-11 20:46:53', NULL),
(9, 'Enfermedad cardíaca', 'El término cáncer es el nombre común que recibe un conjunto de enfermedades relacionadas en las que se observa un proceso descontrolado en la división de las células del cuerpo', 'EC1', '2023-12-11 20:46:53', NULL),
(10, 'Cáncer', 'El cáncer es el crecimiento descontrolado de las células de su cuerpo. Las células son los pequeños bloques de construcción de su cuerpo', 'C1', '2023-12-11 20:46:53', NULL),
(11, 'Enfermedad de Parkinson', 'Es un trastorno degenerativo (progresivo) del sistema nervioso central y pertenece al grupo de trastornos del movimiento. Produce la destrucción de células nerviosas de unas estructuras del cerebro llamadas ganglios basales. Es una enfermedad crónica, es decir que no hay cura y persiste durante déca', 'EP1', '2023-12-11 21:23:19', NULL),
(12, 'Enfermedad inflamatoria intestinal (EII)', 'Es una enfermedad crónica de causa desconocida en la que se produce inflamación del colon y/o intestino delgado y que se presenta en forma de brotes. Engloba dos entidades, la colitis ulcerosa y la enfermedad de Crohn', 'EII1', '2023-12-11 21:23:19', NULL),
(13, 'Enfermedad de Crohn', 'Es una enfermedad crónica que causa inflamación e irritación en el tubo digestivo. La enfermedad de Crohn afecta con más frecuencia al intestino delgado y el comienzo del intestino grueso', 'EC2', '2023-12-11 21:23:19', NULL),
(14, 'Colitis ulcerosa', 'Es una enfermedad inflamatoria intestinal que provoca inflamación y úlceras (llagas) en el tracto digestivo. Afecta el recubrimiento más profundo del intestino grueso, también denominado colon, y el recto', 'CU1', '2023-12-11 21:23:19', NULL),
(15, 'Enfermedad celíaca', 'Es una reacción del sistema inmunológico al consumo de gluten, una proteína que se encuentra en el trigo, la cebada y el centeno', 'EC3', '2023-12-11 21:23:19', NULL),
(16, 'Síndrome del intestino irritable (SII)', 'Es un trastorno frecuente, que se encuentra dentro de los disturbios funcionales del aparato digestivo. En estos desórdenes predominan los síntomas crónicos que pueden ser muy intensos y comprometer la calidad de vida del paciente, sin que se pueda demostrar daño o lesión significativa en el aparato', 'SII1', '2023-12-11 21:23:19', NULL),
(17, 'Enfermedad de Graves', 'Es un tipo de hipertiroidismo, es debida a una actividad excesiva de toda la glándula tiroides. Se la denominó así en honor a Robert Graves, un médico Irlandés, quien fue el primero en describir esta forma de hipertiroidismo, hace aproximadamente 150 años', 'EG1', '2023-12-11 21:23:19', NULL),
(18, 'Hipotiroidismo', 'Es el nombre que se da cuando la glándula tiroides funciona deficientemente, produciendo menos hormonas de las necesarias para el control de nuestro metabolismo. La principal causa es la tiroiditis de Hashimoto ( enfermedad de Hashimoto )', 'H2', '2023-12-11 21:23:19', NULL),
(19, 'Hipertiroidismo', 'Se caracteriza por hipermetabolismo y aumento de las concentraciones séricas de hormonas tiroideas libres. Los síntomas incluyen palpitaciones, cansancio, pérdida de peso, intolerancia al calor, ansiedad y temblores', 'H3', '2023-12-11 21:23:19', NULL),
(20, 'Enfermedad de Addison', 'Es el término utilizado para referirse a la insuficiencia adrenal primaria. Esta condición es poco común y se caracteriza por un déficit crónico de glucocorticoides y/o mineralocorticoides. La principal causa es autoinmune, pero también puede haber etiologías infecciosas, neoplásicas, genéticas o ia', 'EA2', '2023-12-11 21:23:19', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `estados`
--

CREATE TABLE `estados` (
  `id` int(11) UNSIGNED NOT NULL,
  `nombre` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `estados`
--

INSERT INTO `estados` (`id`, `nombre`) VALUES
(1, 'Desactivado'),
(2, 'Activo'),
(3, 'Esperando Toma de Muestra'),
(4, 'Analítica'),
(5, 'Pendiente de Recepción'),
(6, 'Pendiente de Etiquetado'),
(7, 'Etiquetado Completo'),
(8, 'Registro de Resultados'),
(9, 'Revisión de Resultados'),
(10, 'Para Validar'),
(11, 'Informada'),
(12, 'Cancelada');

-- --------------------------------------------------------

--
-- Table structure for table `examenDeterminacion`
--

CREATE TABLE `examenDeterminacion` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_examen` int(10) UNSIGNED DEFAULT NULL,
  `id_determinacion` int(10) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `examenDeterminacion`
--

INSERT INTO `examenDeterminacion` (`id`, `id_examen`, `id_determinacion`, `createdAt`, `updatedAt`) VALUES
(3, 1, 1, '2023-11-29 22:06:54', '2023-11-29 22:06:54'),
(5, 1, 2, '2023-12-01 22:44:16', '2023-12-01 22:44:16'),
(6, 2, 1, '2023-12-27 23:46:13', '2023-12-27 23:46:13'),
(7, 2, 2, '2023-12-27 23:46:13', '2023-12-27 23:46:13'),
(8, 2, 3, '2023-12-27 23:46:13', '2023-12-27 23:46:13'),
(13, 3, 1, '2024-01-15 18:57:30', '2024-01-15 18:57:30'),
(14, 3, 2, '2024-01-15 18:57:30', '2024-01-15 18:57:30');

-- --------------------------------------------------------

--
-- Table structure for table `examenes`
--

CREATE TABLE `examenes` (
  `id` int(11) UNSIGNED NOT NULL,
  `nombre` varchar(250) DEFAULT NULL,
  `codigo` varchar(10) DEFAULT NULL,
  `id_estado` int(10) UNSIGNED DEFAULT NULL,
  `tiempo` int(10) UNSIGNED DEFAULT NULL,
  `id_usuario` int(10) UNSIGNED DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='tabla de examenes';

--
-- Dumping data for table `examenes`
--

INSERT INTO `examenes` (`id`, `nombre`, `codigo`, `id_estado`, `tiempo`, `id_usuario`, `createdAt`, `updatedAt`) VALUES
(1, 'Hepatograma', 'HPT', 2, 10, 3, '2023-11-25 09:23:40', '2024-02-13 00:40:56'),
(2, 'Hemograma', 'HM', 2, 1, 3, '2023-11-29 00:43:52', '2024-02-13 00:41:00'),
(3, 'Cardio-Respiratorio', 'CR', 2, 3, 4, '2024-01-02 19:16:21', '2024-02-13 00:41:04');

-- --------------------------------------------------------

--
-- Table structure for table `examenTipoMuestra`
--

CREATE TABLE `examenTipoMuestra` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_examen` int(10) UNSIGNED DEFAULT NULL,
  `id_tipoMuestra` int(10) UNSIGNED DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `examenTipoMuestra`
--

INSERT INTO `examenTipoMuestra` (`id`, `id_examen`, `id_tipoMuestra`, `createdAt`, `updatedAt`) VALUES
(14, 1, 1, '2023-11-29 22:06:54', '2023-11-29 22:06:54'),
(15, 2, 1, '2023-12-27 23:46:13', '2023-12-27 23:46:13'),
(24, 3, 3, '2024-01-15 18:57:30', '2024-01-15 18:57:30'),
(25, 3, 4, '2024-01-15 18:57:30', '2024-01-15 18:57:30');

-- --------------------------------------------------------

--
-- Table structure for table `mensaje`
--

CREATE TABLE `mensaje` (
  `id` int(11) NOT NULL,
  `id_usuario` int(10) UNSIGNED DEFAULT NULL,
  `mensaje` text DEFAULT NULL,
  `timestamp` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mensaje`
--

INSERT INTO `mensaje` (`id`, `id_usuario`, `mensaje`, `timestamp`) VALUES
(1, 1, 'Hola', '2024-02-04 15:11:43'),
(2, 1, 'Como va?', '2024-02-04 15:12:10'),
(3, 2, 'todo bien?', '2024-02-04 15:12:16'),
(4, 2, 'chau', '2024-02-04 15:12:28'),
(5, 2, 'Hola de nuevo', '2024-02-04 15:14:17'),
(6, 1, 'hola', '2024-02-04 15:51:13'),
(7, 1, 'dfg', '2024-02-04 15:52:48'),
(8, 1, 'Hola', '2024-02-04 16:07:40'),
(9, 1, '', '2024-02-04 22:03:21'),
(10, 1, 'hgffgh', '2024-02-05 21:17:35'),
(11, 1, 'Holaaaa', '2024-02-05 21:18:00'),
(12, 1, 'Holaa', '2024-02-05 21:20:01'),
(13, 2, 'holaaa', '2024-02-05 21:20:22'),
(14, 1, 'Hola, soy el Administrador', '2024-02-16 00:38:59'),
(15, 3, 'Hola, soy Pedro', '2024-02-16 00:39:16'),
(16, 2, 'Hola', '2024-02-16 00:52:07'),
(17, 3, 'xfgdfg', '2024-02-16 00:52:25'),
(18, 1, 'Hola soy el administrador', '2024-02-16 00:59:30'),
(19, 3, 'Hola como estas?', '2024-02-16 00:59:42'),
(20, 3, 'Hola soy pedro', '2024-02-16 01:10:15'),
(21, 1, 'Hola pedro, soy el admin', '2024-02-16 01:10:30'),
(0, 1, 'Holaaaaa', '2024-02-16 22:30:53'),
(0, 3, 'Hola', '2024-02-16 22:31:00'),
(0, 3, 'soy pedro', '2024-02-16 22:31:03'),
(0, 1, 'Hola Pedro, como estas?', '2024-02-16 22:31:18'),
(0, 1, 'che necesito los resultados de las ordenes de un paciente', '2024-02-16 22:31:41'),
(0, 3, 'que paciente necesitas?', '2024-02-16 22:31:54'),
(0, 1, 'la orden 6 de Emanuel Adorni', '2024-02-16 22:32:54'),
(0, 1, 'dale dale', '2024-02-16 22:33:03'),
(0, 3, 'ahi te mando los resultados', '2024-02-16 22:33:17'),
(0, 2, 'Holaaa', '2024-04-24 02:47:35'),
(0, 2, 'Que onda?', '2024-04-24 02:47:45'),
(0, 2, '1', '2024-04-24 02:48:29'),
(0, 2, 'holoa', '2024-04-24 02:48:42'),
(0, 2, 'asdasdas', '2024-04-24 02:48:47'),
(0, 2, 'dsdsddsfdf', '2024-04-24 02:48:51'),
(0, 2, 'fdsfs', '2024-04-24 02:48:52'),
(0, 5, 'Holaaa', '2024-04-24 02:49:08'),
(0, 2, 'holoa', '2024-04-24 02:49:16'),
(0, 5, 'Hola', '2024-06-02 22:36:13'),
(0, 2, 'Hola', '2024-06-02 22:36:57'),
(0, 5, 'Como estas?', '2024-06-02 22:37:02');

-- --------------------------------------------------------

--
-- Table structure for table `muestras`
--

CREATE TABLE `muestras` (
  `id` int(11) UNSIGNED NOT NULL,
  `id_tipoMuestra` int(10) UNSIGNED DEFAULT NULL,
  `id_paciente` int(10) UNSIGNED DEFAULT NULL,
  `id_orden` int(10) UNSIGNED DEFAULT NULL,
  `id_usuario` int(10) UNSIGNED DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='tabla para cargar las muestras solicitadas para un examen';

--
-- Dumping data for table `muestras`
--

INSERT INTO `muestras` (`id`, `id_tipoMuestra`, `id_paciente`, `id_orden`, `id_usuario`, `createdAt`, `updatedAt`) VALUES
(12, 1, 1, 1, 5, '2024-02-13 00:41:18', '2024-02-13 00:41:18'),
(13, 3, 2, 3, 5, '2024-02-13 00:41:22', '2024-02-13 00:41:22'),
(14, 4, 2, 2, 5, '2024-02-13 00:41:26', '2024-02-13 00:41:26');

-- --------------------------------------------------------

--
-- Table structure for table `orden`
--

CREATE TABLE `orden` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_paciente` int(10) UNSIGNED DEFAULT NULL,
  `id_diagnostico` int(10) UNSIGNED DEFAULT NULL,
  `id_estado` int(10) UNSIGNED DEFAULT NULL,
  `fechaResultados` date DEFAULT NULL,
  `observaciones` varchar(200) DEFAULT NULL,
  `id_usuario` int(11) UNSIGNED DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='tabla para las ordenes de trabajo';

--
-- Dumping data for table `orden`
--

INSERT INTO `orden` (`id`, `id_paciente`, `id_diagnostico`, `id_estado`, `fechaResultados`, `observaciones`, `id_usuario`, `createdAt`, `updatedAt`) VALUES
(1, 1, 2, 3, '2024-01-19', 'Presion alta', 1, '2024-01-09 16:42:02', '2024-02-13 00:39:54'),
(2, 2, 3, 2, '2024-01-11', 'El paciente no respira bien', 2, '2024-01-09 17:48:38', '2024-02-15 20:12:12'),
(3, 2, 7, 3, '2024-01-11', 'El paciente no respira bien', 2, '2024-01-09 17:50:41', '2024-02-10 16:14:48'),
(4, 1, 2, 2, '2024-01-25', '', 5, '2024-01-15 18:46:24', '2024-02-13 00:40:04'),
(5, 2, 3, 6, '2024-01-25', '', 5, '2024-01-15 18:56:19', '2024-02-13 00:40:08'),
(6, 2, 2, 2, '2024-02-20', 'Presion alta', 2, '2024-02-10 16:14:20', '2024-02-10 16:14:20'),
(7, 2, 3, 3, '2024-02-21', 'El paciente no respira bien', 2, '2024-02-11 16:49:35', '2024-02-11 16:49:35'),
(8, 1, 3, 2, '2024-02-16', '', 5, '2024-02-15 20:23:51', '2024-02-15 20:23:51');

-- --------------------------------------------------------

--
-- Table structure for table `paciente`
--

CREATE TABLE `paciente` (
  `id` int(10) UNSIGNED NOT NULL,
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
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='tabla de pacientes';

--
-- Dumping data for table `paciente`
--

INSERT INTO `paciente` (`id`, `nombre`, `apellido`, `email`, `dni`, `telefono`, `direccion`, `ciudadId`, `nacimiento`, `embarazo`, `usuarioId`, `createdAt`, `updatedAt`) VALUES
(1, 'Leonel', 'Toloza', 'leotoloza6@gmail.com', 38860057, 1133466839, 'El Poleo 1430', 41, '1995-07-24', 0, 5, '2024-01-09 16:40:46', '2024-02-13 00:41:42'),
(2, 'Emanuel', 'Adorni', 'adorniEma@gmail.com', 123456789, 1133466839, 'Juan de Videla 230', 200, '1990-01-15', 0, 5, '2024-01-09 17:47:29', '2024-02-13 00:41:46');

-- --------------------------------------------------------

--
-- Table structure for table `provincia`
--

CREATE TABLE `provincia` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `provincia`
--

INSERT INTO `provincia` (`id`, `nombre`) VALUES
(1, 'Buenos Aires'),
(2, 'Catamarca'),
(3, 'Chaco'),
(4, 'Chubut'),
(5, 'Córdoba'),
(6, 'Corrientes'),
(7, 'Entre Ríos'),
(8, 'Formosa'),
(9, 'Jujuy'),
(10, 'La Pampa'),
(11, 'La Rioja'),
(12, 'Mendoza'),
(13, 'Misiones'),
(14, 'Neuquén'),
(15, 'Río Negro'),
(16, 'Salta'),
(17, 'San Juan'),
(18, 'San Luis'),
(19, 'Santa Cruz'),
(20, 'Santa Fe'),
(21, 'Santiago del Estero'),
(22, 'Tierra del Fuego, Antártida e Islas del Atlántico '),
(23, 'Tucumán');

-- --------------------------------------------------------

--
-- Table structure for table `resultados`
--

CREATE TABLE `resultados` (
  `id` int(11) NOT NULL,
  `id_orden` int(10) UNSIGNED DEFAULT NULL,
  `id_determinacion` int(10) DEFAULT NULL,
  `resultado` float UNSIGNED DEFAULT NULL,
  `id_usuario` int(10) UNSIGNED DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `resultados`
--

INSERT INTO `resultados` (`id`, `id_orden`, `id_determinacion`, `resultado`, `id_usuario`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 5.1, 4, '2024-02-11 14:22:11', '2024-02-13 18:47:12'),
(2, 2, 2, 4.5, 4, '2024-02-11 14:22:11', '2024-02-13 18:47:20'),
(3, 3, 3, 5.6, 2, '2024-02-13 18:20:49', '2024-02-13 18:46:56'),
(4, 8, 1, 5.4, 3, '2024-02-15 20:31:27', '2024-02-15 20:31:27'),
(0, 6, 1, 5.4, 3, '2024-02-16 22:33:53', '2024-02-16 22:33:53');

-- --------------------------------------------------------

--
-- Table structure for table `tipoMuestra`
--

CREATE TABLE `tipoMuestra` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `id_usuario` int(10) UNSIGNED DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='tabla para agregar los distintos tipos de muestras';

--
-- Dumping data for table `tipoMuestra`
--

INSERT INTO `tipoMuestra` (`id`, `nombre`, `id_usuario`, `createdAt`, `updatedAt`) VALUES
(1, 'Sangre', 4, '2023-11-27 20:13:03', '2024-02-13 00:42:32'),
(2, 'Orina 24HS', 4, '2023-11-27 20:13:03', '2024-02-13 00:42:37'),
(3, 'Saliva', 4, '2024-01-02 19:14:52', '2024-02-13 00:42:41'),
(4, 'Mucosidad', 4, '2024-01-09 17:52:12', '2024-02-13 00:42:46');

-- --------------------------------------------------------

--
-- Table structure for table `unidadMedida`
--

CREATE TABLE `unidadMedida` (
  `id` int(11) UNSIGNED NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `abreviatura` varchar(20) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `unidadMedida`
--

INSERT INTO `unidadMedida` (`id`, `nombre`, `abreviatura`, `createdAt`, `updatedAt`) VALUES
(1, 'Gramos', 'g', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(2, 'Gramos por decilitro', 'g/dL', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(3, 'Gramos por litro', 'g/L', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(4, 'Microgramos', 'mcg', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(5, 'Microgramos por decilitro', 'mcg/dL', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(6, 'Microgramos por litro', 'mcg/L', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(7, 'Microkats por litro', 'mckat/L', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(8, 'Microlitros', 'mcL', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(9, 'Micromoles por litro', 'mcmol/L', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(10, 'Miliequivalentes', 'mEq', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(11, 'Miliequivalentes por litro', 'mEq/L', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(12, 'Miligramos', 'mg', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(13, 'Miligramos por decilitro', 'mg/dL', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(14, 'Miligramos por litro', 'mg/L', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(15, 'Mililitros', 'mL', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(16, 'Milímetros', 'mm', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(17, 'Milímetros de mercurio', 'mm Hg', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(18, 'Milimoles', 'mmol', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(19, 'Milimoles por litro', 'mmol/L', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(20, 'Miliosmoles por kilogramo de agua', 'mOsm/kg agua', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(21, 'Miliunidades internacionales por litro', 'mUI/L', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(22, 'Miliunidades por gramo', 'mU/g', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(23, 'Miliunidades por litro', 'mU/L', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(24, 'Nanogramos por decilitro', 'ng/dL', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(25, 'Nanogramos por litro', 'ng/L', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(26, 'Nanogramos por mililitro', 'ng/mL', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(27, 'Nanogramos por mililitro por hora', 'ng/mL/h', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(28, 'Nanomoles', 'nmol', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(29, 'Nanomoles por litro', 'nmol/L', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(30, 'Picogramos', 'pg', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(31, 'Picogramos por mililitro', 'pg/mL', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(32, 'Picomoles por litro', 'pmol/L', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(33, 'Títulos', 'Títulos', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(34, 'Unidades internacionales por litro', 'UI/L', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(35, 'Unidades internacionales por mililitro', 'UI/mL', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(36, 'Unidades por litro', 'U/L', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(37, 'Unidades por mililitro', 'U/mL', '2023-12-01 17:43:53', '2023-12-01 17:43:53'),
(38, 'células por microlitro', '(células/mcL)', '2023-12-01 17:43:53', '2023-12-01 17:43:53');

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `id` int(10) UNSIGNED NOT NULL,
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
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='tabla de usuarios de la app';

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `apellido`, `dni`, `telefono`, `email`, `password`, `rol`, `permiso`, `direccion`, `id_ciudad`, `nacimiento`, `id_estado`, `imagenPerfil`, `id_usuario`, `createdAt`, `updatedAt`) VALUES
(1, 'Administrador', 'Admin', 0, 0, 'admin@gmail.com', '$2b$10$Mo/z67FSS97FqlUWIHbb7uV5gdxBHOVdHXJeDLWYtE1jDj.acH5UW', 'administrador', 4, 'el poleo 1430', 18, '1995-07-24', 2, NULL, 1, NULL, '2024-02-13 00:43:04'),
(2, 'Leonel', 'Toloza', 38860057, 1133466839, 'leotoloza6@gmail.com', '$2b$10$gkOcBNB9v/9wfHCe81knIe6HEMCsduDBKFopLKKAFNZy1LcHbup8O', 'administrador', 4, 'Juan de Videla 230', 200, '1995-07-24', 2, NULL, 1, '2024-01-24 21:09:27', '2024-07-03 01:59:45'),
(3, 'Pedro', 'Sanchez', 32140720, 1133466839, 'pedro@gmail.com', '$2b$10$A62KD7VeMGr.izGyoAsmEOIW7XGNUeidTh6NpjjzHOzmtJXqomtAy', 'bioquimico', 3, 'Juan de Videla 230', 200, '1992-04-20', 2, NULL, 1, '2024-01-30 00:15:23', '2024-02-13 00:43:11'),
(4, 'Lucas', 'Perez', 39120159, 1133466839, 'lucasPerez@gmail.com', '$2b$10$idJOYJBrQi8NoFlZclVdtesk7mvb7NwZg8uGVVzHrmmTkJs5FAeX2', 'tecnico', 2, 'El Poleo 1430', 41, '1999-10-28', 2, NULL, 1, '2024-01-30 00:17:59', '2024-02-13 00:43:15'),
(5, 'Rafael', 'Lopez', 20148425, 2664151292, 'Rafalopez@gmail.com', '$2b$10$.yat..UQLV0NHI8ZTGrK1OW6Fjn80yp0synCtp4lX20ZbowAIF0Q.', 'usuario', 1, 'el manzano', 255, '1970-11-11', 2, NULL, 1, '2024-01-30 00:25:15', '2024-02-13 00:43:19');

-- --------------------------------------------------------

--
-- Table structure for table `valoresReferencia`
--

CREATE TABLE `valoresReferencia` (
  `id` int(11) NOT NULL,
  `genero` varchar(10) DEFAULT 'ambos',
  `edadMin` int(10) UNSIGNED DEFAULT NULL,
  `edadMax` int(10) UNSIGNED DEFAULT NULL,
  `valorMin` double DEFAULT NULL,
  `valorMax` float DEFAULT NULL,
  `embarazo` tinyint(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `valoresReferencia`
--

INSERT INTO `valoresReferencia` (`id`, `genero`, `edadMin`, `edadMax`, `valorMin`, `valorMax`, `embarazo`, `createdAt`, `updatedAt`) VALUES
(1, 'M', 16, 85, 4.7, 6.1, NULL, '2023-11-30 21:01:42', '2023-12-03 21:21:57'),
(2, 'F', 18, 75, 4.2, 5.4, NULL, '2023-11-30 21:01:42', '2023-12-03 21:22:16'),
(3, 'ambos', 18, 70, 150, 400, NULL, '2023-12-03 21:26:28', '2023-12-03 21:26:28'),
(4, 'ambos', 2, 18, 3.2, 5.5, NULL, '2024-02-11 19:03:57', '2024-02-11 19:03:57'),
(5, 'ambos', 10, 20, 3.2, 5.1, NULL, '2024-02-15 20:15:42', '2024-02-15 20:15:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `analisis`
--
ALTER TABLE `analisis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `estado` (`id_estado`) USING BTREE,
  ADD KEY `examenAnalisis` (`id_examen`),
  ADD KEY `ordenAnalisis` (`id_orden`),
  ADD KEY `muestraAnalisis` (`id_muestra`);

--
-- Indexes for table `ciudad`
--
ALTER TABLE `ciudad`
  ADD PRIMARY KEY (`id`),
  ADD KEY `provincia` (`id_provincia`);

--
-- Indexes for table `determinacion`
--
ALTER TABLE `determinacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `estadoDeterminacion` (`id_estado`),
  ADD KEY `unidadMedidaDeterminacion` (`id_unidadMedida`),
  ADD KEY `usuarioDeterminacion` (`id_usuario`),
  ADD KEY `valoresReferenciaDeterminacion` (`id_valoresReferencia`);

--
-- Indexes for table `diagnostico`
--
ALTER TABLE `diagnostico`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `estados`
--
ALTER TABLE `estados`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `examenDeterminacion`
--
ALTER TABLE `examenDeterminacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `examenExamen` (`id_examen`),
  ADD KEY `examenDeterminacion` (`id_determinacion`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
