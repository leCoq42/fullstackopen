import { useState, useEffect } from "react";
import axios from "axios";

const Person = ({ name, num }) => {
  return (
    <li>
      {name} {num}
    </li>
  );
};

const Persons = ({ persons, filter }) => {
  let filter_lowered = filter.toLowerCase();
  let filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter_lowered),
  );
  const personElem = filteredPersons.map((person) => {
    return <Person key={person.name} name={person.name} num={person.number} />;
  });

  return <ul>{personElem}</ul>;
};

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

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <form>
      <div>
        filter shown with:{" "}
        <input name="filter" value={newFilter} onChange={handleFilterChange} />
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const hook = () => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  };

  useEffect(hook, []);

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNum,
    };

    if (persons.some((person) => person.name === newName)) {
      const msg = `${newName} is already added to phonebook`;
      alert(msg);
      return false;
    }
    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNum("");
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumChange = (event) => setNewNum(event.target.value);
  const handleFilterChange = (event) => setNewFilter(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={(obj) => addPerson(obj)}
        newName={newName}
        handleNameChange={(obj) => handleNameChange(obj)}
        newNum={newNum}
        handleNumChange={(obj) => handleNumChange(obj)}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={newFilter} />
    </div>
  );
};

export default App;
