const express = require("express");
const router = express.Router();
const verifyToken = require("../functions/verifyToken");
const verifyAdmin = require("../functions/verifyAdmin");
const verifyConfirmed = require("../functions/verifyConfirmed");

const orderController = require("../controllers/orderController");

router.post("/post", verifyConfirmed, orderController.makeOrder);

module.exports = router;
