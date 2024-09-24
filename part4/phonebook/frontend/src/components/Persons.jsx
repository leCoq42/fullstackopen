import Person from "./Person";

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

export default Persons;
