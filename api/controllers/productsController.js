const productModel = require("../models/product");

const getItems = async (req, res) => {
  const totalDocs = await productModel.countDocuments({
    category: req.query.category,
  });
  if (req.query.sort == "Price") {
    const products = await productModel
      .find({
        category: req.query.category,
      })
      .sort({ price: req.query.order })
      .limit(10)
      .skip(req.query.page * 10);
    res.json({
      items: products,
      total: totalDocs,
    });
  } else {
    const products = await productModel
      .find({
        category: req.query.category,
      })
      .sort({ dateCreated: req.query.order })
      .limit(10)
      .skip(req.query.page * 10);
    res.json({
      items: products,
      total: totalDocs,
    });
  }
};

const postProduct = (req, res) => {
  const product = req.body;
  console.log(product);
  const newProduct = new productModel({
    productCode: product.productCode,
    title: product.title,
    price: product.price,
    supplier: product.supplier,
    category: product.category,
    stockLeft: product.stockLeft,
    stars: product.stars,
  });

  newProduct.save();
  res.json(newProduct);
};

module.exports = {
  getItems,
  postProduct,
};
