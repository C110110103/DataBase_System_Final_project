const sendMail = require("../tools/sendMail");
const registerValidation = require("../tools/validation").registerValidation;
const userModels = require("../models/userModels");
const uuid = require("uuid");
const moment = require("moment-timezone");

// 设置时区为台湾时间
moment.tz.setDefault("Asia/Taipei");

const { fontEndUrl } = process.env;

/*
Registers a new user account and sends an email to the user with their password.
*/
register = async (req, res) => {
  let { error } = registerValidation(req.body); // 使用 req.body 获取数据
  console.log(req.body);
  // console.log(req);
  if (error) {
    console.log(error);
    return res.status(400).send({ message: "This case is not allowed", error });
  }

  try {
    let findEmailResult = await userModels.findEmail(req.body.email);
    if (findEmailResult.length > 0) {
      console.log("findEmailResult", findEmailResult);
      return res.status(400).send({ message: "Email already exists" });
    }
  } catch (error) {
    console.log("findEmailResult occurred error:", error);
    return res.status(500).send({
      message: "Error occurred while querying database",
      error: error,
    });
  }

  try {
    let findUsernameResult = await userModels.findUsername(req.body.username);
    if (findUsernameResult.length > 0) {
      console.log("findUsernameResult", findUsernameResult);
      return res.status(400).send({ message: "Username already exists" });
    }
  } catch (error) {
    console.log("findUsernameResult occurred error:", error);
    return res.status(500).send({
      message: "Error occurred while querying database",
      error: error,
    });
  }

  let { username, email } = req.body;

  const randPass = Math.random().toString(36) + Math.random().toString(36);
  const password = randPass.substring(3, 11);
  const hash = await userModels.generateHash(password);

  let newAccount = {
    userId: uuid.v4(),
    username: username,
    email: email,
    password: hash,
    create_time: moment().format("YYYY-MM-DD HH:mm:ss"), // 格式化当前时间为 MySQL 格式的字符串
  };

  console.log(newAccount);

  try {
    await userModels.createNewAccount(newAccount);
  } catch (e) {
    return res.status(500).send("Not able to create a new account");
  }

  try {
    const url = `${fontEndUrl}/Personal`;
    const text = `你的密碼為 '${password}' 歡迎加入 ! !\n請盡快去\n${url}\n修改成您自己密碼 ! !`;

    const mailOptions = {
      to: email,
      subject: "帳號創建成功通知信",
      text: text,
    };

    let sendMailReault = sendMail.sendMail(mailOptions);

    if (!sendMailReault) {
      return res
        .status(200)
        .send("Account created successfully and email sent successfully!");
    } else {
      return res.status(500).send("Not able to send email");
    }
  } catch (e) {
    return res.status(500).send("Not able to send email");
  }
};

module.exports = {
  register,
};
