const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // ✅ For .env

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ✅ Book Schema
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  outher: String,
  Eddition: String,
  year: Number,
  type: String,
  language: String,
  pages: Number,
});

// ✅ Model + collection name
const Book = mongoose.model("book", bookSchema, "book");

// ✅ Routes

// Get all books
app.get("/book", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Get one book
app.get("/book/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.json(book);
});

// Create new book
app.post("/book", async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.json({ message: "✅ Book added", book });
});

// Update book
app.put("/book/:id", async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({ message: "✏️ Book updated", book });
});

// Delete book
app.delete("/book/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "🗑️ Book deleted" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 API running at http://localhost:${PORT}`);
});
