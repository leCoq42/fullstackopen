require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const Person = require("./models/person");

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));
app.use(morgan("tiny"));

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/info", (request, response) => {
  Person.countDocuments().then((count) => {
    const msg = `<div><p>Phonebook has info for ${count} people</p><p>${Date().toString()}</p></div>`;
    response.send(msg);
  });
  // .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(400).send({ error: "malformatted id" });
    });
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end();
  });
  // .catch((error) => next(error));
});

app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;
  if (!(name && number)) {
    return response.status(400).json({
      error: "Name or number missing",
    });
  }

  // if (Person.findById((p) => p.name === name)) {
  //   return response.status(400).json({ error: "Name must be unique" });
  // }

  const person = new Person({
    name,
    number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson.toJSON());
  });
  // .catch((error) => next(error));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
