const express = require("express");
const router = express.Router();
const movieController = require("./controllers/movie.controller");
const favoriteController = require("./controllers/favorite.controller");

router.get("/movies", movieController.getMovies);
router.post("/movies", movieController.createMovie);
router.put("/movies/:id", movieController.updateMovie);
router.delete("/movies/:id", movieController.deleteMovie);

router.get("/favorites", favoriteController.getFavorites);
router.post("/favorites", favoriteController.createFavorite);
router.put("/favorites/:id", favoriteController.updateFavorite);
router.delete("/favorites/:id", favoriteController.deleteFavorite);

module.exports = router;