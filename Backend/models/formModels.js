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
      "insert into formQuestion (formQuestionId, formId, Description, questionType, questionIndex) values (?, ?, ?, ?, ?)";
    var sqlArr = [
      newQuestion.formQuestionId,
      newQuestion.formId,
      newQuestion.Description,
      newQuestion.questionType,
      newQuestion.questionIndex,
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
      "insert into formOption (formOptionId, formQuestionId, Description, optionIndex) values (?, ?, ?, ?)";
    var sqlArr = [
      newOption.formOptionId,
      newOption.formQuestionId,
      newOption.Description,
      newOption.optionIndex,
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

deleteFormQuestions = (formId) => {
  return new Promise((resolve, reject) => {
    var sql = "delete from formQuestion where formId = ?";
    var sqlArr = [formId];
    var callBack = (err, data) => {
      if (err) {
        console.log("deleteFormQuestions 删除出错 : ", err);
        reject(err);
      } else {
        console.log("deleteFormQuestions 删除结果 : ", data);
        resolve(data);
      }
    };

    db.sqlConnect(sql, sqlArr, callBack);
  });
};

findFormQustionId = (formId) => {
  return new Promise((resolve, reject) => {
    var sql = "select formQuestionId from formQuestion where formId = ?";
    var sqlArr = [formId];
    var callBack = (err, data) => {
      if (err) {
        console.log("findFormQustionId 查询出错 : ", err);
        reject(err);
      } else {
        console.log("findFormQustionId 查询结果 : ", data);
        resolve(data);
      }
    };

    db.sqlConnect(sql, sqlArr, callBack);
  });
};

deleteFormOptions = (formQuestionId) => {
  return new Promise((resolve, reject) => {
    var sql = "delete from formOption where formQuestionId = ?";
    var sqlArr = [formQuestionId];
    var callBack = (err, data) => {
      if (err) {
        console.log("deleteFormOptions 删除出错 : ", err);
        reject(err);
      } else {
        console.log("deleteFormOptions 删除结果 : ", data);
        resolve(data);
      }
    };

    db.sqlConnect(sql, sqlArr, callBack);
  });
};

deleteForm = (formId) => {
  return new Promise((resolve, reject) => {
    var sql = "delete from form where formId = ?";
    var sqlArr = [formId];
    var callBack = (err, data) => {
      if (err) {
        console.log("deleteForm 删除出错 : ", err);
        reject(err);
      } else {
        console.log("deleteForm 删除结果 : ", data);
        resolve(data);
      }
    };

    db.sqlConnect(sql, sqlArr, callBack);
  });
};

createFormResponse = (newFormResponse) => {
  return new Promise((resolve, reject) => {
    var sql =
      "insert into formResponse (formResponseId, formId, userId, submissionTime) values (?, ?, ?, ?)";
    var sqlArr = [
      newFormResponse.formResponseId,
      newFormResponse.formId,
      newFormResponse.userId,
      newFormResponse.submissionTime,
    ];
    var callBack = (err, data) => {
      if (err) {
        console.log("createFormResponse 建立出错 : ", err);
        reject(err);
      } else {
        console.log("createFormResponse 建立结果 : ", data);
        resolve(data);
      }
    };

    db.sqlConnect(sql, sqlArr, callBack);
  });
};

createFormResponseDetail = (newFormResponseDetail) => {
  return new Promise((resolve, reject) => {
    var sql =
      "insert into formResponseDetail (formResponseDetailId, formResponseId, formOptionId, optionText) values (?, ?, ?, ?)";
    var sqlArr = [
      newFormResponseDetail.formResponseDetailId,
      newFormResponseDetail.formResponseId,
      newFormResponseDetail.formOptionId,
      newFormResponseDetail.optionText,
    ];
    var callBack = (err, data) => {
      if (err) {
        console.log("createFormResponseDetail 建立出错 : ", err);
        reject(err);
      } else {
        console.log("createFormResponseDetail 建立结果 : ", data);
        resolve(data);
      }
    };

    db.sqlConnect(sql, sqlArr, callBack);
  });
};

haveresponse = (formId, userId) => {
  return new Promise((resolve, reject) => {
    var sql = "select * from formResponse where formId = ? and userId = ?";
    var sqlArr = [formId, userId];
    var callBack = (err, data) => {
      if (err) {
        console.log("haveresponse 查询出错 : ", err);
        reject(err);
      } else {
        console.log("haveresponse 查询结果 : ", data);
        resolve(data);
      }
    };

    db.sqlConnect(sql, sqlArr, callBack);
  });
};

getFormResponses = (formId) => {
  return new Promise((resolve, reject) => {
    var sql = "select * from formResponse where formId = ?";
    var sqlArr = [formId];
    var callBack = (err, data) => {
      if (err) {
        console.log("getFormResponses 查询出错 : ", err);
        reject(err);
      } else {
        console.log("getFormResponses 查询结果 : ", data);
        resolve(data);
      }
    };

    db.sqlConnect(sql, sqlArr, callBack);
  });
};

getFormResponseDetails = (formResponseId) => {
  return new Promise((resolve, reject) => {
    var sql = "select * from formResponseDetail where formResponseId = ?";
    var sqlArr = [formResponseId];
    var callBack = (err, data) => {
      if (err) {
        console.log("getFormResponseDetails 查询出错 : ", err);
        reject(err);
      } else {
        console.log("getFormResponseDetails 查询结果 : ", data);
        resolve(data);
      }
    };

    db.sqlConnect(sql, sqlArr, callBack);
  });
};

haveresponse = (formId, userId) => {
  return new Promise((resolve, reject) => {
    var sql = "select * from formResponse where formId = ? and userId = ?";
    var sqlArr = [formId, userId];
    var callBack = (err, data) => {
      if (err) {
        console.log("haveresponse 查询出错 : ", err);
        reject(err);
      } else {
        console.log("haveresponse 查询结果 : ", data);
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
  deleteFormQuestions,
  findFormQustionId,
  deleteFormOptions,
  deleteForm,
  createFormResponse,
  createFormResponseDetail,
  haveresponse,
  getFormResponses,
  getFormResponseDetails,
  haveresponse,
};
