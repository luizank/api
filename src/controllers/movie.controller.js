const movie = require("../models/movie.model");

async function getMovies(req, res) {
  try {
    const movies = await movie.getAllMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createMovie(req, res) {
  try {
    const createMovie = await movie.createMovie(req.body);
    res.status(201).json(createMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateMovie(req, res) {
  try {
    const updatedMovie = await movie.updateMovie(req.params.id, req.body);
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteMovie(req, res) {
  try {
    await movie.deleteMovie(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getMovies, createMovie, updateMovie, deleteMovie };