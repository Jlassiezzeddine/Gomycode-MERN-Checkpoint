const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userControllers");

router.get("/", userController.get_userList);
router.post("/addNew", userController.add_user);
router.put("/edit/:id", userController.edit_user);
router.delete("/delete/:id", userController.delete_user);

module.exports = router;
