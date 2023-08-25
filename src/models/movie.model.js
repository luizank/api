const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./src/database/movies.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT,
    image TEXT
  )`);
});

async function getAllMovies() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM movies", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

async function createMovie(movie) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO movies (title, content, image) VALUES (?, ?, ?)",
      [movie.title, movie.content, movie.image],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...movie });
        }
      }
    );
  });
}

async function updateMovie(id, updates) {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE movies SET title = ?, content = ?, image = ? WHERE id = ?",
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

async function deleteMovie(id) {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM movies WHERE id = ?", id, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports = { getAllMovies, createMovie, updateMovie, deleteMovie };
