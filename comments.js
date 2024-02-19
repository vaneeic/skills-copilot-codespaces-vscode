// Create web server
const express = require('express');
const app = express();
// Read the comments.js file
const comments = require('./comments.js');
// Read the body of the request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Read the comments
app.get('/comments', (req, res) => {
  res.json(comments);
});
// Create a comment
app.post('/comments', (req, res) => {
  const { username, comment } = req.body;
  const id = comments.length + 1;
  comments.push({ id, username, comment });
  res.json({ id, username, comment });
});
// Read a comment
app.get('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = comments.find(c => c.id === parseInt(id));
  res.json(comment);
});
// Update a comment
app.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  const { username, comment } = req.body;
  const comment = comments.find(c => c.id === parseInt(id));
  comment.username = username;
  comment.comment = comment;
  res.json(comment);
});
// Delete a comment
app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  const index = comments.findIndex(c => c.id === parseInt(id));
  comments.splice(index, 1);
  res.json({ id });
});
// Start the server
app.listen(3000, () => {
  console.log('Server started');
});
