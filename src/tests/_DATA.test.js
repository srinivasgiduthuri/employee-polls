import {
  _getQuestions,
  _getUsers,
  _saveQuestion,
  _saveQuestionAnswer,
} from "../utils/_DATA";

describe("_getUsers", () => {
  it("will get all users", async () => {
    var result = await _getUsers();
    expect(result).not.toBeNull();
    expect(Object.keys(result).length).toEqual(4);
  });
});

describe("_getQuestions", () => {
  it("will get all questions", async () => {
    var result = await _getQuestions();
    expect(result).not.toBeNull();
    expect(Object.keys(result).length).toEqual(6);
  });
});

describe("_saveQuestion", () => {
  it("will verify that the saved question is returned and all expected fields are populated when correctly formatted data is passed to the function", async () => {
    const question = {
      optionOneText: "Option One",
      optionTwoText: "Option Two",
      author: "mtsamis",
    };
    var result = await _saveQuestion(question);
    expect(result.id).toBeDefined();
    expect(result.timestamp).toBeDefined();
    expect(result.author).toBeDefined();
    expect(result.optionOne).toBeDefined();
    expect(result.optionTwo).toBeDefined();
    expect(result.optionOne.text).toEqual(question.optionOneText);
    expect(result.optionTwo.text).toEqual(question.optionTwoText);
  });

  it("verify that an error is returned if incorrect data is passed to the function", async () => {
    var question = {
      optionOneText: "Option One",
      author: "mtsamis",
    };
    await expect(_saveQuestion(question)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer", () => {
  it("will verify that true is returned when correctly formatted data is passed to the function", async () => {
    const authedUser = "mtsamis";
    const qid = "loxhs1bqm25b708cmbf3g";
    const answer = "optionOne";
    await expect(
      _saveQuestionAnswer({ authedUser, qid, answer })
    ).resolves.toEqual(true);
  });
  it("will verify that an error is returned if incorrect data is passed to the function", async () => {
    const qid = "loxhs1bqm25b708cmbf3g";
    const answer = "optionOne";
    await expect(_saveQuestionAnswer({ qid, answer })).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});
