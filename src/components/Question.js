import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/helpers";

const Question = (props) => {
  const navigate = useNavigate();
  const handleShow = (e) => {
    e.preventDefault();
    navigate(`questions/${id}`);
  };

  if (props.question === null) {
    return <div>This question doesn't exist.</div>;
  }
  const { id, timestamp, author } = props.question;
  return (
    <div className="card">
      <div className="card-body">
        <figure className="text-center">
          <h5 className="card-title">{author}</h5>
          <p className="card-text">{formatDate(timestamp)}</p>
        </figure>
        <div className="d-grid gap-2">
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={handleShow}
          >
            Show
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
  const question = questions[id];
  return {
    authedUser,
    question,
  };
};
export default connect(mapStateToProps)(Question);
