const express = require("express");
const router = express.Router();

module.exports = (supabase, sendResponse) => {
  // Returns all the artists and all the fields in the artists table
  router.get("/api/artists", async (req, res) => {
    const { data, error } = await supabase.from("artists").select();
    sendResponse(res, { data, error }, "No artists found");
  });

  // Returns just the specified artist using artistId
  router.get("/api/artists/:ref", async (req, res) => {
    const { data, error } = await supabase
      .from("artists")
      .select()
      .eq("artistId", req.params.ref);
    sendResponse(res, { data, error }, `Artist ${req.params.ref} not found`);
  });

  // Returns the artists whose last name (case insensitive) begins with the provided substring
  router.get("/api/artists/search/:substring", async (req, res) => {
    const { data, error } = await supabase
      .from("artists")
      .select()
      .ilike("lastName", `${req.params.substring}%`);
    sendResponse(
      res,
      { data, error },
      `No artists found whos last name begins with ${req.params.substring}`
    );
  });

  // Returns the artists whose nationality (case insensitive) begins with the provided substring
  router.get("/api/artists/country/:substring", async (req, res) => {
    const { data, error } = await supabase
      .from("artists")
      .select()
      .ilike("nationality", `${req.params.substring}%`);
    sendResponse(
      res,
      { data, error },
      `No artists found with nationality starting with ${req.params.substring}`
    );
  });

  return router;
};
