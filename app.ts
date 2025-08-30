const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

let items = []; // In-memory storage
let idCounter = 1;

// CREATE
app.post("/items", (req, res) => {
  const newItem = { id: idCounter++, name: req.body.name };
  items.push(newItem);
  res.json(newItem);
});

// READ ALL
app.get("/items", (req, res) => {
  res.json(items);
});

// READ ONE
app.get("/items/:id", (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (item) {
    res.json(item);
  } else {
    res.status(404).send("Item not found");
  }
});

// UPDATE
app.put("/items/:id", (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (item) {
    item.name = req.body.name;
    res.json(item);
  } else {
    res.status(404).send("Item not found");
  }
});

// DELETE
app.delete("/items/:id", (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index !== -1) {
    const deletedItem = items.splice(index, 1);
    res.json(deletedItem);
  } else {
    res.status(404).send("Item not found");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
