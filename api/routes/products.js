const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController");
router.get("/", productsController.getItems);
router.post("/", productsController.postProduct);

module.exports = router;
