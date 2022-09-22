import { connect } from "react-redux";

const Leaderboard = ({ authedUser, users }) => {
  return (
    <div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">Users</th>
            <th scope="col">Answered</th>
            <th scope="col">Created</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(users)
            .sort((a, b) => {
              return (
                users[b].questions.length - users[a].questions.length ||
                Object.keys(users[b].answers).length -
                  Object.keys(users[a].answers).length
              );
            })
            .map((userId) => {
              const user = users[userId];
              return (
                <tr key={userId}>
                  <td>
                    <div className="d-flex flex-wrap align-items-center">
                      <div className="flex-shrink-1">
                        {user.avatarURL ? (
                          <img
                            src={user.avatarURL}
                            alt={`Avatar of ${user.id}`}
                            className="rounded-circle"
                            style={{ width: "50px" }}
                          />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50"
                            height="50"
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
                        <div className="row">
                          <div className="col-12">
                            <h5 className="h4">{user.name}</h5>
                          </div>
                          <div className="col-12">{user.id}</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="align-middle">
                    {Object.keys(user.answers).length}
                  </td>
                  <td className="align-middle">{user.questions.length}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users }) => {
  return {
    authedUser,
    users,
  };
};

export default connect(mapStateToProps)(Leaderboard);
