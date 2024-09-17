import { useState, useEffect } from "react";
import phonebookService from "./services/phonebook";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [filterStr, setNewFilter] = useState("");
  const [notificationMsgMsg, setNotificationMsgMsg] = useState(null);

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
            setNotificationMsgMsg({
              text: `Error updating ${personObject.name}`,
              type: "error",
            });
            setTimeout(() => {
              setNotificationMsgMsg(null);
            }, 5000);
            console.log("Error updating person: ", error.message);
          });
        return false;
      }
    }

    phonebookService.create(personObject).then((response) => {
      setNotificationMsgMsg({
        text: `Added ${personObject.name}`,
        type: "notification",
      });
      setTimeout(() => {
        setNotificationMsgMsg(null);
      }, 5000);
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
          setNotificationMsgMsg({
            text: `${person.name} was already removed from server`,
            type: "error",
          });
          setTimeout(() => {
            setNotificationMsgMsg(null);
          }, 5000);
          console.log("Error deleting person: ", error.message);
        });
    }
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumChange = (event) => setNewNum(event.target.value);
  const handleFilterChange = (event) => setNewFilter(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMsgMsg} />
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
