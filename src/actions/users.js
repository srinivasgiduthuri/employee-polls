export const RECEIVE_USERS = "RECEIVE_USERS";
export const UPDATE_USERS_WITH_ANSWERS = "UPDATE_USERS_WITH_ANSWERS";
export const UPDATE_USERS_WITH_QUESTION = "UPDATE_USERS_WITH_QUESTION";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function updateUsersWithAnswers(info) {
  return {
    type: UPDATE_USERS_WITH_ANSWERS,
    info,
  };
}

export function updateUsersWithQuestion(info) {
  return {
    type: UPDATE_USERS_WITH_QUESTION,
    info,
  };
}
