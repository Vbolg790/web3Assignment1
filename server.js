const express = require("express");
const supa = require("@supabase/supabase-js");
const app = express();

const supaUrl = "https://sfvihxfzaqgavtycqrui.supabase.co";
const supaAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmdmloeGZ6YXFnYXZ0eWNxcnVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxNjc1MDMsImV4cCI6MjA1NTc0MzUwM30.XFmoYT2gEaWYssnKp260crQ3Bsxingxqz8dXiqUbddc";

const supabase = supa.createClient(supaUrl, supaAnonKey);

// Returns all the eras
app.get("/api/eras", async (req, res) => {
  try {
    const { data, error } = await supabase.from("eras").select();

    if (error) return res.status(500).json({ error: `${error.message}` });
    if (!data || data.length === 0) {
      return res.status(404).json({ error: "No eras found" });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

// Returns all the galleries and all the fields from galleries table
app.get("/api/galleries", async (req, res) => {
  try {
    const { data, error } = await supabase.from("galleries").select();

    if (error) return res.status(500).json({ error: `${error.message}` });
    if (!data || data.length === 0) {
      return res.status(404).json({ error: "No galleries found" });
    }
    res.send(data);
  } catch (err) {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

// Returns just the specified gallery using galleryId
app.get("/api/galleries/:gallery", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("galleries")
      .select()
      .eq("galleryId", req.params.gallery);

    if (error) return res.status(500).json({ error: `${error.message}` });
    if (!data || data.length === 0) {
      return res
        .status(404)
        .json({ error: `Gallery ${req.params.gallery} not found` });
    }
    res.send(data);
  } catch (err) {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

// Returns the galleries whose galleryCountry (case insensitive) begins with the provided substring
app.get("/api/galleries/country/:country", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("galleries")
      .select()
      .ilike("galleryCountry", `${req.params.country}%`);

    if (error) return res.status(500).json({ error: `${error.message}` });
    if (!data || data.length === 0) {
      return res.status(404).json({
        error: `No galleries found for a country starting with ${req.params.country}`,
      });
    }
    res.send(data);
  } catch (err) {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

// Returns all the artists and all the fields in the artists table
app.get("/api/artists", async (req, res) => {
  try {
    const { data, error } = await supabase.from("artists").select();

    if (error) res.status(500).json({ error: `${error.message}` });
    if (!data || data.length === 0) {
      return res.status(404).json({ error: "No artists found" });
    }
    res.send(data);
  } catch (err) {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

// Returns just the specified artist using artistId
app.get("/api/artists/:artists", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("artists")
      .select()
      .eq("artistId", req.params.artists);

    if (error) return res.status(500).json({ error: `${error.message}` });
    if (!data || data.length === 0) {
      return res
        .status(404)
        .json({ error: `Artist ${req.params.artists} not found` });
    }
    res.send(data);
  } catch (err) {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

// Returns the artists whose last name (case insensitive) begins with the provided substring
app.get("/api/artists/search/:lastName", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("artists")
      .select()
      .ilike("lastName", `${req.params.lastName}%`);

    if (error) return res.status(500).json({ error: `${error.message}` });
    if (!data || data.length === 0) {
      return res.status(404).json({
        error: `No artists with last name starting with ${req.params.lastName} found`,
      });
    }
    res.send(data);
  } catch (err) {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

// Returns the artists whose nationality (case insensitive) begins with the provided substring
app.get("/api/artists/country/:nationality", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("artists")
      .select()
      .ilike("nationality", `${req.params.nationality}%`);

    if (error) return res.status(500).json({ error: `${error.message}` });
    if (!data || data.length === 0) {
      return res
        .status(404)
        .json({
          error: `No artists found with nationality starting with ${req.params.nationality}`,
        });
    }
    res.send(data);
  } catch (err) {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

// Returns all the paintings ( return all the fields in the paintings table, but not the foreign keys) by default, sort by title
// NOT TOO SURE HERE
app.get("/api/paintings", async (req, res) => {
  const { data, error } = await supabase
    .from("paintings")
    .select()
    .order("title", { ascending: true });
  res.send(data);
});

// Returns all the paintings, sorted by either title or yearOfWork
app.get("/api/paintings/sort/:sortBy", async (req, res) => {
  const sortBy = req.params.sortBy === "year" ? "yearOfWork" : "title";

  const { data, error } = await supabase
    .from("paintings")
    .select()
    .order(sortBy, { ascending: true });

  res.send(data);
});

// Returns just the specified painting

// Returns the paintings whose title (case insensitive) contains the provided substring

// Returns the paintings between two years (include the paintings in the provided years), ordered by yearOfWork

// Returns all the paintings in a given gallery using the galleryId field

// Returns all the paintings by a given artist useing the artistId field

// Returns all the paintings by artists whose nationality begins with the provided substring

// Returns all the genres. For this and the following genres requests, don’t just provide the foreign keys for era; instead provide all the era fields

// Returns just the specified genre using genreId

// Returns the genres used in a given painting (order by genreName in ascending order)

// Returns all the paintings for a given genre using genreId, return just paitningId, title, and yearOfWork

// Returns all the paintings for a given era useing the eraId field, return just the paintingId, title, and yearOfWork. Sort by yearOfWork

// Returns the genre name and the number of paintings for each genre, sorted by the number of paintings (fewest to most)

// Returns the artist name (first name space last name) and the number of paintings for each artist, sorted by the number of paintings (most to fewest)

// Returns the genre name and the number of paintings for each genre, sorted by the number of paintings (most to least) for genres having over some set number of paintings

app.listen(8080, () => {
  console.log("TEEHEE");
});
