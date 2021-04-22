const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();

const addUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const email = await userModel.find({ email: req.body.email });
    const username = await userModel.find({ username: req.body.username });

    if (email.length == 0 && username.length == 0) {
      const newUser = new user({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
      });
      newUser.save();
      res.json({ msg: "Success" });
    } else {
      res.json({ msg: "User already exists!" });
    }
  } catch (err) {
    console.error(err);
  }
};

const makeToken = async (req, res) => {
  const User = await user.findOne({ email: req.body.email });

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

const checkToken = async (req, res) => {
  const count = await feedModel.countDocuments();
  const bearerHeaders = req.headers["authorization"];
  if (bearerHeaders !== "undefined") {
    const bearerToken = bearerHeaders.split(" ")[1];
    jwt.verify(bearerToken, process.env.SECRET_JWT_KEY, (err, authData) => {
      if (err) return res.json({ msg: "invalid token", count: count });
      req.authData = authData;
      user.findOne({ username: req.authData.name }, (err, doc) => {
        if (err) {
          return;
        }
        res.json({
          msg: `valid token`,
          name: req.authData.name,
          count: count,
          role: doc.role,
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
  user.findOneAndDelete({ _id: req.body.id }, function (err, docs) {
    if (err) {
      return;
    } else {
      console.log(req.authData.name);
      res.json({ msg: `Successfuly deleted ${docs.email}` });
    }
  });
};

module.exports = {
  addUser,
  makeToken,
  checkToken,
  getUsers,
  deleteUser,
};
