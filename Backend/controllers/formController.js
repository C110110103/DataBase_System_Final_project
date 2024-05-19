createForm = async (req, res) => {
  console.log("createForm", req.body);
  res.status(200).send("Form created successfully");
};

module.exports = {
  createForm,
};
