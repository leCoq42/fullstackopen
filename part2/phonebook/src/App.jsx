import { useState, useEffect } from "react";
import phonebookService from "./services/phonebook";

const Person = ({ person, deletePerson }) => {
  return (
    <li>
      {person.name} {person.number}{" "}
      <button onClick={() => deletePerson(person)}>delete</button>
    </li>
  );
};

const Persons = ({ persons, filter, deletePerson }) => {
  let filter_lowered = filter.toLowerCase();
  let filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter_lowered),
  );
  const personElem = filteredPersons.map((person) => {
    return (
      <Person key={person.name} person={person} deletePerson={deletePerson} />
    );
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
    <div>
      filter shown with:{" "}
      <input name="filter" value={newFilter} onChange={handleFilterChange} />
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [filterStr, setNewFilter] = useState("");

  useEffect(() => {
    phonebookService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNum,
    };

    const duplicate = persons.find((person) => person.name === newName);

    if (duplicate) {
      const msg = `${duplicate.name} is already added to phonebook, replace the old number with a new one?`;
      if (window.confirm(msg) === true) {
        phonebookService
          .update(duplicate.id, personObject)
          .then((ret) => {
            setPersons(persons.map((p) => (p.id !== duplicate.id ? p : ret)));
          })
          .catch((error) => {
            console.log("Error updating person: ", error.message);
            alert("Error updating person.");
          });
        return false;
      }
    }

    phonebookService.create(personObject).then((response) => {
      setPersons(persons.concat(response));
      setNewName("");
      setNewNum("");
    });
  };

  const deletePerson = (person) => {
    const msg = `Really delete ${person.name}?`;

    if (window.confirm(msg) === true) {
      phonebookService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== person.id));
        })
        .catch((error) => {
          console.log("Error deleting person: ", error.message);
          alert("Error deleting person.");
        });
    }
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumChange = (event) => setNewNum(event.target.value);
  const handleFilterChange = (event) => setNewFilter(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={filterStr} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={(obj) => addPerson(obj)}
        newName={newName}
        handleNameChange={(obj) => handleNameChange(obj)}
        newNum={newNum}
        handleNumChange={(obj) => handleNumChange(obj)}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        filter={filterStr}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
