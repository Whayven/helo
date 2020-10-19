const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res) => {
    const { username, password } = req.body,
      db = req.app.get("db");

    const foundUser = await db.users.check_user({ username });
    if (foundUser[0]) {
      return res.status(400).send("Username taken");
    }

    let salt = bcrypt.genSaltSync(10),
      hash = bcrypt.hashSync(password, salt);

    const profile_pic = `https://robohash.org/${username}`;
    const newUser = await db.users.create_user({ username, hash, profile_pic });
    req.session.userid = newUser[0].user_id;
    res.status(201).send(newUser[0]);
  },
  login: async (req, res) => {
    const { username, password } = req.body,
      db = req.app.get("db");

    const foundUser = await db.users.check_user({ username });
    if (!foundUser[0]) {
      return res.status(400).send("User not found");
    }

    const authenticated = bcrypt.compareSync(password, foundUser[0].password);
    if (!authenticated) {
      return res.status(401).send("Password is incorrect");
    }

    delete foundUser[0].password;
    req.session.userid = foundUser[0].user_id;
    res.status(202).send(foundUser[0]);
  },
  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },
  getSession: async (req, res) => {
    const { userid } = req.session;
    const db = req.app.get("db");
    await db.users
      .get_user({ userid })
      .then((user) => {
        res.status(200).send(user[0]);
      })
      .catch((err) => res.status(500).send(err));
  },
};
