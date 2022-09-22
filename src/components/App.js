import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import { handleInitialData } from "../actions/shared";
import CreatePoll from "./CreatePoll";
import Dashboard from "./Dashboard";
import Leaderboard from "./Leaderboard";
import Nav from "./Nav";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Poll from "./Poll";
import Login from "./Login";

// React Router Auth Documentation: https://ui.dev/react-router-protected-routes-authentication
function RequireAuth({ children, authedUser }) {
  const location = useLocation();

  return authedUser ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);
  return (
    <Fragment>
      <LoadingBar />
      <Nav />
      <div className="container-fluid">
        {props.loading === true ? null : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              exact
              element={
                <RequireAuth authedUser={props.authedUser}>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <RequireAuth authedUser={props.authedUser}>
                  <Leaderboard />
                </RequireAuth>
              }
            />
            <Route
              path="/add"
              exact
              element={
                <RequireAuth authedUser={props.authedUser}>
                  <CreatePoll />
                </RequireAuth>
              }
            />
            <Route
              path="/questions/:id"
              exact
              element={
                <RequireAuth authedUser={props.authedUser}>
                  <Poll />
                </RequireAuth>
              }
            />
          </Routes>
        )}
      </div>
    </Fragment>
  );
}

const mapStateToProps = ({ authedUser, questions }) => ({
  authedUser,
  loading: questions === null,
});

export default connect(mapStateToProps)(App);
