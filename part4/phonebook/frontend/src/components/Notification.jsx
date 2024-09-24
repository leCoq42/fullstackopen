const Notification = ({ message }) => {
  const notificationStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (message === null) {
    return null;
  }

  if (message.type === "error") {
    return (
      <div style={errorStyle} className={message.type}>
        {message.text}
      </div>
    );
  }
  if (message.type === "notification") {
    return (
      <div style={notificationStyle} className={message.type}>
        {message.text}
      </div>
    );
  }
};

export default Notification;
