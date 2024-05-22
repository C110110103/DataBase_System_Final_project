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

  console.log("createFormQuestion req.body.questions", req.body.questions);

  for (let i = 0; i < req.body.questions.length; i++) {
    let newQuestion = {
      formQuestionId: uuid.v4(),
      formId: newForm.formId,
      Description: req.body.questions[i].questionText,
      questionType: req.body.questions[i].questionType,
      questionIndex: i,
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
        optionIndex: j,
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
    // console.log("data", data[0]);
  } catch (e) {
    console.log("getFormById occurred error:", e);
    return res.status(500).send({
      message: "getFormById Error occurred while querying database",
      error: e,
    });
  }

  let questions;

  try {
    const tempquestions = await formModels.getFormQuestionsById(formId);

    // Sort questions by questionIndex
    tempquestions.sort((a, b) => a.questionIndex - b.questionIndex);

    questions = tempquestions;

    for (let i = 0; i < questions.length; i++) {
      returnData.questions.push({
        questionText: questions[i].Description,
        questionType: questions[i].questionType,
        questionIndex: questions[i].questionIndex,
        options: [], // Initialize options as an empty array
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

      // Sort options by optionIndex
      data.sort((a, b) => a.optionIndex - b.optionIndex);

      for (let j = 0; j < data.length; j++) {
        returnData.questions[i].options.push({
          optionText: data[j].Description,
          optionId: data[j].formOptionId,
        });
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
    formId: req.body.FormId,
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

  let questions = req.body.questions;
  let questionsId = [];

  try {
    let data = await formModels.findFormQustionId(newForm.formId);
    for (let i = 0; i < data.length; i++) {
      questionsId.push(data[i].formQuestionId);
    }
    console.log("data", questionsId);
  } catch (e) {
    console.log("findFormQustionId occurred error:", e);
    return res.status(500).send({
      message: "findFormQustionId Error occurred while querying database",
      error: e,
    });
  }

  try {
    await formModels.deleteFormQuestions(newForm.formId);
  } catch (e) {
    console.log("deleteFormQuestions occurred error:", e);
    return res.status(500).send({
      message: "deleteFormQuestions Error occurred while querying database",
      error: e,
    });
  }

  for (let i = 0; i < questionsId.length; i++) {
    try {
      await formModels.deleteFormOptions(questionsId[i]);
    } catch (e) {
      console.log("deleteFormOptions occurred error:", e);
      return res.status(500).send({
        message: "deleteFormOptions Error occurred while querying database",
        error: e,
      });
    }
  }

  for (let i = 0; i < questions.length; i++) {
    let newQuestion = {
      formQuestionId: uuid.v4(),
      formId: newForm.formId,
      Description: questions[i].questionText,
      questionType: questions[i].questionType,
      questionIndex: i,
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

    for (let j = 0; j < questions[i].options.length; j++) {
      let newOption = {
        formOptionId: uuid.v4(),
        formQuestionId: newQuestion.formQuestionId,
        Description:
          questions[i].options[j].optionText === undefined
            ? questions[i].options[j]
            : questions[i].options[j].optionText,
        optionIndex: j,
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

  return res.status(200).send({ message: "modifyForm successful" });
};

deleteForm = async (req, res) => {
  let formId = req.params.FormId;

  try {
    await formModels.deleteForm(formId);
  } catch (e) {
    console.log("deleteForm occurred error:", e);
    return res.status(500).send({
      message: "deleteForm Error occurred while querying database",
      error: e,
    });
  }

  let questionsId = [];

  try {
    let data = await formModels.findFormQustionId(formId);
    for (let i = 0; i < data.length; i++) {
      questionsId.push(data[i].formQuestionId);
    }
  } catch (e) {
    console.log("findQuestionId occurred error:", e);
    return res.status(500).send({
      message: "findQuestionId Error occurred while querying database",
      error: e,
    });
  }

  try {
    await formModels.deleteFormQuestions(formId);
  } catch (e) {
    console.log("deleteFormQuestions occurred error:", e);
    return res.status(500).send({
      message: "deleteFormQuestions Error occurred while querying database",
      error: e,
    });
  }

  for (let i = 0; i < questionsId.length; i++) {
    try {
      await formModels.deleteFormOptions(questionsId[i]);
    } catch (e) {
      console.log("deleteFormOptions occurred error:", e);
      return res.status(500).send({
        message: "deleteFormOptions Error occurred while querying database",
        error: e,
      });
    }
  }

  return res.status(200).send({ message: "deleteForm successful" });
};

submitForm = async (req, res) => {
  let newFormResponse = {
    formResponseId: uuid.v4(),
    formId: req.body.FormId,
    userId: req.body.userId,
    submissionTime: req.body.submissionTime,
  };

  try {
    let result = await formModels.haveresponse(
      newFormResponse.formId,
      newFormResponse.userId
    );

    if (result.length > 0) {
      return res.status(400).send({
        message: "you have already submitted this form",
      });
    }
  } catch (e) {
    console.log("haveresponse occurred error:", e);
    return res.status(500).send({
      message: "haveresponse Error occurred while querying database",
      error: e,
    });
  }

  try {
    await formModels.createFormResponse(newFormResponse);
  } catch (e) {
    console.log("createFormResponse occurred error:", e);
    return res.status(500).send({
      message: "createFormResponse Error occurred while querying database",
      error: e,
    });
  }
  console.log("req.body.responses", req.body.responses);

  for (let i = 0; i < Object.keys(req.body.responses).length; i++) {
    const response = req.body.responses[i];

    if (Array.isArray(response)) {
      for (let j = 0; j < response.length; j++) {
        let newResponseDetail = {
          formResponseDetailId: uuid.v4(),
          formResponseId: newFormResponse.formResponseId,
          formOptionId: response[j].optionId,
          optionText: response[j].optionText,
        };

        console.log("newResponseDetail", newResponseDetail);

        try {
          await formModels.createFormResponseDetail(newResponseDetail);
        } catch (e) {
          console.log("createFormResponseDetail occurred error:", e);
          return res.status(500).send({
            message:
              "createFormResponseDetail Error occurred while querying database",
            error: e,
          });
        }
      }
    } else {
      let newResponseDetail = {
        formResponseDetailId: uuid.v4(),
        formResponseId: newFormResponse.formResponseId,
        formOptionId: response.optionId,
        optionText: response.optionText,
      };

      console.log("newResponseDetail", newResponseDetail);

      try {
        await formModels.createFormResponseDetail(newResponseDetail);
      } catch (e) {
        console.log("createFormResponseDetail occurred error:", e);
        return res.status(500).send({
          message:
            "createFormResponseDetail Error occurred while querying database",
          error: e,
        });
      }
    }
  }

  return res.status(200).send({ message: "submitForm successful" });
};

module.exports = {
  createForm,
  getAllform,
  getFormById,
  modifyForm,
  deleteForm,
  submitForm,
};
