const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "12345678",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function initialDatabase() {
  let connection;
  try {
    // 从连接池中获取连接
    connection = await pool.getConnection();
    await connection.query("CREATE DATABASE IF NOT EXISTS mydb");
    await connection.query("USE mydb");
    await connection.query(
      `CREATE TABLE IF NOT EXISTS user (
      userId VARCHAR(50) NOT NULL PRIMARY KEY,
      userName VARCHAR(50) NOT NULL,
      password VARCHAR(70) NOT NULL,
      create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      email VARCHAR(255) NOT NULL
      )`
    );
    await connection.query(
      `CREATE TABLE IF NOT EXISTS form (
      formId VARCHAR(500) NOT NULL PRIMARY KEY,
      formName VARCHAR(500) NOT NULL,
      createdTime VARCHAR(50) NOT NULL,
      creatorId VARCHAR(50) NOT NULL
      )`
    );

    await connection.query(
      `CREATE TABLE IF NOT EXISTS formQuestion (
      formQuestionId VARCHAR(50) NOT NULL PRIMARY KEY,
      formId VARCHAR(50) NOT NULL,
      Description VARCHAR(500) NOT NULL,
      questionType VARCHAR(50) NOT NULL
      )`
    );
    await connection.query(
      `CREATE TABLE IF NOT EXISTS formOption (
      formOptionId VARCHAR(50) NOT NULL PRIMARY KEY,
      formQuestionId VARCHAR(50) NOT NULL,
      Description VARCHAR(500) NOT NULL
      )`
    );

    console.log("資料庫初始化完成");
  } catch (error) {
    console.error("Error occurred while initializing the database", error);
  } finally {
    if (connection) {
      // 释放连接回连接池
      connection.release();
    }
  }
}

module.exports = {
  initialDatabase,
};
