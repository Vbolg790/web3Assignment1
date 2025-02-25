const express = require("express");
const router = express.Router();

module.exports = (supabase, sendResponse) => {
  // Returns the genre name and the number of paintings for each genre, sorted by the number of paintings (fewest to most)
  router.get("/api/counts/genres", async (req, res) => {
    const { data, error } = await supabase
      .from("paintinggenres")
      .select("genre:genres (genreName), paintingId");

    const genreCount = {};
    data.forEach(({ genre }) => {
      if (genre?.genreName) {
        genreCount[genre.genreName] = (genreCount[genre.genreName] || 0) + 1;
      }
    });

    const sortedData = [];
    Object.entries(genreCount).forEach(([genreName, count]) => {
      sortedData.push({ genreName, count });
    });

    sortedData.sort((a, b) => a.count - b.count);

    sendResponse(res, { data: sortedData, error }, "No genre counts found");
  });

  // Returns the artist name (first name space last name) and the number of paintings for each artist, sorted by the number of paintings (most to fewest)
  router.get("/api/counts/artists", async (req, res) => {
    const { data: paintingArtists, error } = await supabase
      .from("paintings")
      .select("artist:artists (firstName, lastName), paintingId");

    const artistPaintingCount = {};
    paintingArtists.forEach(({ artist }) => {
      if (artist?.firstName && artist?.lastName) {
        const artistName = `${artist.firstName} ${artist.lastName}`;
        artistPaintingCount[artistName] =
          (artistPaintingCount[artistName] || 0) + 1;
      }
    });

    const sortedArtistCount = [];
    Object.entries(artistPaintingCount).forEach(
      ([artistName, paintingCount]) => {
        sortedArtistCount.push({ artistName, paintingCount });
      }
    );

    sortedArtistCount.sort((a, b) => b.paintingCount - a.paintingCount);

    sendResponse(
      res,
      { data: sortedArtistCount, error },
      "No artist painting counts found"
    );
  });

  // Returns the genre name and the number of paintings for each genre, sorted by the number of paintings (most to least) for genres having over some set number of paintings
  router.get("/api/counts/topgenres/:ref", async (req, res) => {
    const minCount = parseInt(req.params.ref, 10);

    const { data: paintingGenres, error } = await supabase
      .from("paintinggenres")
      .select("genre:genres (genreName), paintingId");

    const genrePaintingCounts = {};
    paintingGenres.forEach(({ genre }) => {
      if (genre?.genreName) {
        genrePaintingCounts[genre.genreName] =
          (genrePaintingCounts[genre.genreName] || 0) + 1;
      }
    });

    const filteredAndSortedGenres = [];
    Object.entries(genrePaintingCounts).forEach(
      ([genreName, paintingCount]) => {
        if (paintingCount > minCount) {
          filteredAndSortedGenres.push({ genreName, paintingCount });
        }
      }
    );

    filteredAndSortedGenres.sort((a, b) => b.paintingCount - a.paintingCount);

    sendResponse(
      res,
      { data: filteredAndSortedGenres, error },
      `No genres found with more than ${minCount} paintings`
    );
  });

  return router;
};
