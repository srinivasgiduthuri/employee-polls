import { connect } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

const Login = ({ dispatch, users }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "user") {
      setUser(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowError(false);
    const loginUser = Object.keys(users).filter(
      (id) => users[id].id === user && users[id].password === password
    );
    if (loginUser && loginUser.length === 1) {
      dispatch(setAuthedUser(users[user].id));
      navigate(`/`);
    } else {
      setShowError(true);
    }
    setUser("");
    setPassword("");
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
              <label htmlFor="user" className="form-label">
                User
              </label>
              <input
                className="form-control"
                name="user"
                value={user}
                onChange={handleChange}
                data-testid="user"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={handleChange}
                data-testid="password"
              />
            </div>
            <div className="d-grid gap-2">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={user === "" || password === ""}
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
