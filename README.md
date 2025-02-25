# Art Gallery API - COMP 4513 Assignment 1

## Overview
This project is an API built with Node.js and Express that interfaces with an art database hosted on Supabase. The API provides access to information about paintings, artists, genres, galleries, and eras through various endpoints. The primary goal of this assignment is to demonstrate proficiency in building a RESTful API, querying a database, and hosting the application, my choice being Render.com.

## Technologies
- Node.js & Express for building the API server
- Supabase as the database backend
- SQL queries with Supabase Query Builder
- Render.com for hosting

## Testing Links

| API Endpoint                              | Description                           |
|------------------------------------------|--------------------------------------|
| [`/api/eras`](https://web3assignment1.onrender.com/api/eras)                               | Get all eras                          |
| [`/api/galleries`](https://web3assignment1.onrender.com/api/galleries)                          | Get all galleries                     |
| [`/api/galleries/30`](https://web3assignment1.onrender.com/api/galleries/30)                       | Get gallery with ID 30                |
| [`/api/galleries/Calgary`](https://web3assignment1.onrender.com/api/galleries/Calgary)                  | Get gallery by name 'Calgary'         |
| [`/api/galleries/country/fra`](https://web3assignment1.onrender.com/api/galleries/country/fra)              | Get galleries in countries starting with 'fra' |
| [`/api/artists`](https://web3assignment1.onrender.com/api/artists)                            | Get all artists                       |
| [`/api/artists/12`](https://web3assignment1.onrender.com/api/artists/12)                         | Get artist with ID 12                 |
| [`/api/artists/1223423`](https://web3assignment1.onrender.com/api/artists/1223423)                    | Get artist with ID 1223423            |
| [`/api/artists/search/ma`](https://web3assignment1.onrender.com/api/artists/search/ma)                  | Search artists with 'ma'              |
| [`/api/artists/search/mA`](https://web3assignment1.onrender.com/api/artists/search/mA)                  | Case-insensitive search for 'mA'      |
| [`/api/artists/country/fra`](https://web3assignment1.onrender.com/api/artists/country/fra)                | Get artists from countries starting with 'fra' |
| [`/api/paintings`](https://web3assignment1.onrender.com/api/paintings)                          | Get all paintings                     |
| [`/api/paintings/sort/year`](https://web3assignment1.onrender.com/api/paintings/sort/year)                | Sort paintings by year                |
| [`/api/paintings/63`](https://web3assignment1.onrender.com/api/paintings/63)                       | Get painting with ID 63               |
| [`/api/paintings/search/port`](https://web3assignment1.onrender.com/api/paintings/search/port)              | Search paintings with 'port'          |
| [`/api/paintings/search/pORt`](https://web3assignment1.onrender.com/api/paintings/search/pORt)              | Case-insensitive search for 'pORt'    |
| [`/api/paintings/search/connolly`](https://web3assignment1.onrender.com/api/paintings/search/connolly)          | Search paintings with 'connolly'      |
| [`/api/paintings/years/1800/1850`](https://web3assignment1.onrender.com/api/paintings/years/1800/1850)          | Get paintings from 1800 to 1850       |
| [`/api/paintings/galleries/5`](https://web3assignment1.onrender.com/api/paintings/galleries/5)              | Get paintings in gallery with ID 5    |
| [`/api/paintings/artist/16`](https://web3assignment1.onrender.com/api/paintings/artist/16)                | Get paintings by artist with ID 16    |
| [`/api/paintings/artist/666`](https://web3assignment1.onrender.com/api/paintings/artist/666)               | Get paintings by artist with ID 666   |
| [`/api/paintings/artist/country/ital`](https://web3assignment1.onrender.com/api/paintings/artist/country/ital)      | Get paintings by artists from countries starting with 'ital' |
| [`/api/genres`](https://web3assignment1.onrender.com/api/genres)                             | Get all genres                        |
| [`/api/genres/76`](https://web3assignment1.onrender.com/api/genres/76)                          | Get genre with ID 76                  |
| [`/api/genres/painting/408`](https://web3assignment1.onrender.com/api/genres/painting/408)                | Get genre for painting with ID 408    |
| [`/api/genres/painting/jsdfhg`](https://web3assignment1.onrender.com/api/genres/painting/jsdfhg)             | Invalid painting ID example           |
| [`/api/paintings/genre/78`](https://web3assignment1.onrender.com/api/paintings/genre/78)                 | Get paintings by genre with ID 78     |
| [`/api/paintings/era/2`](https://web3assignment1.onrender.com/api/paintings/era/2)                    | Get paintings by era with ID 2        |
| [`/api/counts/genres`](https://web3assignment1.onrender.com/api/counts/genres)                      | Get genre counts                      |
| [`/api/counts/artists`](https://web3assignment1.onrender.com/api/counts/artists)                     | Get artist counts                     |
| [`/api/counts/topgenres/20`](https://web3assignment1.onrender.com/api/counts/topgenres/20)                | Get top 20 genres                     |
| [`/api/counts/topgenres/2034958`](https://web3assignment1.onrender.com/api/counts/topgenres/2034958)           | Test large number for top genres      |

