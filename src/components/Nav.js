import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetAuthedUser } from "../actions/authedUser";

const Nav = ({ dispatch, authedUser, users }) => {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(resetAuthedUser());
    navigate(`/`);
  };
  return (
    authedUser &&
    users[authedUser] && (
      <nav className="navbar navbar-expand-lg mb-4">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">
                  Leaderboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add">
                  New
                </Link>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center">
            <div className="p-2">
              {users[authedUser].avatarURL ? (
                <img
                  src={users[authedUser].avatarURL}
                  alt={`Avatar of ${users[authedUser].id}`}
                  className="rounded-circle"
                  style={{ width: "50px" }}
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
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
            <div className="p-2">
              <span className="navbar-text">{users[authedUser].name}</span>
            </div>
            <div className="p-2">
              <span className="navbar-text">
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </span>
            </div>
          </div>
        </div>
      </nav>
    )
  );
};
const mapStateToProps = ({ authedUser, users }) => {
  return {
    authedUser,
    users,
  };
};

export default connect(mapStateToProps)(Nav);
