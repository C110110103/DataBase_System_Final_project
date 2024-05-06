const joi = require("joi");

const registerValidation = (data) => {
  const schma = joi.object({
    username: joi.string().min(3).max(20).required(),
    email: joi.string().min(6).max(50).required().email(),
  });
  return schma.validate(data);
};

module.exports = {
  registerValidation,
};
