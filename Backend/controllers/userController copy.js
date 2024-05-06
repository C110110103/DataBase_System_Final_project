const sendMail = require("../tools/sendMail");

validatePhoneCode = [];

let sentCodeP = (phone) => {
  for (var item of validatePhoneCode) {
    if (item.phone === phone) {
      return true;
    }
  }
  return false;
};

let findCodeAndPhone = (phone, code) => {
  for (var item of validatePhoneCode) {
    if (item.phone === phone && item.code === code) {
      return "login success";
    }
  }
  return "login fail";
};

sentCode = (req, res) => {
  let phone = req.query.phone;
  let code = Math.floor(1000 + Math.random() * 9000);

  if (sentCodeP(phone)) {
    res.send({
      code: 400,
      msg: "Code has been sent! Please wait for 2 minutes before sending again.",
    });
    return;
  }

  validatePhoneCode.push({
    phone: phone.toString(),
    code: code.toString(),
  });

  console.log(validatePhoneCode);

  res.send({
    code: code,
    msg: "Code sent successfully!",
  });

  const mailOptions = {
    to: "C110110103@nkust.edu.tw",
    subject: "Your verification code",
    text: "Your verification code is " + code,
  };

  sendMail.sendMail(mailOptions);

  console.log("Code sent to " + phone + " is: " + code);
};

codePhoneLogin = (req, res) => {
  let phone = req.query.phone;
  let code = req.query.code;

  if (sentCodeP(phone)) {
    let result = findCodeAndPhone(phone, code);

    if (result === "login success") {
      res.send({
        code: 200,
        msg: "Login success!",
      });
    } else {
      res.send({
        code: 400,
        msg: "Login fail!",
      });
    }
  } else {
    res.send({
      code: 400,
      msg: "未發送驗證碼!請先發送驗證碼!",
    });
  }
};

module.exports = {
  sentCode,
  codePhoneLogin,
};
