const Notification = ({ message }: { message: string | null }) => {
  if (!message) {
    return null;
  }

  return (
    <div>
      <p style={{ color: "red" }}>{message}</p>
    </div>
  );
};

export default Notification;
