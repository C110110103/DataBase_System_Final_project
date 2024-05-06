const db = require("../util/dbconfig");
const bcrypt = require("bcrypt");

findEmail = (email) => {
  return new Promise((resolve, reject) => {
    var sql = "select * from user where email = ?";
    var sqlArr = [email];
    var callBack = (err, data) => {
      if (err) {
        console.log("findEmail 查询出错 : ", err);
        reject(err);
      } else {
        console.log("findEmail 查询结果 : ", data);
        resolve(data);
      }
    };

    db.sqlConnect(sql, sqlArr, callBack);
  });
};

findUsername = (username) => {
  return new Promise((resolve, reject) => {
    var sql = "select * from user where username = ?";
    var sqlArr = [username];
    var callBack = (err, data) => {
      if (err) {
        console.log("findUsername 查询出错 : ", err);
        reject(err);
      } else {
        console.log("findUsername 查询结果 : ", data);
        resolve(data);
      }
    };

    db.sqlConnect(sql, sqlArr, callBack);
  });
};

createNewAccount = (newAccount) => {
  return new Promise((resolve, reject) => {
    var sql =
      "insert into user (userId, username, email, password, create_time) values (?, ?, ?, ?, ?)";
    var sqlArr = [
      newAccount.userId,
      newAccount.username,
      newAccount.email,
      newAccount.password,
      newAccount.create_time,
    ];
    var callBack = (err, data) => {
      if (err) {
        console.log("create 出错 : ", err);
        reject(err);
      } else {
        console.log("create 结果 : ", data);
        resolve(data);
      }
    };

    db.sqlConnect(sql, sqlArr, callBack);
  });
};

generateHash = async function (password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findEmail,
  findUsername,
  createNewAccount,
  generateHash,
};
