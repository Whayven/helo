require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const authCtrl = require("./Controllers/authController");
const postCtrl = require("./Controllers/postController");
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const app = express();

app.use(express.json());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
  })
);

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set("db", db);
  console.log("db connected");
});

app.get("/api/auth/me", authCtrl.getSession);
app.post("/api/auth/register", authCtrl.register);
app.post("/api/auth/login", authCtrl.login);
app.post("/api/auth/logout", authCtrl.logout);

app.get("/api/posts", postCtrl.getAllPosts);
app.get("/api/post/:id", postCtrl.getPost);
app.post("/api/post/", postCtrl.addPost);
app.put("/api/post/:id", postCtrl.updatePost);
app.delete("/api/post/:id", postCtrl.deletePost);

app.listen(SERVER_PORT, () =>
  console.log(`Server running on port ${SERVER_PORT}`)
);
