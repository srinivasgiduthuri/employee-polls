import { connect } from "react-redux";
import { useState } from "react";
import { handleCreatePoll } from "../actions/shared";
import { useNavigate } from "react-router-dom";

const CreatePoll = ({ dispatch }) => {
  const navigate = useNavigate();
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleCreatePoll(optionOne, optionTwo));
    setOptionOne("");
    setOptionTwo("");
    navigate("/");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "optionOne") {
      setOptionOne(value);
    } else if (name === "optionTwo") {
      setOptionTwo(value);
    }
  };
  return (
    <div className="row">
      <div className="text-center col-12">
        <h4 className="h4">Create Your Own Poll</h4>
      </div>
      <div className="text-center col-12">
        <h5 className="h5">Would you rather</h5>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="col-12">
          <div className="form-floating mb-3">
            <input
              className="form-control"
              placeholder="Option One"
              name="optionOne"
              onChange={handleChange}
              value={optionOne}
              data-testid="optionOne"
            />
            <label htmlFor="floatingInput">First Option</label>
          </div>
        </div>
        <div className="col-12">
          <div className="form-floating mb-3">
            <input
              className="form-control"
              placeholder="Option Two"
              name="optionTwo"
              onChange={handleChange}
              value={optionTwo}
              data-testid="optionTwo"
            />
            <label htmlFor="floatingInput">Second Option</label>
          </div>
        </div>
        <div className="d-grid gap-2 col-2 mx-auto">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={optionOne === "" || optionTwo === ""}
            data-testid="createPoll"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default connect()(CreatePoll);
