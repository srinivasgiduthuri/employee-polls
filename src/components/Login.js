import { connect } from "react-redux";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

const Login = ({ dispatch, users }) => {
  const location = useLocation();
  const [user, setUser] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { value } = e.target;
    setUser(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowError(false);
    dispatch(setAuthedUser(users[user].id));
    navigate(location?.pathname || "/");
  };
  return (
    <div className="container-fluid">
      <h2 className="h2 text-center">Employee Polls</h2>
      <div className="row justify-content-md-center">
        <div className="col-3">
          {showError && (
            <div className="alert alert-danger" role="alert">
              Login failed. Please try again!
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <select
                className="form-select form-select-lg mb-3"
                value={user}
                onChange={handleChange}
                data-testid="user"
              >
                <option value="None" data-testid="user-option">
                  Select user to login
                </option>
                {Object.keys(users).map((id) => (
                  <option key={id} value={id} data-testid="user-option">
                    {users[id].name}
                  </option>
                ))}
              </select>
            </div>
            <div className="d-grid gap-2">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={user === "" || user === "None"}
                data-testid="login"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  users,
});

export default connect(mapStateToProps)(Login);
