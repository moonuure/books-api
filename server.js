const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

const app = express();

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ MongoDB Connection (local or switch to Atlas)
mongoose
  .connect(
    "mongodb+srv://subacapp:Alka1%2F1%2Fmnw@cluster0.e2axgho.mongodb.net/books?retryWrites=true&w=majority"
  )
  // change to your Atlas URI if needed
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

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

// ✅ Force exact collection name: "book"
const Book = mongoose.model("book", bookSchema, "book");

// ✅ Routes

// Get all books
app.get("/book", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Get one book by ID
app.get("/book/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.json(book);
});

// Add a new book
app.post("/book", async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.json({ message: "✅ Book added", book });
});

// Update a book
app.put("/book/:id", async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({ message: "✏️ Book updated", book });
});

// Delete a book
app.delete("/book/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "🗑️ Book deleted" });
});

// Start the server
app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
