import { connect } from "react-redux";
import Questions from "./Questions";

const Dashboard = (props) => {
  return (
    <div>
      <Questions
        questionHeader={`New Questions`}
        questionIds={props.unansweredQuestionIds}
      />
      <Questions
        questionHeader={`Done`}
        questionIds={props.answeredQuestionIds}
      />
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
