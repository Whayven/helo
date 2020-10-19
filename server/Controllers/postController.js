// isEmpty returns true if the string is null or length is 0
function isEmpty(str) {
  const empty = !str || str.trim().length === 0;
  return empty;
}

module.exports = {
  getAllPosts: async (req, res) => {
    // const { id } = req.params;
    const { search, userposts } = req.query;
    const { userid } = req.session;
    const db = req.app.get("db");
    let allPosts;

    try {
      //  If userposts is true AND search is not empty, this will respond with all posts where the title contains the search string.
      if (userposts === "true" && isEmpty(search) === false) {
        await db.posts.search_posts({ search }).then((posts) => {
          allPosts = posts;
        });
      }
      // If userposts is false and search is empty, this will respond with all posts where the current user is not the author.
      else if (userposts === "false" && isEmpty(search) === true) {
        await db.posts.get_all_ex_user({ userid }).then((posts) => {
          allPosts = posts;
        });
      }
      // If userposts is false AND search is not empty, this will respond with all posts where the current user is not the author and the title contains the search string.
      else if (userposts === "false" && isEmpty(search) === false) {
        await db.posts.search_ex_user({ search, userid }).then((posts) => {
          allPosts = posts;
        });
      }
      // If userposts is true AND search is empty, this will respond with all the posts.
      else if (userposts === "true" && isEmpty(search) === true) {
        await db.posts.get_all_posts().then((posts) => {
          allPosts = posts;
        });
      }
      res.status(200).send(allPosts);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  getPost: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");
    await db.posts
      .get_post({ id })
      .then((post) => {
        res.status(200).send(post[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  addPost: async (req, res) => {
    // const { id } = req.params;
    const { userid } = req.session;
    const { title, img, content } = req.body;
    const db = req.app.get("db");

    await db.posts
      .add_post({ title, img, content, userid })
      .then(() => res.status(200).send("Post added successfully!"))
      .catch((err) => res.status(500).send(err));
  },
  updatePost: async (req, res) => {
    const { id } = req.params;
    const { title, img, content } = req.body;
    const db = req.app.get("db");

    await db.posts
    .update_post({ title, img, content, id })
    .then(() => res.status(200).send("Post updated successfully!"))
    .catch((err) => res.status(500).send(err));
  },
  deletePost: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");

    await db.posts
      .delete_post({ id })
      .then((posts) => res.status(200).send(posts))
      .catch((err) => res.status(500).send(err));
  },
};
