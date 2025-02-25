const express = require("express");
const router = express.Router();

module.exports = (supabase, sendResponse) => {
  // Returns all the eras
  router.get("/api/eras", async (req, res) => {
    const { data, error } = await supabase.from("eras").select();
    sendResponse(res, { data, error }, "No eras found");
  });

  return router;
};
