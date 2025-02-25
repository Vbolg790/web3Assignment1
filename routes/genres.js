const express = require("express");
const router = express.Router();

module.exports = (supabase, sendResponse) => {
  // Returns all the genres. For this and the following genres requests, don’t just provide the foreign keys for era; instead provide all the era fields
  router.get("/api/genres", async (req, res) => {
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
  router.get("/api/genres/:ref", async (req, res) => {
    const { data, error } = await supabase
      .from("genres")
      .select(
        `
        *,
        era:eras (*)
      `
      )
      .eq("genreId", req.params.ref);

    sendResponse(res, { data, error }, `Genre ${req.params.ref} not found`);
  });

  // Returns the genres used in a given painting (order by genreName in ascending order)
  router.get("/api/genres/painting/:ref", async (req, res) => {
    if (isNaN(req.params.ref)) {
      return res.status(400).json({
        error: `${req.params.ref} is an invalid character. Please provide a valid id number`,
      });
    }

    const { data, error } = await supabase
      .from("paintinggenres")
      .select(
        `
        ...genres (*, era:eras (*))
      `
      )
      .eq("paintingId", req.params.ref)
      .order("genres(genreName)", { ascending: true });

    sendResponse(
      res,
      { data, error },
      `No genres found for painting ${req.params.ref}`
    );
  });

  return router;
};
