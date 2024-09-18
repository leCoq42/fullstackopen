const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNum,
  handleNumChange,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input name="name" value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number:{" "}
        <input name="number" value={newNum} onChange={handleNumChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
