const mysql = require("mysql");
const { post } = require("../routes");

module.exports = {
  // database 配置
  config: {
    host: "localhost",
    post: "3306",
    user: "root",
    password: "12345678",
    database: "mydb",
  },
  // 連接資料庫
  sqlConnect: function (sql, sqlArr, callBack) {
    var pool = mysql.createPool(this.config);
    pool.getConnection((err, conn) => {
      if (err) {
        console.log("連接到資料庫失敗");
        console.log(err);
        return;
      } else {
        console.log("連接到資料庫成功");
      }
      // 事件執行
      conn.query(sql, sqlArr, callBack);
      // 釋放連接
      conn.release();
    });
  },
};
