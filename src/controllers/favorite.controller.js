const favorite = require("../models/favorite.model");

async function getFavorites(req, res) {
  try {
    const favorites = await favorite.getAllFavorites();
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createFavorite(req, res) {
  try {
    const createFavorite = await favorite.createFavorite(req.body);
    res.status(201).json(createFavorite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateFavorite(req, res) {
  try {
    const updatedFavorite = await favorite.updateFavorite(req.params.id, req.body);
    res.json(updatedFavorite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteFavorite(req, res) {
  try {
    await favorite.deleteFavorite(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getFavorites, createFavorite, updateFavorite, deleteFavorite };