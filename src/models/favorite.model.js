const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./src/database/favorites.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    class TEXT
  )`);
});

async function getAllFavorites() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM favorites", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

async function createFavorite(favorite) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO favorites (title, content, image) VALUES (?)",
      [favorite.title, favorite.content, favorite.image],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...favorite });
        }
      }
    );
  });
}

async function updateFavorite(id, updates) {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE favorites SET  = ?",
      [updates.title, updates.content, updates.image, id],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ id, ...updates });
        }
      }
    );
  });
}

async function deleteFavorite(id) {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM favorites WHERE id = ?", id, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports = { getAllFavorites, createFavorite, updateFavorite, deleteFavorite };
