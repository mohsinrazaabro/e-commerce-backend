const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../functions/verifyToken");
const verifyAdmin = require("../functions/verifyAdmin");
const verifyConfirmed = require("../functions/verifyConfirmed");

router.get("/", userController.getUsers);
router.post("/create", userController.addUser);
router.post("/maketoken", userController.makeToken);
router.get("/checktoken", userController.checkToken);
router.post("/deleteuser", verifyAdmin, userController.deleteUser);
router.get("/confirm/:token", userController.confirmAccount);
router.get("/profile/:id", verifyToken, userController.profile);
router.get("/resendemail", userController.resendEmail);

module.exports = router;
