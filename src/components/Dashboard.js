import { useState } from "react";
import { connect } from "react-redux";
import Questions from "./Questions";

const Dashboard = (props) => {
  const [toggleQuestions, setToggleQuestions] = useState(true);
  const handleClick = (e) => {
    e.preventDefault();
    const { name } = e.target;
    if (name === "new-questions-button") {
      setToggleQuestions(true);
    } else if (name === "done-button") {
      setToggleQuestions(false);
    }
  };
  return (
    <div>
      <div className="card text-center">
        <div className="card-header">
          <ul className="nav nav-pills card-header-pills">
            <li className="nav-item">
              <button
                type="button"
                name="new-questions-button"
                className={
                  toggleQuestions
                    ? `btn btn-link nav-link active`
                    : `btn btn-link nav-link`
                }
                onClick={handleClick}
              >
                New Questions
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                name="done-button"
                className={
                  !toggleQuestions
                    ? `btn btn-link nav-link active`
                    : `btn btn-link nav-link`
                }
                onClick={handleClick}
              >
                Done
              </button>
            </li>
          </ul>
        </div>
        {toggleQuestions ? (
          <Questions
            questionHeader={`New Questions`}
            questionIds={props.unansweredQuestionIds}
          />
        ) : (
          <Questions
            questionHeader={`Done`}
            questionIds={props.answeredQuestionIds}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser }) => {
  return {
    answeredQuestionIds: Object.keys(questions)
      .filter(
        (id) =>
          questions[id].optionOne.votes.includes(authedUser) ||
          questions[id].optionTwo.votes.includes(authedUser)
      )
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    unansweredQuestionIds: Object.keys(questions)
      .filter(
        (id) =>
          !questions[id].optionOne.votes.includes(authedUser) &&
          !questions[id].optionTwo.votes.includes(authedUser)
      )
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
  };
};

export default connect(mapStateToProps)(Dashboard);
