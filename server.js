const express = require("express");
const supa = require("@supabase/supabase-js");
const { sendResponse } = require("./sendResponse");
const app = express();

const supaUrl = "https://sfvihxfzaqgavtycqrui.supabase.co";
const supaAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmdmloeGZ6YXFnYXZ0eWNxcnVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxNjc1MDMsImV4cCI6MjA1NTc0MzUwM30.XFmoYT2gEaWYssnKp260crQ3Bsxingxqz8dXiqUbddc";

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
// app.get("/api/paintings", async (req, res) => {
//   const result = await supabase
//     .from("paintings")
//     .select(paintings(), galleries(), artists())
//     .order("title", { ascending: true });
//   sendResponse(res, result, "No paintings found");
// });

// Returns all the paintings, sorted by either title or yearOfWork
// app.get("/api/paintings/sort/:sortBy", async (req, res) => {
//   const sortBy = req.params.sortBy === "year" ? "yearOfWork" : "title";

//   const { data, error } = await supabase
//     .from("paintings")
//     .select()
//     .order(sortBy, { ascending: true });

//   res.send(data);
// });

// Returns just the specified painting

// Returns the paintings whose title (case insensitive) contains the provided substring

// Returns the paintings between two years (include the paintings in the provided years), ordered by yearOfWork

// Returns all the paintings in a given gallery using the galleryId field

// Returns all the paintings by a given artist useing the artistId field

// Returns all the paintings by artists whose nationality begins with the provided substring

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
    .eq("paintingId", req.params.paintingId);

  const sortedData = data.sort((a, b) =>
    a.genre.genreName.localeCompare(b.genre.genreName)
  );

  sendResponse(
    res,
    { data: sortedData, error },
    `No genres found for painting ${req.params.paintingId}`
  );
});

// Returns all the paintings for a given genre using genreId, return just paitningId, title, and yearOfWork

// Returns all the paintings for a given era useing the eraId field, return just the paintingId, title, and yearOfWork. Sort by yearOfWork

// Returns the genre name and the number of paintings for each genre, sorted by the number of paintings (fewest to most)

// Returns the artist name (first name space last name) and the number of paintings for each artist, sorted by the number of paintings (most to fewest)

// Returns the genre name and the number of paintings for each genre, sorted by the number of paintings (most to least) for genres having over some set number of paintings

app.listen(8080, () => {
  console.log("TEEHEE");
});
