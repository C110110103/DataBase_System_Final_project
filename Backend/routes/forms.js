var express = require("express");
var router = express.Router();
var form = require("../controllers/formController");

/* GET users listing. */
router.post("/createForm", form.createForm);

module.exports = router;
