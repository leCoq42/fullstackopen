const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(morgan("tiny"));
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const msg = `<div><p>Phonebook has info for ${persons.length} people</p><p>${Date().toString()}</p></div>`;
  response.send(msg);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id != id);
  response.status(204).end();
});

const generateRandId = (min, max) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(
    Math.random() * (maxFloored - minCeiled) + minCeiled,
  ).toString();
};

app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;
  if (!(name && number)) {
    return response.status(400).json({
      error: "Name or number missing",
    });
  }

  if (persons.find((p) => p.name === name)) {
    return response.status(400).json({ error: "Name must be unique" });
  }

  const person = {
    id: generateRandId(5, 9999),
    name,
    number,
  };

  persons = persons.concat(person);
  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
