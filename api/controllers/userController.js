const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();
const nodemailer = require("nodemailer");
const productModel = require("../models/product");

const addUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const email = await userModel.find({ email: req.body.email });
    const username = await userModel.find({ username: req.body.username });
    let role = "user";
    if (req.body.role === process.env.ADMIN_REGISTRATION_KEY) role = "admin";
    if (email.length == 0 && username.length == 0) {
      userModel.create(
        {
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
          role,
        },
        (err, doc) => {
          console.log(doc._id);
          const token = jwt.sign(
            { name: doc._id },
            process.env.SECRET_JWT_KEY,
            {
              expiresIn: "24h",
            }
          );
          sendEmail(doc.email, token, "http://e-commerce-mra.herokuapp.com");
          res.json({
            msg:
              "Click on the link sent to your email to fonfirm your account s",
          });
        }
      );
      /* newUser.save();
      const user = await userModel.findOne({ email: req.body.email });
       */
    } else {
      res.json({ msg: "User already exists!" });
    }
  } catch (err) {
    console.error(err);
  }
};
const resendEmail = async (req, res) => {
  const doc = await userModel.find({ username: req.authData.name });
  const token = jwt.sign({ name: doc._id }, process.env.SECRET_JWT_KEY, {
    expiresIn: "24h",
  });
  const emailResponse = await sendEmail(
    doc.email,
    token,
    "http://e-commerce-mra.herokuapp.com"
  );
  res.json({
    msg: "Click on the link sent to your email to fonfirm your account s",
    secondmsg: { doc, emailResponse },
  });
};

const makeToken = async (req, res) => {
  const User = await userModel.findOne({ email: req.body.email });

  if (User === null) {
    return res.json({ msg: "failure, user not found", success: false });
  }
  try {
    if (await bcrypt.compare(req.body.password, User.password)) {
      const token = jwt.sign(
        { name: User.username },
        process.env.SECRET_JWT_KEY,
        {
          expiresIn: "24h",
        }
      );
      res.json({ token, name: User.username, msg: "success", success: true });
    } else {
      res.json({ msg: "failure, wrong password", success: false });
    }
  } catch (e) {
    console.error(e);
  }
};

function sendEmail(reciever, token, baseURL) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL,
    to: reciever,
    subject: "Confirm your account for E Commerce",
    html: `<h1>Clickeck the link below to confirm your account</h1><p>Link:</p><a href='${baseURL}/user/confirm/${token}' > ${baseURL}/user/confirm/${token}</a>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return error;
    } else {
      console.log("Email sent: " + info.response);
      return info.response;
    }
  });
}

const confirmAccount = (req, res) => {
  const token = req.params.token;
  jwt.verify(token, process.env.SECRET_JWT_KEY, (err, tokenData) => {
    userModel.updateOne(
      { _id: tokenData.name },
      { isconfirmed: true },
      (err, doc) => {
        console.log(doc);
        res.send("Succesfully confirmed!");
      }
    );
  });
};

const checkToken = async (req, res) => {
  const bearerHeaders = req.headers["authorization"];
  if (bearerHeaders !== "undefined") {
    const bearerToken = bearerHeaders.split(" ")[1];
    jwt.verify(bearerToken, process.env.SECRET_JWT_KEY, (err, authData) => {
      if (err) return res.json({ msg: "invalid token", success: false });
      req.authData = authData;
      userModel.findOne({ username: req.authData.name }, (err, doc) => {
        if (err) {
          return;
        }
        res.json({
          msg: `valid token`,
          username: req.authData.name,
          confirmed: doc.isconfirmed,
          role: doc.role,
          success: true,
          userid: doc._id,
        });
      });
    });
  }
};

const getUsers = (req, res) => {
  user.find().then((users) => {
    /*   const newUsers = users.map((user) => {
      return { username: user.username, email: user.email, id: user._id };
    });
    const filteredUsers = newUsers.filter(
      (user) => user.username != "Mohsin Abro"
    ); */

    res.json({ users });
  });
};

const deleteUser = (req, res) => {
  if (!req.body.id) {
    return;
  }
  userModel.findOneAndDelete({ _id: req.body.id }, function (err, docs) {
    if (err) {
      return;
    } else {
      console.log(req.authData.name);
      res.json({ msg: `Successfuly deleted ${docs.email}` });
    }
  });
};

const profile = async (req, res) => {
  const products = await productModel.find({ supplier: req.authData.name });
  userModel.findOne({ username: req.authData.name }, (err, doc) => {
    if (err) return res.json({ msg: "Not found", success: false });
    const newUser = {
      username: doc.username,
      email: doc.email,
      address: doc.address,
      phone: doc.phone,
      isconfirmed: doc.isconfirmed,
    };
    console.log(newUser);

    res.json({ user: newUser, products, success: true, msg: "user found" });
  });
};

module.exports = {
  addUser,
  makeToken,
  checkToken,
  getUsers,
  deleteUser,
  confirmAccount,
  profile,
  resendEmail,
};
