const createFormValidation =
  require("../tools/validation").createFormValidation;
const uuid = require("uuid");
const formModels = require("../models/formModels");

createForm = async (req, res) => {
  let { error } = createFormValidation(req.body);
  if (error) {
    console.log("createFormValidation", error);
    return res.status(400).send({ message: "This case is not allowed", error });
  }

  let newForm = {
    formId: uuid.v4(),
    formName: req.body.formName,
    createdTime: req.body.createdTime,
    creatorId: req.body.creatorId,
  };

  console.log("newForm", newForm);

  try {
    await formModels.createForm(newForm);
  } catch (e) {
    console.log("createForm occurred error:", e);
    return res.status(500).send({
      message: "createForm Error occurred while querying database",
      error: e,
    });
  }

  for (let i = 0; i < req.body.questions.length; i++) {
    let newQuestion = {
      formQuestionId: uuid.v4(),
      formId: newForm.formId,
      Description: req.body.questions[i].questionText,
      questionType: req.body.questions[i].questionType,
    };

    try {
      await formModels.createFormQuestion(newQuestion);
    } catch (e) {
      console.log("createFormQuestion occurred error:", e);
      return res.status(500).send({
        message: "createFormQuestion Error occurred while querying database",
        error: e,
      });
    }

    for (let j = 0; j < req.body.questions[i].options.length; j++) {
      let newOption = {
        formOptionId: uuid.v4(),
        formQuestionId: newQuestion.formQuestionId,
        Description: req.body.questions[i].options[j],
      };

      try {
        await formModels.createFormOption(newOption);
      } catch (e) {
        console.log("createFormOption occurred error:", e);
        return res.status(500).send({
          message: "createFormOption Error occurred while querying database",
          error: e,
        });
      }
    }
  }

  return res.status(200).send({ message: "createForm successful" });
};

getAllform = async (req, res) => {
  let creatorId = req.params.creatorId;

  console.log("creatorId", creatorId);

  try {
    let result = await formModels.getAllForm(creatorId);
    return res.status(200).send(result);
  } catch (e) {
    console.log("getAllForm occurred error:", e);
    return res.status(500).send({
      message: "getAllForm Error occurred while querying database",
      error: e,
    });
  }
};

const getFormById = async (req, res) => {
  let formId = req.params.FormId;

  console.log("formId", formId);

  let returnData = {
    formName: "",
    questions: [], // 将 questions 定义为一个数组
  };

  try {
    let data = await formModels.getFormById(formId);
    returnData.formName = data[0].formName;
    console.log("data", data[0]);
  } catch (e) {
    console.log("getFormById occurred error:", e);
    return res.status(500).send({
      message: "getFormById Error occurred while querying database",
      error: e,
    });
  }

  let questions;

  try {
    questions = await formModels.getFormQuestionsById(formId);
    for (let i = 0; i < questions.length; i++) {
      returnData.questions.push({
        questionText: questions[i].Description,
        questionType: questions[i].questionType,
        options: [], // 初始化 options 为一个空数组
      });
    }
  } catch (e) {
    console.log("getFormQuestionsById occurred error:", e);
    return res.status(500).send({
      message: "getFormQuestionsById Error occurred while querying database",
      error: e,
    });
  }

  for (let i = 0; i < questions.length; i++) {
    try {
      let data = await formModels.getFormOptionsById(
        questions[i].formQuestionId
      );

      for (let j = 0; j < data.length; j++) {
        returnData.questions[i].options.push(data[j].Description);
      }
    } catch (e) {
      console.log("getFormOptionsById occurred error:", e);
      return res.status(500).send({
        message: "getFormOptionsById Error occurred while querying database",
        error: e,
      });
    }
  }

  return res.status(200).send(returnData);
};

modifyForm = async (req, res) => {
  let newForm = {
    formId: req.body.formId,
    formName: req.body.formName,
  };

  try {
    await formModels.modiflyForm(newForm);
  } catch (e) {
    console.log("modiflyForm occurred error:", e);
    return res.status(500).send({
      message: "modiflyForm Error occurred while querying database",
      error: e,
    });
  }
};

module.exports = {
  createForm,
  getAllform,
  getFormById,
  modifyForm,
};
