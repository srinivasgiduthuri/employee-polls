const NotFound = ({ message }) => {
  return (
    <div className="container-fluid">
      <div className="row justify-content-md-center">
        <div className="col-3">
          {message && (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
