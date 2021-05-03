const carouselModel = require("../models/carousel");
const featuredModel = require("../models/featured");

const createCarousel = (req, res) => {
  carouselModel.create(
    {
      productid: req.body.productid,
      imagelink: req.body.imagelink,
      caption1: req.body.caption1,
      caption2: req.body.caption2,
    },
    (err, doc) => {
      if (err) return res.json({ success: false, msg: "couldn't create" });
      res.json({ msg: "Succesfully Created", success: true, doc });
    }
  );
};

const addFeatured = (req, res) => {
  featuredModel.create(
    {
      productid: req.body.productid,
      title: req.body.title,
      price: req.body.price,
      originalprice: req.body.originalprice,
      imagelink: req.body.imagelink,
      stars: req.body.stars,
    },
    (err, doc) => {
      if (err) return res.json({ success: false, msg: "couldn't create" });
      res.json({ msg: "Succesfully Created", success: true, doc });
    }
  );
};

const getHomeData = async (req, res) => {
  let featuredData = await featuredModel
    .find()
    .sort({ datecreated: -1 })
    .limit(18);
  let carouselData = await carouselModel
    .find()
    .sort({ datecreated: -1 })
    .limit(3);
  res.json({ featured: featuredData, carousels: carouselData });
};

const getHelloWorld = (req, res) => {
  res.json({ success: true, req: req.authData });
};

module.exports = {
  createCarousel,
  getHelloWorld,
  addFeatured,
  getHomeData,
};
