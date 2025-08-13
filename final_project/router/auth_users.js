const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

regd_users.post("/register", (req,res) => {
  if (!req.body.username){
    return res.status(400).json({error: "username not provided"});
  }
  if (!req.body.password){
    return res.status(400).json({error: "password not provided"});
  }

  const user = users.filter(u => u.username === req.body.username);
  if (user.length > 0){
    return res.status(400).json({error: "user already exists"});
  }

  users.push({username: req.body.username, password: req.body.password});

  return res.status(200).json({message: "user registered"})
});

//only registered users can login
regd_users.post("/login", (req,res) => {
  if (!req.body.username) {
    return res.status(400).json({error: "username not provided"});
  }
  if (!req.body.password) {
    return res.status(400).json({error: "password not provided"});
  }

  
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
