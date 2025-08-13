const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
  let validusers = users.filter(user => {
    return (user.username === username && user.password === password);
  })
  
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
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
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password){
    return res.status(404).json({message: "username or password not provided"});
  }

  if (authenticatedUser(username, password)){
    let accessToken = jwt.sign({
        data: {
            username: username,
            password: password
        }
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
        accessToken, username
    }
    return res.status(200).send("Success")  
  } else {
    return res.status(208).json({ message: "Invalid username or password"});
  }
});


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const book = books[req.params.isbn];
  if (!book){
      return res.status(404).json({ error: "book not found"});
  }
  const reviews = book["reviews"];
  const reviewName = req.user.data.username;
  const existingReview = Object.values(reviews).filter(r => r.username === reviewName);
  if (existingReview.length > 0){
      existingReview.review = req.body.review;
      return res.status(200).json({message: "review updated"});
  }
  const newReview = {username: reviewName, review: req.body.review};
  book["reviews"] = {...book["reviews"], [newReview.username]: newReview.review};
  return res.status(200).json({message: "review published"});
});

regd_users.delete("/auth/review/:isbn", (req,res) => {
  const book = books[req.params.isbn];
  if (!book){
    return res.status(404).json({error:"book not found"});
  }
  const reviews = book["reviews"];
  const reviewName = req.user.data.username;
  const existingReview = Object.keys(reviews).filter(key => key === reviewName);
  if (existingReview.length > 0){
    delete book["reviews"][reviewName];
    return res.status(200).json({message: "review deleted"});
  }
  else {
    return res.status(208).json({message: "review not found"});
  }
})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
