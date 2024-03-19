-- lentele

CREATE TABLE trips (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    country VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    rating INT NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT 0,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image_main VARCHAR(255) NOT NULL,
    images_1 VARCHAR(255),
    images_2 VARCHAR(255),
    images_3 VARCHAR(255)
);

-- keletas irasu
INSERT INTO trips (name, date, country, city, rating, description, price, user_id, image_main ) 
VALUES 
('Trip to Paris', '2024-10-10', 'France', 'Paris', 5, 'Paris is the capital of France', 1000, 1, 'paris.jpg'),
('Trip to London', '2021-11-10', 'United Kingdom', 'London', 4, 'London is the capital of England', 800, 1, 'London.jpg'),
('Trip to Rome', '2021-12-10', 'Italy', 'Rome', 3, 'Rome is the capital of Italy', 900, 2, 'Rome.jpg');

-- create table countries with id, name, capital, population, area, flag, description, is_deleted, created_at
-- create table countries with id, name, description, image_main, is_deleted created_at

CREATE TABLE countries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_main VARCHAR(255) NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- keletas irasu
INSERT INTO countries (name, description, image_main)
VALUES 
('France', 'France is a country located in Western Europe. It is known for its wine, cheese, and the Eiffel Tower.', 'france.jpg'),
('United Kingdom', 'The United Kingdom is a country located off the northwestern coast of mainland Europe. It is made up of four countries: England, Scotland, Wales, and Northern Ireland.', 'uk.jpg'),
('Italy', 'Italy is a country located in Southern Europe. It is known for its art, architecture, and food.', 'italy.jpg');