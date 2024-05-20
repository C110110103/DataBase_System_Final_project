const { getAllform } = require("../controllers/formController");
const db = require("../util/dbconfig");

createForm = (newForm) => {
  return new Promise((resolve, reject) => {
    var sql =
      "insert into form (formId, formName, createdTime, creatorId) values (?, ?, ?, ?)";
    var sqlArr = [
      newForm.formId,
      newForm.formName,
      newForm.createdTime,
      newForm.creatorId,
    ];
    var callBack = (err, data) => {
      if (err) {
        console.log("createForm 建立出错 : ", err);
        reject(err);
      } else {
        console.log("createForm 建立结果 : ", data);
        resolve(data);
      }
    };

    db.sqlConnect(sql, sqlArr, callBack);
  });
};

createFormQuestion = (newQuestion) => {
  return new Promise((resolve, reject) => {
    var sql =
      "insert into formQuestion (formQuestionId, formId, Description, questionType) values (?, ?, ?, ?)";
    var sqlArr = [
      newQuestion.formQuestionId,
      newQuestion.formId,
      newQuestion.Description,
      newQuestion.questionType,
    ];
    var callBack = (err, data) => {
      if (err) {
        console.log("createFormQuestion 建立出错 : ", err);
        reject(err);
      } else {
        console.log("createFormQuestion 建立结果 : ", data);
        resolve(data);
      }
    };

    db.sqlConnect(sql, sqlArr, callBack);
  });
};

createFormOption = (newOption) => {
  return new Promise((resolve, reject) => {
    var sql =
      "insert into formOption (formOptionId, formQuestionId, Description) values (?, ?, ?)";
    var sqlArr = [
      newOption.formOptionId,
      newOption.formQuestionId,
      newOption.Description,
    ];
    var callBack = (err, data) => {
      if (err) {
        console.log("createFormOption 建立出错 : ", err);
        reject(err);
      } else {
        console.log("createFormOption 建立结果 : ", data);
        resolve(data);
      }
    };

    db.sqlConnect(sql, sqlArr, callBack);
  });
};

getAllForm = (creatorId) => {
  console.log("getAllForm creatorId: ", creatorId, typeof creatorId);
  return new Promise((resolve, reject) => {
    var sql = "select * from form where creatorId = ?";
    var sqlArr = [creatorId];
    var callBack = (err, data) => {
      if (err) {
        console.log("getAllForm 查询出错 : ", err);
        reject(err);
      } else {
        console.log("getAllForm 查询结果 : ", data);
        resolve(data);
      }
    };

    db.sqlConnect(sql, sqlArr, callBack);
  });
};

getFormById = (formId) => {
  return new Promise((resolve, reject) => {
    var sql = "select * from form where formId = ?";
    var sqlArr = [formId];
    var callBack = (err, data) => {
      if (err) {
        console.log("getFormById 查询出错 : ", err);
        reject(err);
      } else {
        console.log("getFormById 查询结果 : ", data);
        resolve(data);
      }
    };

    db.sqlConnect(sql, sqlArr, callBack);
  });
};

getFormQuestionsById = (formId) => {
  return new Promise((resolve, reject) => {
    var sql = "select * from formQuestion where formId = ?";
    var sqlArr = [formId];
    var callBack = (err, data) => {
      if (err) {
        console.log("getFormQuestionsById 查询出错 : ", err);
        reject(err);
      } else {
        console.log("getFormQuestionsById 查询结果 : ", data);
        resolve(data);
      }
    };

    db.sqlConnect(sql, sqlArr, callBack);
  });
};

getFormOptionsById = (formQuestionId) => {
  return new Promise((resolve, reject) => {
    var sql = "select * from formOption where formQuestionId = ?";
    var sqlArr = [formQuestionId];
    var callBack = (err, data) => {
      if (err) {
        console.log("getFormOptionsById 查询出错 : ", err);
        reject(err);
      } else {
        console.log("getFormOptionsById 查询结果 : ", data);
        resolve(data);
      }
    };

    db.sqlConnect(sql, sqlArr, callBack);
  });
};

modiflyForm = (newForm) => {
  return new Promise((resolve, reject) => {
    var sql = "update form set formName = ? where formId = ?";
    var sqlArr = [newForm.formName, newForm.formId];
    var callBack = (err, data) => {
      if (err) {
        console.log("modiflyForm 修改出错 : ", err);
        reject(err);
      } else {
        console.log("modiflyForm 修改结果 : ", data);
        resolve(data);
      }
    };

    db.sqlConnect(sql, sqlArr, callBack);
  });
};

module.exports = {
  createForm,
  createFormQuestion,
  createFormOption,
  getAllForm,
  getFormById,
  getFormQuestionsById,
  getFormOptionsById,
  modiflyForm,
};
