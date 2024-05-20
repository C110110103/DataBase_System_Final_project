var express = require("express");
var router = express.Router();
var form = require("../controllers/formController");

/* GET users listing. */
router.post("/createForm", form.createForm);
router.get("/getForm/:creatorId", form.getAllform);
router.get("/getFormById/:FormId", form.getFormById);
router.patch("/modifyForm", form.modifyForm);

module.exports = router;
