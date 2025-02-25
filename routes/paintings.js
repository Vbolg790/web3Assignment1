const express = require("express");
const router = express.Router();

module.exports = (supabase, sendResponse) => {
  // Returns all the paintings ( return all the fields in the paintings table, but not the foreign keys) by default, sort by title
  router.get("/api/paintings", async (req, res) => {
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
  router.get("/api/paintings/sort/:sortBy", async (req, res) => {
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
  router.get("/api/paintings/:ref", async (req, res) => {
    const { data, error } = await supabase
      .from("paintings")
      .select(`*, artist:artists (*), gallery:galleries (*)`)
      .eq("paintingId", req.params.ref);

    sendResponse(
      res,
      { data, error },
      `No painting found with id ${req.params.ref}`
    );
  });

  // Returns the paintings whose title (case insensitive) contains the provided substring
  router.get("/api/paintings/search/:substring", async (req, res) => {
    const { data, error } = await supabase
      .from("paintings")
      .select(`*, artist:artists (*), gallery:galleries (*)`)
      .ilike("title", `%${req.params.substring}%`)
      .order("title", { ascending: true });

    sendResponse(
      res,
      { data, error },
      `No paintings found with titles containing ${req.params.substring}`
    );
  });

  // Returns the paintings between two years (include the paintings in the provided years), ordered by yearOfWork
  router.get("/api/paintings/years/:startYear/:endYear", async (req, res) => {
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
  router.get("/api/paintings/galleries/:ref", async (req, res) => {
    const { data, error } = await supabase
      .from("paintings")
      .select(`*, artist:artists (*), gallery:galleries (*)`)
      .eq("galleryId", req.params.ref)
      .order("title", { ascending: true });

    sendResponse(
      res,
      { data, error },
      `No paintings found for gallery id ${req.params.ref}`
    );
  });

  // Returns all the paintings by a given artist useing the artistId field
  router.get("/api/paintings/artist/:ref", async (req, res) => {
    const { data, error } = await supabase
      .from("paintings")
      .select(`*, artist:artists (*), gallery:galleries (*)`)
      .eq("artistId", req.params.ref)
      .order("title", { ascending: true });

    sendResponse(
      res,
      { data, error },
      `No paintings found for artist id ${req.params.ref}`
    );
  });

  // Returns all the paintings by artists whose nationality begins with the provided substring
  router.get("/api/paintings/artist/country/:ref", async (req, res) => {
    const { data, error } = await supabase
      .from("paintings")
      .select(`*, artist:artists (*), gallery:galleries (*)`)
      .ilike("artist.nationality", `${req.params.ref}%`)
      .order("title", { ascending: true });

    sendResponse(
      res,
      { data, error },
      `No paintings found for artists with nationality starting with "${req.params.ref}"`
    );
  });

  // Returns all the paintings for a given genre using genreId, return just paitningId, title, and yearOfWork. Sort by yearOfWor
  router.get("/api/paintings/genre/:ref", async (req, res) => {
    const { data, error } = await supabase
      .from("paintinggenres")
      .select(`paintings:paintings (paintingId, title, yearOfWork)`)
      .eq("genreId", req.params.ref)
      .order("paintings(yearOfWork)", {
        ascending: true,
      });
    sendResponse(
      res,
      { data, error },
      `No paintings found for genre ${req.params.ref}`
    );
  });

  // Returns all the paintings for a given era useing the eraId field, return just the paintingId, title, and yearOfWork. Sort by yearOfWork
  router.get("/api/paintings/era/:ref", async (req, res) => {
    const { data, error } = await supabase
      .from("paintinggenres")
      .select(
        `painting:paintings!inner (paintingId, title, yearOfWork), era:genres!inner (eraId)`
      )
      .eq("genres.eraId", req.params.ref)
      .order("painting(yearOfWork)", {
        ascending: true,
      });

    sendResponse(
      res,
      { data, error },
      `No paintings found for era ID ${req.params.ref}`
    );
  });

  return router;
};
