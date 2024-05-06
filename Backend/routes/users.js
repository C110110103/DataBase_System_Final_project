var express = require("express");
var router = express.Router();
var user = require("../controllers/userController");

/* GET users listing. */
router.post("/register", user.register);

module.exports = router;
