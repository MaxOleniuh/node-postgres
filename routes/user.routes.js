const Router = require("express");
const router = Router();
const UserController = require("../controllers/user.contoller");

router.post("/user", UserController.createUser);
router.get("/user", UserController.getUsers);
router.get("/user/:id", UserController.getOneUser);
router.put("/user", UserController.updateUser);
router.delete("/user/:id", UserController.deleteUser);

module.exports = router;
