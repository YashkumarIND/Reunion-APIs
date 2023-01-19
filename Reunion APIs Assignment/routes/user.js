const User = require("../models/User");
const router = require("express").Router();
const requireLogin  = require('../middleware/requireLogin');



router.get("/:id", requireLogin,async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { _id,email, password, createdAt, updatedAt, isAdmin,_v,...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;