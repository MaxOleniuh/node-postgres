const Router = require("express");
const router = Router();
const PostController = require("../controllers/post.controller");

router.post("/post", PostController.createPost);
router.get("/post", PostController.getPostsByUser);

module.exports = router;
