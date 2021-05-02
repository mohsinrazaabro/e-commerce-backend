const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const verifyToken = require("../functions/verifyToken");
const verifyAdmin = require("../functions/verifyAdmin");

router.post("/carousel", verifyAdmin, homeController.createCarousel);
router.post("/featured", verifyAdmin, homeController.addFeatured);

router.get("/", homeController.getHomeData);

module.exports = router;
