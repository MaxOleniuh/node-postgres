const db = require("../db");

class PostController {
  async createPost(req, res) {
    try {
      const { title, content, userId } = req.body;
      const newPost = await db.query(
        "INSERT INTO post (title, content, user_id) values ($1, $2, $3) RETURNING *",
        [title, content, userId]
      );
      res.json(newPost.rows[0]);
    } catch (error) {
      console.error("Error creating the post:", error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the post." });
    }
  }
  async getPostsByUser(req, res) {
    try {
      const id = req.query.id;
      const post = await db.query("select * from post where user_id = $1", [
        id,
      ]);
      res.json(post.rows);
    } catch (error) {
      console.error("Error retrieving the post:", error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the post." });
    }
  }
}

module.exports = new PostController();
