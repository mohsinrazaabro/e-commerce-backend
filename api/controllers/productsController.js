const productModel = require("../models/product");
const userModel = require("../models/user");
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

const getProduct = (req, res) => {
  productModel.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) return res.json({ success: false, msg: "Product doesn't exists" });
    res.json({ product: doc, success: true });
  });
};

const postProduct = (req, res) => {
  productModel.create(
    {
      productCode: req.body.productCode,
      title: req.body.title,
      price: req.body.price,
      supplier: req.authData.name,
      category: req.body.category,
      stockLeft: req.body.stockLeft,
      stars: req.body.stars,
      description: req.body.description,
      imagelink: req.body.imagelink,
    },
    (err, doc) => {
      if (err) res.json({ msg: "Failed", success: false, err });
      res.json({ msg: "Succesfully created!", success: true, doc });
    }
  );
};

const changeDescription = async (req, res) => {
  const product = await productModel.findOne({
    _id: req.body.id,
    supplier: req.authData.name,
  });
  if (product) {
    productModel.findOneAndUpdate(
      { _id: req.body.id },
      { description: req.body.descripton },
      (err, doc) => {
        if (err)
          return res.json({
            msg: "something went wrong",
            error: err,
            success: false,
          });
        res.json({ success: true, msg: "successfuly updated", doc });
      }
    );
  }
};

const changeDiscount = async (req, res) => {
  const product = await productModel.findOne({
    _id: req.body.id,
    supplier: req.authData.name,
  });
  if (product) {
    productModel.findOneAndUpdate(
      { _id: req.body.id },
      { discount: req.body.discount },
      (err, doc) => {
        if (err)
          return res.json({
            msg: "something went wrong",
            error: err,
            success: false,
          });
        res.json({ success: true, msg: "successfuly updated", doc });
      }
    );
  }
};

const deleteProduct = async (req, res) => {
  const product = await productModel.findById(req.body.id);
  if (req.authData.name === product.supplier) {
    productModel.findOneAndDelete({ _id: req.body.id }, (err, doc) => {
      if (err) return res.json({ msg: "failed", success: false, err });
      res.json({ msg: `successfully deleted `, success: true });
    });
  }
};

module.exports = {
  getItems,
  postProduct,
  getProduct,
  changeDiscount,
  deleteProduct,
  changeDescription,
};
