-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Úte 16. bře 2021, 16:22
-- Verze serveru: 10.4.16-MariaDB
-- Verze PHP: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `jdmarket`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `description` text NOT NULL,
  `price` int(255) NOT NULL,
  `rating` int(255) NOT NULL,
  `vehicle` varchar(256) NOT NULL,
  `makeYear` int(255) NOT NULL,
  `kilometers` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Vypisuji data pro tabulku `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `rating`, `vehicle`, `makeYear`, `kilometers`) VALUES
(1, 'Honda Civic', 'Honda Civic is great car', 10000, 5, 'Honda', 1997, 50000),
(2, 'Lexus IS300', 'Some random text lazy am', 17500, 3, 'Lexus', 1998, 150000),
(3, 'Mazda RX7', 'Legend it is', 100000, 4, 'Mazda', 1992, 78000),
(4, 'Mitsubishi Evolution VIII', 'One hella of a car', 75000, 5, 'Mitsubishi', 2003, 5000),
(5, 'Nissan Skyline R32 GTR', 'Ma love', 95000, 5, 'Nissan', 1989, 65000),
(6, 'Subaru Impreza WRX', 'Love this car too, but I need to test out lower ratings too', 30000, 2, 'Subaru', 2000, 19000),
(7, 'Suzuki Ignis', 'Fuck this shit', 5, 1, 'Suzuki', 2016, 25000),
(8, 'Toyota Supra', 'Sutututu', 100000, 5, 'Toyota', 1993, 47000);

-- --------------------------------------------------------

--
-- Struktura tabulky `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` char(64) NOT NULL,
  `password` varchar(256) NOT NULL,
  `email` varchar(320) NOT NULL,
  `cart` varchar(535) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Vypisuji data pro tabulku `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `email`, `cart`) VALUES
(15, 'admin', '$2b$10$Sm2.vSbgIIhudckjpI6/o.iF8.xsB2UV0HVtTokuyYDl/oba3nova', 'admin@jdmarket.com', '');

--
-- Klíče pro exportované tabulky
--

--
-- Klíče pro tabulku `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Klíče pro tabulku `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pro tabulku `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
