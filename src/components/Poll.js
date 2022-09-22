import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleAnswerQuestion } from "../actions/shared";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const Poll = (props) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    const { id } = props.router.params;
    const { dispatch } = props;
    const { name } = e.target;
    dispatch(handleAnswerQuestion(id, name));
    navigate(`/`);
  };
  if (!props.question) {
    return (
      <div
        className="alert alert-danger d-flex align-items-center"
        role="alert"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
          viewBox="0 0 16 16"
          role="img"
          aria-label="Warning:"
          width="16"
        >
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
        <div>This question doesn't exist.</div>
      </div>
    );
  }
  const { authedUser, question, users } = props;
  const { id, avatarURL } = users[question.author];
  const { answers } = users[authedUser];
  const { optionOne, optionTwo } = question;
  const isQuestionAnsweredAlready = Object.keys(answers).includes(question.id);
  const isOptionOneChosen = optionOne.votes.includes(authedUser);
  const isOptionTwoChosen = optionTwo.votes.includes(authedUser);
  return (
    <div className="row">
      <div className="col-12 h4 text-center">Poll by {id}</div>
      <div className="col-12 text-center">
        {avatarURL ? (
          <img
            src={avatarURL}
            alt={`Avatar of ${id}`}
            className="rounded-circle"
            style={{ width: "150px" }}
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="150"
            height="150"
            fill="currentColor"
            className="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
        )}
      </div>
      <div className="col-12 h4 text-center">Would You Rather</div>
      <div className="col-6">
        <div
          className={
            isOptionOneChosen ? `card border-info` : `card border-dark`
          }
        >
          <div className="card-body">
            <div className="h4 text-center">{optionOne.text}</div>
            {isQuestionAnsweredAlready ? (
              <div className="row text-center">
                <div className="col-6">
                  <h4>
                    <span className="badge bg-secondary">
                      {optionOne.votes.length}
                    </span>
                  </h4>
                </div>
                <div className="col-6">
                  <h4>
                    <span className="badge bg-secondary">
                      {Math.round(
                        (optionOne.votes.length /
                          (optionOne.votes.length + optionTwo.votes.length)) *
                          100
                      )}
                      %
                    </span>
                  </h4>
                </div>
              </div>
            ) : (
              <button
                type="button"
                className="w-100 btn btn-outline-success"
                onClick={handleClick}
                name="optionOne"
              >
                Click
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="col-6">
        <div
          className={
            isOptionTwoChosen ? `card border-info` : `card border-dark`
          }
        >
          <div className="card-body">
            <div className="h4 text-center">{optionTwo.text}</div>
            {isQuestionAnsweredAlready ? (
              <div className="row text-center">
                <div className="col-6">
                  <h4>
                    <span className="badge bg-secondary">
                      {optionTwo.votes.length}
                    </span>
                  </h4>
                </div>
                <div className="col-6">
                  <h4>
                    <span className="badge bg-secondary">
                      {Math.round(
                        (optionTwo.votes.length /
                          (optionOne.votes.length + optionTwo.votes.length)) *
                          100
                      )}
                      %
                    </span>
                  </h4>
                </div>
              </div>
            ) : (
              <button
                type="button"
                className="w-100 btn btn-outline-success"
                onClick={handleClick}
                name="optionTwo"
              >
                Click
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, props) => {
  const { id } = props.router.params;
  const question = questions[id];
  return {
    authedUser,
    question,
    users,
  };
};

export default withRouter(connect(mapStateToProps)(Poll));
