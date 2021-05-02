const express = require("express");
const router = express.Router();
const verifyToken = require("../functions/verifyToken");
const verifyAdmin = require("../functions/verifyAdmin");
const verifyConfirmed = require("../functions/verifyConfirmed");

const productsController = require("../controllers/productsController");
router.get("/", productsController.getItems);
router.post("/", verifyAdmin, productsController.postProduct);
router.get("/:id", productsController.getProduct);
router.post("/discount", productsController.changeDiscount);
router.post("/delete", verifyConfirmed, productsController.deleteProduct);

module.exports = router;
