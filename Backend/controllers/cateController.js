const db = require("../util/dbconfig");

getCate = (req, res) => {
  var sql = "select * from user";
  var sqlArr = [];
  var callBack = (err, data) => {
    if (err) {
      console.log("連接出錯");
    } else {
      res.send({
        list: data,
      });
    }
  };

  db.sqlConnect(sql, sqlArr, callBack);
};

module.exports = {
  getCate,
};
