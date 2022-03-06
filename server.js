const PORT = process.env.PORT || 3001;

const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

const notes = require("./db/db.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/", (req, res) => {
  req.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.json(notes.slice(1));
});

function newNote(body, notes) {
  const note = body;

  if (!Array.isArray(notes)) {
    notes = [];
  }

  if (notes.length === 0) {
    notes.push(0);
  }

  body.id = notes[0];
  notes[0]++;
  notes.push(note);

  fs.writeFile(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(notes, null, 2)
  );
  return note;
}

app.post("/api/notes", (req, res) => {
  const note = newNote(req.body, notes);
  res.json(note);
});

// maybe delete?

app.listen(PORT, () => {
  console.log(`Server now on port ${PORT}`);
});
