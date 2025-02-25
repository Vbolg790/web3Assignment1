# Art Gallery API - COMP 4513 Assignment 1

## Overview
This project is an API built with Node.js and Express that interfaces with an art database hosted on Supabase. The API provides access to information about paintings, artists, genres, galleries, and eras through various endpoints. The primary goal of this assignment is to demonstrate proficiency in building a RESTful API, querying a database, and hosting the application, my choice being Render.com.

## Technologies
- Node.js & Express for building the API server
- Supabase as the database backend
- SQL queries with Supabase Query Builder
- Render.com for hosting

  ## API Endpoints

| Endpoint                                         | Description                                                                                                                   |
|--------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| `/api/eras`                                      | Returns all the eras                                                                                                          |
| `/api/galleries`                                 | Returns all the galleries with all the fields in the galleries table                                                           |
| `/api/galleries/ref`                             | Returns the specified gallery                                                                                                  |
| `/api/galleries/country/substring`               | Returns galleries whose `galleryCountry` (case insensitive) begins with the provided substring                                 |
| `/api/artists`                                   | Returns all the artists with all the fields in the artists table                                                               |
| `/api/artists/ref`                               | Returns the specified artist                                                       |
| `/api/artists/search/substring`                  | Returns artists whose last name (case insensitive) begins with the provided substring          |
| `/api/artists/country/substring`                 | Returns artists whose nationality (case insensitive) begins with the provided substring      |
| `/api/paintings`                                 | Returns all paintings with all fields (excluding foreign keys). Provides all artist and gallery fields, sorted by title by default |
| `/api/paintings/sort/title|year`                 | Returns all paintings, sorted by either `title` or `yearOfWork`                                                                |
| `/api/paintings/ref`                             | Returns the specified painting                                                                     |
| `/api/paintings/search/substring`                | Returns paintings whose title (case insensitive) contains the provided substring           |
| `/api/paintings/years/start/end`                 | Returns paintings between two years (inclusive), ordered by `yearOfWork`               |
| `/api/paintings/galleries/ref`                   | Returns all paintings in a given gallery                                 |
| `/api/paintings/artist/ref`                      | Returns all paintings by a given artist                                     |
| `/api/paintings/artists/country/ref`             | Returns all paintings by artists whose nationality begins with the provided substring|
| `/api/genres`                                    | Returns all genres with all the era fields                                                                                     |
| `/api/genres/ref`                                | Returns the specified genre                                                          |
| `/api/genres/painting/ref`                       | Returns the genres used in a given painting, ordered by `genreName` in ascending order       |
| `/api/paintings/genre/ref`                       | Returns paintings for a given genre  |
| `/api/paintings/era/ref`                         | Returns paintings for a given era |
| `/api/counts/genres`                             | Returns the genre name and the number of paintings for each genre, sorted by the number of paintings (fewest to most)          |
| `/api/counts/artists`                            | Returns the artist name (`firstName lastName`) and the number of paintings for each artist, sorted by the number of paintings (most to fewest) |
| `/api/counts/topgenres/ref`                      | Returns the genre name and the number of paintings for each genre, sorted by the number of paintings (most to least) for genres with more than a set number of paintings, e.g., `/api/counts/topgenres/20` |


## Testing Links

| Links                              |
|------------------------------------------|
| [`/api/eras`](https://web3assignment1.onrender.com/api/eras) |
| [`/api/galleries`](https://web3assignment1.onrender.com/api/galleries)|
| [`/api/galleries/30`](https://web3assignment1.onrender.com/api/galleries/30)|
| [`/api/galleries/Calgary`](https://web3assignment1.onrender.com/api/galleries/Calgary)|
| [`/api/galleries/country/fra`](https://web3assignment1.onrender.com/api/galleries/country/fra)|
| [`/api/artists`](https://web3assignment1.onrender.com/api/artists)|
| [`/api/artists/12`](https://web3assignment1.onrender.com/api/artists/12)|
| [`/api/artists/1223423`](https://web3assignment1.onrender.com/api/artists/1223423)|
| [`/api/artists/search/ma`](https://web3assignment1.onrender.com/api/artists/search/ma)|
| [`/api/artists/search/mA`](https://web3assignment1.onrender.com/api/artists/search/mA)|
| [`/api/artists/country/fra`](https://web3assignment1.onrender.com/api/artists/country/fra)|
| [`/api/paintings`](https://web3assignment1.onrender.com/api/paintings)|
| [`/api/paintings/sort/year`](https://web3assignment1.onrender.com/api/paintings/sort/year)|
| [`/api/paintings/63`](https://web3assignment1.onrender.com/api/paintings/63)|
| [`/api/paintings/search/port`](https://web3assignment1.onrender.com/api/paintings/search/port)|
| [`/api/paintings/search/pORt`](https://web3assignment1.onrender.com/api/paintings/search/pORt)|
| [`/api/paintings/search/connolly`](https://web3assignment1.onrender.com/api/paintings/search/connolly)|
| [`/api/paintings/years/1800/1850`](https://web3assignment1.onrender.com/api/paintings/years/1800/1850)|
| [`/api/paintings/galleries/5`](https://web3assignment1.onrender.com/api/paintings/galleries/5)|
| [`/api/paintings/artist/16`](https://web3assignment1.onrender.com/api/paintings/artist/16)|
| [`/api/paintings/artist/666`](https://web3assignment1.onrender.com/api/paintings/artist/666)
| [`/api/paintings/artist/country/ital`](https://web3assignment1.onrender.com/api/paintings/artist/country/ital)|
| [`/api/genres`](https://web3assignment1.onrender.com/api/genres)|
| [`/api/genres/76`](https://web3assignment1.onrender.com/api/genres/76)|
| [`/api/genres/painting/408`](https://web3assignment1.onrender.com/api/genres/painting/408)|
| [`/api/genres/painting/jsdfhg`](https://web3assignment1.onrender.com/api/genres/painting/jsdfhg)|
| [`/api/paintings/genre/78`](https://web3assignment1.onrender.com/api/paintings/genre/78)|
| [`/api/paintings/era/2`](https://web3assignment1.onrender.com/api/paintings/era/2)|
| [`/api/counts/genres`](https://web3assignment1.onrender.com/api/counts/genres)|
| [`/api/counts/artists`](https://web3assignment1.onrender.com/api/counts/artists)|
| [`/api/counts/topgenres/20`](https://web3assignment1.onrender.com/api/counts/topgenres/20)|
| [`/api/counts/topgenres/2034958`](https://web3assignment1.onrender.com/api/counts/topgenres/2034958)|

