import { connect } from "react-redux";
import Question from "./Question";

const Questions = (props) => {
  return (
    // <div className="card text-bg-light mb-3">
    //   <div className="card-header h4 text-center">{props.questionHeader}</div>
    //   <div className="card-body">
    //     <div className="row">
    //       {props.questionIds.map((id) => (
    //         <div key={id} className="col-sm-4 mb-3">
    //           <Question id={id} />
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
    <div className="card-body">
      <div className="row">
        {props.questionIds.map((id) => (
          <div key={id} className="col-sm-4 mb-3">
            <Question id={id} />
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (
  { questions, authedUser },
  { questionHeader, questionIds }
) => {
  return {
    questions,
    authedUser,
    questionHeader,
    questionIds,
  };
};

export default connect(mapStateToProps)(Questions);
