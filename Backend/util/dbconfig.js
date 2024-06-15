const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10, // 设置最大连接数
  host: "localhost",
  port: "3306", // 请注意，这里应该是 "port" 而不是 "post"
  user: "root",
  password: "12345678",
  database: "mydb",
});

module.exports = {
  // 連接資料庫
  sqlConnect: function (sql, sqlArr, callBack) {
    pool.getConnection((err, conn) => {
      if (err) {
        console.log("連接到資料庫失敗");
        console.log(err);
        return;
      } else {
        console.log("連接到資料庫成功");
      }
      // 事件執行
      conn.query(sql, sqlArr, (queryErr, results, fields) => {
        // 釋放連接
        conn.release();
        if (queryErr) {
          console.log("查詢失敗");
          console.log(queryErr);
          return;
        }
        // 调用回调函数处理查询结果
        callBack(null, results, fields);
      });
    });
  },
};
