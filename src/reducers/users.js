import {
  RECEIVE_USERS,
  UPDATE_USERS_WITH_ANSWERS,
  UPDATE_USERS_WITH_QUESTION,
} from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case UPDATE_USERS_WITH_ANSWERS:
      return {
        ...state,
        [action.info.authedUser]: {
          ...state[action.info.authedUser],
          answers: {
            ...state[action.info.authedUser].answers,
            [action.info.qid]: action.info.answer,
          },
        },
      };
    case UPDATE_USERS_WITH_QUESTION:
      return {
        ...state,
        [action.info.author]: {
          ...state[action.info.author],
          questions: state[action.info.author].questions.concat([
            action.info.id,
          ]),
        },
      };
    default:
      return state;
  }
}
