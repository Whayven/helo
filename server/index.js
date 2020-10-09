require('dotenv').config()
const express = require('express');
const massive = require('massive');
const authCtrl = require('./Controllers/authController');
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

app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`));
