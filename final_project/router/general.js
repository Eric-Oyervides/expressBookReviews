const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.json(Object.values(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const book = books[req.params.isbn];
  if (!book){
    return res.status(404).json({message: "Book not found"});
  }

  return res.status(200).json(book);
  
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const results = Object.values(books).filter(b => b["author"].toLowerCase() === req.params.author.toLowerCase());
  if (results.length > 0){
    return res.status(200).json(results);
  }
  return res.status(404).json({error: "author not found"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const results = Object.values(books).filter(b => b["title"].toLowerCase() === req.params.title.toLowerCase());

  if (results.length > 0) {
    return res.status(200).json(results);
  }
  return res.status(404).json({error: "title not found"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const book = books[req.params.isbn];
  if (book){
    return res.status(200).json(book["reviews"]);
  }
  return res.status(404).json({error: "isbn not found"});
});

module.exports.general = public_users;
