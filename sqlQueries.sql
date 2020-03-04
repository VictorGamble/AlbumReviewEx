
CREATE DATABASE albums;


CREATE TABLE album (id serial PRIMARY KEY,
                                      name text NOT NULL,
                                                artist text, year_released timestamp,
                                                                           genre text);


INSERT INTO album (name, artist, year_released, genre)
VALUES ('My Turn',
        'Lil Baby',
        '2020-02-28 12:30:00',
        'Rap'), ('Anyways',
                 'Young Nudy',
                 '2020-02-24 12:30:00',
                 'Trap'), ('P.E.M.F.B.A',
                           'Roddy Rich',
                           '2019-12-06 12:30:00',
                           'trap'), ('F*ck the World',
                                     'Brent Faiyaz',
                                     '2020-02-07 12:30:00',
                                     'R&B'), ('Drip Season 3',
                                              'Gunna',
                                              '2018-02-02 12:00:00',
                                              'hip-hop');


CREATE TABLE reviews (id serial PRIMARY KEY,
                                        name text NOT NULL,
                                                  title varchar, stars int, review varchar, reviewer_id int, album_id int);


CREATE TABLE reviewers (id serial PRIMARY KEY,
                                          name text NOT NULL,
                                                    email varchar, karma int, review_id int);


SELECT name
From album;


SELECT a.name,
       a.artist,
       a.year_released,
       a.genre,
       re.name,
       re.stars,
       re.review
FROM reviews re
INNER JOIN album a ON re.album_id = a.id;

