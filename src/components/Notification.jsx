const Notification = ({ errorMessage, successfulMessage }) => {
  if (errorMessage) {
    return <div className="error">{errorMessage}</div>;
  }

  if (successfulMessage) {
    return <div className="successfull">{successfulMessage}</div>;
  }
  return null;
};

export default Notification;
