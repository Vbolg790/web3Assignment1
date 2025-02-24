require("dotenv").config();
const express = require("express");
const supa = require("@supabase/supabase-js");
const { sendResponse } = require("./sendResponse");
const app = express();

const PORT = process.env.PORT || 8080;

const supaUrl = process.env.SUPABASE_URL;
const supaAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = supa.createClient(supaUrl, supaAnonKey);

// Returns all the eras
app.get("/api/eras", async (req, res) => {
  const { data, error } = await supabase.from("eras").select();
  sendResponse(res, { data, error }, "No eras found");
});

// Returns all the galleries and all the fields from galleries table
app.get("/api/galleries", async (req, res) => {
  const { data, error } = await supabase.from("galleries").select();
  sendResponse(res, { data, error }, "No galleries found");
});

// Returns just the specified gallery using galleryId
app.get("/api/galleries/:gallery", async (req, res) => {
  const { data, error } = await supabase
    .from("galleries")
    .select()
    .eq("galleryId", req.params.gallery);
  sendResponse(
    res,
    { data, error },
    `Gallery ${req.params.gallery} not found.`
  );
});

// Returns the galleries whose galleryCountry (case insensitive) begins with the provided substring
app.get("/api/galleries/country/:country", async (req, res) => {
  const { data, error } = await supabase
    .from("galleries")
    .select()
    .ilike("galleryCountry", `${req.params.country}%`);
  sendResponse(
    res,
    { data, error },
    `No galleries found for a country starting with ${req.params.country}`
  );
});

// Returns all the artists and all the fields in the artists table
app.get("/api/artists", async (req, res) => {
  const { data, error } = await supabase.from("artists").select();
  sendResponse(res, { data, error }, "No artists found");
});

// Returns just the specified artist using artistId
app.get("/api/artists/:artists", async (req, res) => {
  const { data, error } = await supabase
    .from("artists")
    .select()
    .eq("artistId", req.params.artists);
  sendResponse(res, { data, error }, `Artist ${req.params.artists} not found`);
});

// Returns the artists whose last name (case insensitive) begins with the provided substring
app.get("/api/artists/search/:lastName", async (req, res) => {
  const { data, error } = await supabase
    .from("artists")
    .select()
    .ilike("lastName", `${req.params.lastName}%`);
  sendResponse(
    res,
    { data, error },
    `No artists found whos last name begins with ${req.params.lastName}`
  );
});

// Returns the artists whose nationality (case insensitive) begins with the provided substring
app.get("/api/artists/country/:nationality", async (req, res) => {
  const { data, error } = await supabase
    .from("artists")
    .select()
    .ilike("nationality", `${req.params.nationality}%`);
  sendResponse(
    res,
    { data, error },
    `No artists found with nationality starting with ${req.params.nationality}`
  );
});

// Returns all the paintings ( return all the fields in the paintings table, but not the foreign keys) by default, sort by title
app.get("/api/paintings", async (req, res) => {
  const { data, error } = await supabase
    .from("paintings")
    .select(
      `*, artist:artists (*),
      gallery:galleries (*)`
    )
    .order("title", { ascending: true });
  sendResponse(res, { data, error }, "No paintings found");
});

// Returns all the paintings, sorted by either title or yearOfWork
app.get("/api/paintings/sort/:sortBy", async (req, res) => {
  const sortBy = req.params.sortBy === "year" ? "yearOfWork" : "title";

  const { data, error } = await supabase
    .from("paintings")
    .select(
      `*, artist:artists (*),
      gallery:galleries (*)`
    )
    .order(sortBy, { ascending: true });

  sendResponse(res, { data, error }, "No paintings found");
});

// Returns just the specified painting
app.get("/api/paintings/:paintingId", async (req, res) => {
  const { data, error } = await supabase
    .from("paintings")
    .select(`*, artist:artists (*), gallery:galleries (*)`)
    .eq("paintingId", req.params.paintingId);
  // .single();

  sendResponse(
    res,
    { data, error },
    `No painting found with id ${req.params.paintingId}`
  );
});

// Returns the paintings whose title (case insensitive) contains the provided substring
app.get("/api/paintings/search/:substring", async (req, res) => {
  const { data, error } = await supabase
    .from("paintings")
    .select(`*, artist:artists (*), gallery:galleries (*)`)
    .ilike("title", `%${req.params.substring}%`)
    .order("title", { ascending: true });

  sendResponse(
    res,
    { data, error },
    `No paintings found with titles containing "${req.params.substring}".`
  );
});

// Returns the paintings between two years (include the paintings in the provided years), ordered by yearOfWork
app.get("/api/paintings/years/:startYear/:endYear", async (req, res) => {
  const startYear = parseInt(req.params.startYear, 10);
  const endYear = parseInt(req.params.endYear, 10);

  if (isNaN(startYear) || isNaN(endYear)) {
    return res.status(400).json({
      error: "Both start and end years need to be a number",
    });
  }
  if (endYear < startYear) {
    return res.status(400).json({
      error:
        "End year is earlier than start year, please enter a valid year range",
    });
  }

  const { data, error } = await supabase
    .from("paintings")
    .select(`*, artist:artists (*), gallery:galleries (*)`)
    .gte("yearOfWork", startYear)
    .lte("yearOfWork", endYear)
    .order("yearOfWork", { ascending: true });

  sendResponse(
    res,
    { data, error },
    `No paintings found between the years ${startYear} and ${endYear}`
  );
});

// Returns all the paintings in a given gallery using the galleryId field
app.get("/api/paintings/galleries/:galleryId", async (req, res) => {
  const { data, error } = await supabase
    .from("paintings")
    .select(`*, artist:artists (*), gallery:galleries (*)`)
    .eq("galleryId", req.params.galleryId)
    .order("title", { ascending: true });

  sendResponse(
    res,
    { data, error },
    `No paintings found for gallery id ${req.params.galleryId}`
  );
});

// Returns all the paintings by a given artist useing the artistId field
app.get("/api/paintings/artist/:artistId", async (req, res) => {
  const { data, error } = await supabase
    .from("paintings")
    .select(`*, artist:artists (*), gallery:galleries (*)`)
    .eq("artistId", req.params.artistId)
    .order("title", { ascending: true });

  sendResponse(
    res,
    { data, error },
    `No paintings found for artist id ${req.params.artistId}`
  );
});

// Returns all the paintings by artists whose nationality begins with the provided substring
app.get("/api/paintings/artists/country/:nationality", async (req, res) => {
  const { data, error } = await supabase
    .from("paintings")
    .select(`*, artist:artists (*), gallery:galleries (*)`)
    .ilike("artist.nationality", `${req.params.nationality}%`)
    .order("title", { ascending: true });

  sendResponse(
    res,
    { data, error },
    `No paintings found for artists with nationality starting with "${req.params.nationality}"`
  );
});

// Returns all the genres. For this and the following genres requests, don’t just provide the foreign keys for era; instead provide all the era fields
app.get("/api/genres", async (req, res) => {
  const { data, error } = await supabase
    .from("genres")
    .select(
      `
      *,
      era:eras (*)
    `
    )
    .order("genreName", { ascending: true });

  sendResponse(res, { data, error }, "No genres found");
});

// Returns just the specified genre using genreId
app.get("/api/genres/:genreId", async (req, res) => {
  const { data, error } = await supabase
    .from("genres")
    .select(
      `
      *,
      era:eras (*)
    `
    )
    .eq("genreId", req.params.genreId);

  sendResponse(res, { data, error }, `Genre ${req.params.genreId} not found`);
});

// Returns the genres used in a given painting (order by genreName in ascending order)
app.get("/api/genres/paintings/:paintingId", async (req, res) => {
  const { data, error } = await supabase
    .from("paintinggenres")
    .select(
      `
      genre:genres (*, era:eras (*))
    `
    )
    .eq("paintingId", req.params.paintingId)
    .order("genre(genreName)", { ascending: true });

  sendResponse(
    res,
    { data, error },
    `No genres found for painting ${req.params.paintingId}`
  );
});

// Returns all the paintings for a given genre using genreId, return just paitningId, title, and yearOfWork. Sort by yearOfWor
app.get("/api/paintings/genre/:genreId", async (req, res) => {
  const { data, error } = await supabase
    .from("paintinggenres")
    .select(`paintings:paintings (paintingId, title, yearOfWork)`)
    .eq("genreId", req.params.genreId)
    .order("paintings(yearOfWork)", {
      ascending: true,
    });
  sendResponse(
    res,
    { data, error },
    `No paintings found for genre ${req.params.genreId}`
  );
});

// Returns all the paintings for a given era useing the eraId field, return just the paintingId, title, and yearOfWork. Sort by yearOfWork
app.get("/api/paintings/era/:eraId", async (req, res) => {
  const { data, error } = await supabase
    .from("paintings")
    .select("paintingId, title, yearOfWork")
    .eq("eraId", req.params.eraId);

  const sortedData = data.sort((a, b) => a.yearOfWork - b.yearOfWork);

  sendResponse(
    res,
    { data: sortedData, error },
    `No paintings found for era ${req.params.eraId}`
  );
});

// Returns the genre name and the number of paintings for each genre, sorted by the number of paintings (fewest to most)
// reduce and how to use it was taken from this site: https://www.geeksforgeeks.org/count-occurrences-of-all-items-in-an-array-in-javascript/
app.get("/api/counts/genres", async (req, res) => {
  const { data, error } = await supabase
    .from("paintinggenres")
    .select("genre:genres (genreName), paintingId");

  const genreCounts = data.reduce((acc, { genre }) => {
    if (genre?.genreName) {
      acc[genre.genreName] = (acc[genre.genreName] || 0) + 1;
    }
    return acc;
  });

  const sortedData = Object.entries(genreCounts)
    .map(([genreName, count]) => ({ genreName, count }))
    .sort((a, b) => a.count - b.count);

  sendResponse(res, { data: sortedData, error }, "No genre counts found");
});

// Returns the artist name (first name space last name) and the number of paintings for each artist, sorted by the number of paintings (most to fewest)
app.get("/api/counts/artists", async (req, res) => {
  const { data: paintingArtists, error } = await supabase
    .from("paintings")
    .select("artist:artists (firstName, lastName), paintingId");

  const artistPaintingCounts = paintingArtists.reduce(
    (artistCountMap, { artist }) => {
      if (artist?.firstName && artist?.lastName) {
        const artistName = `${artist.firstName} ${artist.lastName}`;
        artistCountMap[artistName] = (artistCountMap[artistName] || 0) + 1;
      }
      return artistCountMap;
    }
  );

  const sortedArtistCounts = Object.entries(artistPaintingCounts)
    .map(([artistName, paintingCount]) => ({ artistName, paintingCount }))
    .sort((a, b) => b.paintingCount - a.paintingCount);

  sendResponse(
    res,
    { data: sortedArtistCounts, error },
    "No artist painting counts found"
  );
});

// Returns the genre name and the number of paintings for each genre, sorted by the number of paintings (most to least) for genres having over some set number of paintings
app.get("/api/counts/topgenres/:minCount", async (req, res) => {
  const minCount = parseInt(req.params.minCount, 10);

  const { data: paintingGenres, error } = await supabase
    .from("paintinggenres")
    .select("genre:genres (genreName), paintingId");

  const genrePaintingCounts = paintingGenres.reduce(
    (genreCountMap, { genre }) => {
      if (genre?.genreName) {
        genreCountMap[genre.genreName] =
          (genreCountMap[genre.genreName] || 0) + 1;
      }
      return genreCountMap;
    },
    {}
  );

  const filteredAndSortedGenres = Object.entries(genrePaintingCounts)
    .map(([genreName, paintingCount]) => ({ genreName, paintingCount }))
    .filter(({ paintingCount }) => paintingCount > minCount)
    .sort((a, b) => b.paintingCount - a.paintingCount);

  sendResponse(
    res,
    { data: filteredAndSortedGenres, error },
    `No genres found with more than ${minCount} paintings`
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
