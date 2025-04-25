const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  console.error("❌ MONGODB_URI not found in .env file");
  process.exit(1);
}

mongoose
  .connect(mongoURI)
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

// ✅ Model
const Book = mongoose.model("book", bookSchema, "book");

// ✅ Routes

// Get all books
app.get("/book", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Get single book
app.get("/book/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.json(book);
});

// Create book
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

// Start server
app.listen(PORT, () => {
  console.log(`🚀 API running at http://localhost:${PORT}`);
});
