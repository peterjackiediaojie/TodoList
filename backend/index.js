const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/todo", async (req, res) => {
  try {
    const todos = await pool.query("SELECT * FROM todo ORDER BY text ASC");
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/todo", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Text is required" });
  }

  try {
    const todo = await pool.query(
      "INSERT INTO todo SET text = ?, done = false",
      [text]
    );
    res.status(201).json({ id: todo.insertId, text, done: false });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/api/todo/:id", async (req, res) => {
  const { id } = req.params;
  const { done } = req.body;

  if (!id || typeof done !== "boolean") {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    const todo = await pool.query("UPDATE todo SET done = ? WHERE id = ?", [
      done,
      id,
    ]);
    if (todo.affectedRows === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json({ id, done });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/api/todo/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    const todo = await pool.query("DELETE FROM todo WHERE id = ?", [id]);
    if (todo.affectedRows === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/api/todo", async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM todo");
    res.json({ message: `${result.affectedRows} todos deleted` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
