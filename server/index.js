require('dotenv').config()
const express = require('express');
const massive = require('massive');
const authCtrl = require('./Controllers/authController');
const postCtrl = require('./Controllers/postController');
const { SERVER_PORT, CONNECTION_STRING } = process.env;
const app = express();

app.use(express.json());

massive({
  connectionString: CONNECTION_STRING,
  ssl: {rejectUnauthorized: false}
}).then(db => {
  app.set('db', db);
  console.log('db connected');
})

app.post('/api/auth/register', authCtrl.register);
app.post('/api/auth/login', authCtrl.login);

app.get('/api/posts/:id', postCtrl.getAllPosts);
app.get('/api/post/:id', postCtrl.getPost);
app.post('/api/post/:id', postCtrl.addPost);
app.delete('/api/post/:id', postCtrl.deletePost);

app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`));
