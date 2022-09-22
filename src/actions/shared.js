import { getInitialData, saveQuestion, saveQuestionAnswer } from "../utils/api";
import { addQuestion, answerQuestion, receiveQuestions } from "./questions";
import { receiveUsers } from "./users";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { updateUsersWithAnswers } from "./users";
import { updateUsersWithQuestion } from "./users";

export function handleInitialData(authedUser) {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    });
  };
}

export function handleAnswerQuestion(questionId, option) {
  return (dispatch, getState) => {
    const { authedUser, users } = getState();
    dispatch(showLoading());
    return saveQuestionAnswer({
      qid: questionId,
      answer: option,
      authedUser,
    }).then(() => {
      dispatch(
        answerQuestion({
          qid: questionId,
          answer: option,
          authedUser,
          users,
        })
      );
      dispatch(
        updateUsersWithAnswers({
          qid: questionId,
          answer: option,
          authedUser,
          users,
        })
      );
      dispatch(hideLoading());
    });
  };
}

export function handleCreatePoll(optionOne, optionTwo) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());
    return saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser,
    }).then((question) => {
      dispatch(addQuestion(question));
      dispatch(updateUsersWithQuestion(question));
      dispatch(hideLoading());
    });
  };
}
