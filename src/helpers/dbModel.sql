CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
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

-- add more trips
INSERT INTO trips (name, date, country, city, rating, description, price, user_id, image_main )
VALUES 
('Trip to Madrid', '2021-12-10', 'Spain', 'Madrid', 4, 'Madrid is the capital of Spain', 900, 2, 'Madrid.jpg'),
('Trip to Berlin', '2021-12-10', 'Germany', 'Berlin', 3, 'Berlin is the capital of Germany', 900, 2, 'Berlin.jpg'),
('Trip to Athens', '2021-12-10', 'Greece', 'Athens', 3, 'Athens is the capital of Greece', 900, 2, 'Athens.jpg'), 
('Trip to Paris', '2024-10-10', 'France', 'Paris', 5, 'Paris is the capital of France', 1000, 1, 'paris2.jpg'),
('Trip to London', '2021-11-10', 'United Kingdom', 'London', 4, 'London is the capital of England', 800, 1, 'London.jpg'),
('Trip to Rome', '2021-12-10', 'Italy', 'Rome', 3, 'Rome is the capital of Italy', 900, 2, 'Rome2.jpg'),
('Trip to Madrid', '2021-12-10', 'Spain', 'Madrid', 4, 'Madrid is the capital of Spain', 900, 2, 'Madrid.jpg'),
('Trip to Berlin', '2021-12-10', 'Germany', 'Berlin', 3, 'Berlin is the capital of Germany', 900, 2, 'Berlin.jpg'),
('Trip to Athens', '2021-12-10', 'Greece', 'Athens', 3, 'Athens is the capital of Greece', 900, 2, 'Athens.jpg');

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

-- add more countries
INSERT INTO countries (name, description, image_main)
VALUES 
('Spain', 'Spain is a country located in Southern Europe. It is known for its beaches, flamenco music, and bullfighting.', 'spain.jpg'),
('Germany', 'Germany is a country located in Central Europe. It is known for its beer, sausages, and castles.', 'germany.jpg'),
('Greece', 'Greece is a country located in Southern Europe. It is known for its ancient ruins, beaches, and olives.', 'greece.jpg');



-- get all trips with user email
SELECT trips.id,trips.name,trips.date,trips.country,trips.city,trips.rating,trips.description,trips.price,trips.user_id,trips.image_main,trips.images_1,trips.images_2,trips.images_3, users.email
FROM trips
LEFT JOIN users
ON trips.user_id = users.id
WHERE trips.is_deleted = 0

-- get all trips for single country by id 
SELECT trips.id,trips.name,trips.date,trips.country,trips.city,trips.rating,trips.description,trips.price,trips.user_id,trips.image_main,trips.images_1,trips.images_2,trips.images_3
FROM trips
RIGHT JOIN countries
ON trips.country = countries.name
WHERE countries.id = 2 AND trips.is_deleted = 0


-- sukurti Likes lentele su id, trip_id, user_id, created_at
CREATE TABLE likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    trip_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);