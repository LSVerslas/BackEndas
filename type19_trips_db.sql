-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 22, 2024 at 08:17 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `type19_trips_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image_main` varchar(255) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `name`, `description`, `image_main`, `is_deleted`, `created_at`) VALUES
(1, 'France', 'France is a country located in Western Europe. It is known for its wine, cheese, and the Eiffel Tower.', 'france.jpg', 0, '2024-03-19 05:25:56'),
(2, 'United Kingdom', 'The United Kingdom is a country located off the northwestern coast of mainland Europe. It is made up of four countries: England, Scotland, Wales, and Northern Ireland.', 'uk.jpg', 0, '2024-03-19 05:25:56'),
(3, 'Italy', 'Italy is a country located in Southern Europe. It is known for its art, architecture, and food.', 'italy.jpg', 0, '2024-03-19 05:25:56');

-- --------------------------------------------------------

--
-- Table structure for table `trips`
--

CREATE TABLE `trips` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `country` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `rating` int(11) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `image_main` varchar(255) NOT NULL,
  `images_1` varchar(255) DEFAULT NULL,
  `images_2` varchar(255) DEFAULT NULL,
  `images_3` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trips`
--

INSERT INTO `trips` (`id`, `name`, `date`, `country`, `city`, `rating`, `description`, `price`, `is_deleted`, `user_id`, `created_at`, `image_main`, `images_1`, `images_2`, `images_3`) VALUES
(1, 'Trip to Paris', '2024-10-10', 'France', 'Paris', 5, 'Paris is the capital of France', 1000.00, 0, 23, '2024-03-14 09:43:01', 'paris1.jpg', NULL, NULL, NULL),
(2, 'Trip to London', '2021-11-10', 'United Kingdom', 'London', 4, 'London is the capital of England', 800.00, 0, 22, '2024-03-14 09:43:01', 'london1.jpg', NULL, NULL, NULL),
(3, 'Trip to Rome', '2021-12-10', 'Italy', 'Rome', 3, 'Rome is the capital of Italy', 900.00, 0, 23, '2024-03-14 09:43:01', 'rome1.jpg', NULL, NULL, NULL),
(4, 'Trip to Uzbekistan', '0204-10-09', 'Uzbekistan', 'Tumur', 4, 'Uzbekistan is very beautiful', 700.00, 0, 22, '2024-03-15 08:36:48', 'uzb1.jpg', NULL, NULL, NULL),
(5, 'Trip to Uzbekistan', '0204-10-09', 'Uzbekistan', 'Tumur', 4, 'Uzbekistan is very beautiful', 700.00, 1, 2, '2024-03-15 08:42:35', 'trip.jpg', '', '', ''),
(6, 'Trip to Jamaika', '0000-00-00', 'Jamaika', 'Mur mur', 0, '', 699.00, 1, 333, '2024-03-16 12:13:59', '', '', '', ''),
(7, 'Trip to Jamaika', '0000-00-00', 'Jamaika', 'Mur mur', 0, '', 699.00, 1, 333, '2024-03-16 12:14:22', '', '', '', ''),
(8, 'Trip to Jamaika', '0000-00-00', 'Jamaika', 'Mur mur', 0, '', 699.00, 1, 333, '2024-03-16 12:18:06', '', '', '', ''),
(9, 'Trip to Jamaika', '2024-03-21', 'Jamaika', 'Mur mur', 0, 'kazkas', 699.00, 1, 333, '2024-03-18 08:48:16', '', '', '', ''),
(10, 'Trip to Jamaika', '0000-00-00', 'Jamaika', 'Mur mur', 0, '', 699.00, 1, 333, '2024-03-18 08:50:44', '', '', '', ''),
(11, 'Trip to Jamaika', '0000-00-00', 'Jamaika', 'Mur mur', 0, '', 699.00, 1, 333, '2024-03-18 08:53:34', '', '', '', ''),
(12, 'Trip to Jamaika', '2024-03-20', 'asdasdasd', 'Mur mur', 0, 'asdasdasdasdasd', 699.00, 0, 333, '2024-03-18 09:41:37', 'jamaika1.jpg', '', '', ''),
(13, 'Trip to Uzbekistan', '0204-10-09', 'Uzbekistan', 'Tumur', 4, 'Uzbekistan is very beautiful', 700.00, 1, 2, '2024-03-18 09:49:18', 'trip.jpg', '', '', ''),
(14, 'Trip to Jamaika2', '2024-03-31', 'Jamaika', 'Beach', 4, 'Trip to Jamaika2', 699.00, 0, 333, '2024-03-19 07:47:25', 'jamaika2.jpg', '', '', ''),
(15, 'Trip to Jamaika', '2024-03-29', 'Jamaika', 'Mur mur', 0, 'Trip to Jamaika', 699.00, 1, 333, '2024-03-19 07:50:42', 'jamaika2.jpg', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`) VALUES
(21, 'James', 'james@hashas.com', '$2b$10$gLSrsRfh5KDdpJz7wlyZLOXffScON1d7xAesOIfUPxXX1nmcjzIy.', '2024-03-21 06:53:37'),
(22, 'James', 'james@bond.com', '$2b$10$opCTZriEm8Q328c8AVYt5u9Sqy1KL0XRMNrymnnjoVJ9W.apVtZGi', '2024-03-21 06:54:06'),
(23, '', 'James@kazkas.com', '$2b$10$F7dv89fe3LoKk78tb/wLJuf4DAuOJDLB3ikYVkRP0bO6rt0mG28nK', '2024-03-21 07:46:17'),
(26, 'Jane D.', 'Jane@dow.com', '$2b$10$iybzUmjczYP2DMW3m6PE3OINV/ZbOnW7ytRlYSnJq8UnrBKpI.pkK', '2024-03-22 06:34:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trips`
--
ALTER TABLE `trips`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `trips`
--
ALTER TABLE `trips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
