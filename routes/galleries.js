const express = require("express");
const router = express.Router();

module.exports = (supabase, sendResponse) => {
  // Returns all the galleries and all the fields from galleries table
  router.get("/api/galleries", async (req, res) => {
    const { data, error } = await supabase.from("galleries").select();
    sendResponse(res, { data, error }, "No galleries found");
  });

  // Returns just the specified gallery using galleryId
  router.get("/api/galleries/:ref", async (req, res) => {
    if (isNaN(parseInt(req.params.ref, 10))) {
      return res.status(400).json({
        error: `${req.params.ref} is an invalid character. Please provide a valid number`,
      });
    }

    const { data, error } = await supabase
      .from("galleries")
      .select("*")
      .eq("galleryId", req.params.ref);
    sendResponse(res, { data, error }, `Gallery ${req.params.ref} not found.`);
  });

  // Returns the galleries whose galleryCountry (case insensitive) begins with the provided substring
  router.get("/api/galleries/country/:substring", async (req, res) => {
    const { data, error } = await supabase
      .from("galleries")
      .select("*")
      .ilike("galleryCountry", `${req.params.substring}%`);
    sendResponse(
      res,
      { data, error },
      `No galleries found for a country starting with ${req.params.substring}`
    );
  });

  return router;
};
