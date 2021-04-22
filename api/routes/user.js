const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getUsers);
router.post("/create", userController.addUser);
router.post("/maketoken", userController.makeToken);
router.get("/checktoken", userController.checkToken);
router.post("/deleteuser", userController.deleteUser);

module.exports = router;
